/********************************************
 * Default configuration for some providers *
 ********************************************/


import { Camera } from '@ionic-native/camera';

let _camera = new Camera();

export let CONFIGURATION = {
	Camera: {
		quality: 90,
		destinationType: _camera.DestinationType.DATA_URL,
		sourceType: _camera.PictureSourceType.CAMERA,
		allowEdit: true,
		encodingType: _camera.EncodingType.PNG,
		targetWidth: null,
		targetHeight: null,
		saveToPhotoAlbum: false,
		mediaType: _camera.MediaType.PICTURE,
	},
	Image: {
		width: 400,
		height: 400
	}
}
