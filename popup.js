// Variable Declarations
// References to the various Radio Buttons and dropdown on the page
const clearButton = document.getElementById("clear-button");
const clearTimeframeDropdown = document.getElementById("clear-timeframe");
const SelectAllRadioButton = document.getElementById("clear-all");
const clearCacheRadioButton = document.getElementById("clear-cache");
const clearCookiesRadioButton = document.getElementById("clear-cookies");
const clearHistoryRadioButton = document.getElementById("clear-history");
const clearDownloadRadioButton = document.getElementById("clear-download");
const clearPasswordRadioButton = document.getElementById("clear-password");
const clearAutofillRadioButton = document.getElementById("clear-autofill");
const clearLocalStorageRadioButton = document.getElementById("clear-storage");
const clearTabsRadioButton = document.getElementById("clear-tabs");
const disableConfirmationsRadioButton = document.getElementById("disable-confirmations");

// Toggle settings form on click
const settingsIcon = document.querySelector('.settings-icon');
const settingsForm = document.querySelector('#settings');
settingsForm.style.display = 'none';
settingsIcon.addEventListener('click', () => {
  settingsForm.style.display = settingsForm.style.display === 'none' ? 'block' : 'none';
});

// Save settings to browser's local storage
const saveSettings = () => {
  chrome.storage.local.set({
    SelectAll: SelectAllRadioButton.checked,
    clearTimeframe: clearTimeframeDropdown.value,
    clearCache: clearCacheRadioButton.checked,
    clearCookies: clearCookiesRadioButton.checked,
    clearHistory: clearHistoryRadioButton.checked,
    clearDownload: clearDownloadRadioButton.checked,
    clearPassword: clearPasswordRadioButton.checked,
    clearAutofill: clearAutofillRadioButton.checked,
    clearLocalStorage: clearLocalStorageRadioButton.checked,
    clearTabs: clearTabsRadioButton.checked,
    disableConfirmations: disableConfirmationsRadioButton.checked,
  });
};

// Update Select All/Deselect all radio button
const updateSelectAllRadioButton = () => {
  SelectAllRadioButton.checked = RadioButtons.every(RadioButton => RadioButton.checked);
};

// Add change event listeners to these Radio Buttons
const RadioButtons = [clearTabsRadioButton, clearCacheRadioButton, clearCookiesRadioButton, clearHistoryRadioButton, clearDownloadRadioButton, clearPasswordRadioButton, clearAutofillRadioButton, clearLocalStorageRadioButton];
RadioButtons.forEach((RadioButton) => {
  RadioButton.addEventListener("change", () => {
    updateSelectAllRadioButton();
    saveSettings();
  });
});

// Event listener for when the Select All/Deselect all RadioButton itself is clicked
SelectAllRadioButton.addEventListener("change", () => {
  RadioButtons.forEach((RadioButton) => {
    RadioButton.checked = SelectAllRadioButton.checked;
  });
  saveSettings();
});

// Event listener for when the user changes the time frame dropdown
clearTimeframeDropdown.addEventListener("change", saveSettings);

// Event listener for when the user toggles the Disable Confirmation RadioButton
disableConfirmationsRadioButton.addEventListener("change", saveSettings);

// Default settings for Radio Buttons
chrome.storage.local.get({
  SelectAll: false,
  clearTimeframe: "last-hour",
  clearCache: false,
  clearCookies: false,
  clearHistory: false,
  clearDownload: false,
  clearPassword: false,
  clearAutofill: false,
  clearLocalStorage: false,
  clearTabs: false,
  disableConfirmations: false,

}, (data) => {
  SelectAllRadioButton.checked = data.SelectAll;
  clearTimeframeDropdown.value = data.clearTimeframe;
  clearCacheRadioButton.checked = data.clearCache;
  clearCookiesRadioButton.checked = data.clearCookies;
  clearHistoryRadioButton.checked = data.clearHistory;
  clearDownloadRadioButton.checked = data.clearDownload;
  clearPasswordRadioButton.checked = data.clearPassword;
  clearAutofillRadioButton.checked = data.clearAutofill;
  clearLocalStorageRadioButton.checked = data.clearLocalStorage;
  clearTabsRadioButton.checked = data.clearTabs;
  disableConfirmationsRadioButton.checked = data.disableConfirmations;
});


const confirmationMessage = document.getElementById("confirmation-message");
const confirmationText = document.getElementById("confirmation-text");
const confirmClearButton = document.getElementById("confirm-clear");
const cancelClearButton = document.getElementById("cancel-clear");

