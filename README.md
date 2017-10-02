# Ionic 2 project seed

This project is a custom seed for Ionic 2 applications.

## How to use this seed

Clone this repo. remove `.git` folder and init your new repo.

## Installation

 * Make sure you have Ionic installed globally by running `sudo npm install ionic -g`.
 * Install all dependencies by running `npm install` or `yarn install`.
 * Add desired platforms (Android, iOS) by running `ionic cordova platform add <android|ios>`.
 * Build by running `ionic cordova build <android|ios>`.

## This project includes...

 * Push notifications (via Google Firebase)
 * A translation library. Visit [ngx-translate](https://github.com/ngx-translate) for more information
 * A component to add a scroll shadow to an element
 * Providers
    * to manage push notifications
    * to make API requests
    * to make and cache API requests
    * to store data in phone's storage
    * to open a URL in a browser popup (uses InAppBrowser or SafariViewController)
    * and more...

## Notes

For push notifications to work some manual steps need to be completed:

 * replace 'src/assets/google-services.json' and 'src/assets/GoogleService-Info.plist' with correct files downloaded from the Google Firebase console.
 * Android:
    * All files are copied automagically!
 * iOS:
    * After creating an iOS build folder:
        * copy 'platforms/ios/GoogleService-Info.plist' into the root of the Xcode project (drag/drop).
        * enable push notification is Xcode project
