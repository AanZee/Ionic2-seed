var orgCopyConfig = require('@ionic/app-scripts/config/copy.config');

//Copy Firebase config file to android build folder
let copyGopogleServicesAndroid = {
	src: ['{{ROOT}}/src/assets/google-services.json'],
	dest: '{{ROOT}}/platforms/android'
}
orgCopyConfig.copyGopogleServicesAndroid = copyGopogleServicesAndroid;

let copyGopogleServicesIos = {
	src: ['{{ROOT}}/src/assets/GoogleService-Info.plist'],
	dest: '{{ROOT}}/platforms/ios'
}
orgCopyConfig.copyGopogleServicesIos = copyGopogleServicesIos;

//Copy Firebase config file to android build folder
let copyGopogleServicesAndroidToRoot = {
	src: ['{{ROOT}}/src/assets/google-services.json'],
	dest: '{{ROOT}}'
}
orgCopyConfig.copyGopogleServicesAndroidToRoot = copyGopogleServicesAndroidToRoot;

let copyGopogleServicesIosToRoot = {
	src: ['{{ROOT}}/src/assets/GoogleService-Info.plist'],
	dest: '{{ROOT}}'
}
orgCopyConfig.copyGopogleServicesIosToRoot = copyGopogleServicesIosToRoot;