confirmationMessage.classList.add("hidden");

// Logic for when disable confirmation is checked or not
clearButton.addEventListener("click", () => {
  if (disableConfirmationsRadioButton.checked) {
    clearSelectedData();
  } else {
    confirmationText.textContent = getConfirmationMessage();
    confirmationMessage.classList.remove("hidden");
  }
});

// Logic for confirm and cancel buttons is
confirmClearButton.addEventListener("click", () => {
  clearSelectedData();
  confirmationMessage.classList.add("hidden");
});

cancelClearButton.addEventListener("click", () => {
  confirmationMessage.classList.add("hidden");
});;

// To confirm with users what they are clearing
function getConfirmationMessage() {
  const selectedOptions = [];
  if (SelectAllRadioButton.checked) {
    selectedOptions.push("everything");
  } else {
    clearCacheRadioButton.checked && selectedOptions.push("the cache");
    clearCookiesRadioButton.checked && selectedOptions.push("cookies");
    clearHistoryRadioButton.checked && selectedOptions.push("browsing history");
    clearDownloadRadioButton.checked && selectedOptions.push("download history");
    clearPasswordRadioButton.checked && selectedOptions.push("passwords");
    clearAutofillRadioButton.checked && selectedOptions.push("auto-fill");
    clearLocalStorageRadioButton.checked && selectedOptions.push("local storage");
    clearTabsRadioButton.checked && selectedOptions.push("all tabs");
  }
  return `Are you sure you want to clear ${selectedOptions.length > 0 ? selectedOptions.join(", ") + "?" : "nothing?"}`;
}

// Clear data using Chrome's API
function clearSelectedData() {
  let promise = Promise.resolve();
  const clearTimeframe = document.getElementById("clear-timeframe").value;

  // This function returns a timestamp based on the selected clear timeframe
  function getTimeFrameTimestamp(clearTimeframe) {
    const now = Date.now();
    switch (clearTimeframe) {
      case "all-time":
        return 0;
      case "last-4-weeks":
        return now - 2419200000;
      case "last-7-days":
        return now - 604800000;
      case "last-24-hours":
        return now - 86400000;
      case "last-hour":
        return now - 3600000;
      default:
        return 0;
    }
  }

  // Protectedweb and extension are destructive operations that is why I set them to false
  const options = {
    "since": getTimeFrameTimestamp(clearTimeframe),
    "originTypes": {
      unprotectedWeb: true,
      protectedWeb: false,
      extension: false,
    },
  };

 // Just for cookies
  const dataTypes = {
    "cookies": true,
    "fileSystems": true,
    "indexedDB": true,
    "serviceWorkers": true,
    "webSQL": true
  };

  // Itemized for calling multiple,specific and appropriate methods
  // Designed to chain the clearing of data with the use of promises
  // as a measure to ensure that each data is cleared one by one
  if (clearCacheRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removeCache({}, resolve);
      });
    });
  }

  if (clearCookiesRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.remove(options, dataTypes, resolve);
      });
    });
  }

  if (clearHistoryRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removeHistory(options, resolve);
      });
    });
  }

  if (clearDownloadRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removeDownloads(options, resolve);
      });
    });
  }

  if (clearPasswordRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removePasswords(options, resolve);
      });
    });
  }

  if (clearAutofillRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removeFormData(options, resolve);
      });
    });
  }

  if (clearLocalStorageRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.removeLocalStorage(options, resolve);
      });
    });
  }

  if (clearTabsRadioButton.checked) {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        chrome.tabs.query({}, (tabs) => {

          const currentTabId = tabs.find(tab => tab.active).id;
          tabs.forEach((tab) => {
            if (tab.id !== currentTabId) {
              chrome.tabs.remove(tab.id);
            }
          });

          chrome.tabs.update(currentTabId, { url: "chrome://newtab" }, resolve);
        });
      });
    });
  }
// Displays to the user what is happening
  const message = document.getElementById("message");
  message.textContent = "Clearing data...";

// Use promises to chain clearing and update user on outcome of clearing
  Promise.resolve()
    .then(() => {
      return new Promise((resolve) => {
        chrome.browsingData.remove(options, dataTypes, resolve);
      });
    })
    .then(() => {
      message.textContent = "Cleared.";
      setTimeout(() => {
        window.close();
      }, 1500);
    })
    .catch((error) => {
      console.error(error);
      message.textContent = "An error occurred while clearing data.";
      setTimeout(() => {
        window.close();
      }, 1500);
    });
}