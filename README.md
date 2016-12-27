# Ionic 2 project seed

This project is a custom seed for Ionic 2 applications.

## How to use this seed

This project can be, but should not be used on it's own. It is designed to be used to start a new Ionic 2 project with the following command.

```bash
$ ionic start <project-name> --v2 https://github.com/AanZee/Ionic2-seed
```

You may encounter errors like "`Current working directory is not a Cordova-based project`".
This is caused by the `www` folder that is missing initally and is easily resolved by running the following commands.

```bash
$ npm install
$ ionic state reset
```

This should resolve the issues and make your project ready for use.

## This project includes...

 * Providers
    * to make API requests
    * to make and cache API requests
    * to store data in phone's storage
    * to open a URL in a browser popup (uses InAppBrowser or SafariViewController)
 * A translation library. Visit [ng2-translate](https://github.com/ocombe/ng2-translate) for more information
 * A component to add a scroll shadow to an element
