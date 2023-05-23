# Clear data and tabs Chrome extension
#### Video Demo:  <https://youtu.be/BGjlsrg2QkA>
## **Description:**

### **Introduction**

Hello! My name is Christen Dom Cabatic, and this is my final project for CS50. I have chosen to make a Chrome extension that would clear browsing data and/or close tabs quickly and easily, just like what is built-in with DuckDuckGo browser. Unlike DuckDuckGo's fire button, my extension has the versatility of being a minimalist by clearing data/tabs possibly with just two clicks (one click for the extension and then the clear button, if the option to disable the confirmation message is selected) or be a little bit of being a maximalist, giving the users the options of which type of data to remove and the option on how far back they want to clear their data, ranging from the last hour to all-time (just like Chrome's builtin data cleaner).

In terms of aesthetics, my extension takes up just 25em width, thus not taking up a lot of browser real estate. Most of the options are also hidden by default, which again saves space. But one major difference between my extension and DuckDuckGo is my confirmation buttons. With DuckDuckGo, you would have to go from the very top portion of the browser to activate it and then go to the very bottom of the browser just to confirm clearing data. My extension's confirmation buttons are strategically located just below the clear button, minimizing the distance a user has to cover between clearing data and confirming it.

Overall, I would claim that my extension is better than DuckDuckgo when it comes to providing options and a better user experience. Compared with Chrome's clear browsing data, my extension provides a more convenient way of clearing data, without the need of having to look for and navigate through a lot of options just to get the same thing done. Plus, my extension could also close out multiple tabs at once and go to a default tab, which is not provided with Chrome's clear browsing data.

### **Design Choices**
In designing this extension, I decided to make it as user-friendly and straightforward as possible, but still would be able to provide important options. I wanted to provide users with a simple and quick way to clear their browsing data and/or close multiple tabs without having to navigate through various menus and settings. To achieve this goal, I decided to hide my settings menu and just show just 3 things by default; a clear button, a timeframe dropdown, and a settings icon, which made the interface cleaner and simpler.

While working on this project, I had to make several design choices to ensure that the functionality was efficient and user-friendly. For instance, I debated between using checkboxes and radio buttons for the time frame selection. Ultimately, I decided to use a dropdown menu because it allows users to quickly select their preferred time frame without cluttering the popup window. Plus, I thought it would be more user-friendly to use the dropdown since most users would be familiar with it since it is the default interface of Chrome's clear browsing data.

I also debated whether or not to include Disable confirmation message radio button when the user selects the "Select/Deselect All" radio button. In the end, I decided not to include it to avoid confusion and to avoid complications with my confirmation messages. I just decided to separate it from all the other radio buttons by adding a significant space between them.

### **How to Use the Extension**
Using this extension is simple. Once it's installed, users can pin the extension and access it with the Garbage Can icon which should be on the browser's toolbar. Clicking the Garbage Can icon would show just the clear button, the timeframe dropdown, where users can choose how far back they want to clear their data, and the settings icon. Clicking the settings icon will open the settings menu (hidden by default), where the very first radio button is a Select/Deselect all button that would conveniently allow users to select or deselect all the other buttons that correspond to a data type they could clear. The succeeding radio buttons are for each type of data they want to clear and a radio button to close all tabs. To make the interface easy to understand, I labeled each radio button with a clear and concise description of the data it represents, such as "Cookies" and "Browsing History." At the very bottom, there is a radio button to disable the confirmation message. This feature is helpful for users who want to clear their data quickly and don't want to be bothered by confirmation messages.

If users want to clear all their browsing data, they can simply click the "Select/Deselect all" radio button, and all other radio buttons will be selected automatically. If they want to clear specific types of data, they can select the corresponding radio buttons. Once they've made their selections, they can click the "Clear" button to delete their browsing data. All of the users' preferences are automatically saved in the browser's local storage. If the "Disable Confirmations" radio button is unchecked, they'll be advised exactly what types of data are going to be cleared and prompted to confirm the action before their data is cleared. Otherwise, the extension would clear the data that were selected by the user without a confirmation message. Users are also notified if the clearing data/closing tabs operation were successful or not, and the popup window will automatically close after 1.5 seconds of displaying the outcome of the operation.

### **File Description**
manifest.json: The extension manifest file, which specifies metadata about the extension and its behavior. Used manifest version 3, as per Google's requirement.

popup.html - This is the HTML file that contains the structure and layout of the popup window.

popup.css - This is the CSS file that provides the styling for the popup window.

popup.js - This is the JavaScript file that contains the functionality for the popup window.

### **Functionality Description**
The JavaScript code in the popup.js file provides the functionality for the popup window. Here's a breakdown of what each part of the code does:

Variable Declarations
The first part of the code declares variables that reference the various radio buttons, dropdown menus, and buttons in the popup window.

Toggle settings form on click
This code toggles the visibility of the settings form when the user clicks on the settings icon.

Save settings to the browser's local storage
This function saves the user's preferences for data clearing to the browser's local storage.

Update Select All/Deselect all radio button
This function updates the "Select/Deselect all All" radio button based on whether or not all of the other radio buttons are selected.

Change event listeners to these Radio Buttons
These event listeners update the "Select/Deselect all All" radio button and save the user's preferences whenever a radio button is clicked.

Select/Deselect all All radio button Event Listener
This event listener selects or deselects all of the other radio buttons whenever the "Select/Deselect all All" radio button is clicked.

Time Frame Dropdown Event Listener
This event listener saves the user's preferred time frame selection to the browser's local storage.

Disable Confirmation radio button Event Listener
This event listener saves the user's preference for disabling confirmation messages to the browser's local storage.

Default Settings
This code sets the default values for each radio button, dropdown menu, and the disable confirmations radio button. It retrieves the values from the browser's local storage, and if none exist, sets them to the default values.

Confirmation Messages
This code generates the confirmation message that displays when the user selects the "Select/Deselect all All" radio button.

Clear Selected Data
This function clears the user's selected data when the user confirms the action through Chrome's API.

Get TimeFrame Timestamp
This function returns a timestamp based on the selected clear timeframe.

Promise.resolve, .then, .catch
Use promises to chain clearing and update the user on the outcome of clearing

### **Conclusion**
Thank you for taking the time to read this README file! I hope it provides a clear understanding of my project and its functionality. If you have any questions or feedback, please don't hesitate to contact me.
