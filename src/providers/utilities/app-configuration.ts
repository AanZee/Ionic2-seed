/********************************************
 * Default configuration for some providers *
 ********************************************/


import { Camera } from 'ionic-native';

export let CONFIGURATION = {
	Camera: {
		quality: 90,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.CAMERA,
		allowEdit: true,
		encodingType: Camera.EncodingType.PNG,
		targetWidth: null,
		targetHeight: null,
		saveToPhotoAlbum: false,
		mediaType: Camera.MediaType.PICTURE,
	},
	Image: {
		width: 400,
		height: 400
	}
}
