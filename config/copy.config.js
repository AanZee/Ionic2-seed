var orgCopyConfig = require('@ionic/app-scripts/config/copy.config');

//Copy Firebase config file to android build folder
orgCopyConfig.include.push({
  src: 'src/assets/google-services.json',
  dest: 'platforms/android/google-services.json'
});

//Copy Firebase config file to ios build folder
orgCopyConfig.include.push({
  src: 'src/assets/GoogleService-Info.plist',
  dest: 'platforms/ios/GoogleService-Info.plist'
});

// let chartCopy = {
//   src: '{{ROOT}}/node_modules/chart.js/dist/Chart.js',
//   dest: '{{BUILD}}'
// };

// orgCopyConfig.copyChartsLib = chartCopy;
