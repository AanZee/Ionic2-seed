/********************************************
 * Default configuration for some providers *
 ********************************************/


import { MockCamera } from '../../mocks/mock-camera';

export let CONFIGURATION = {
	Camera: {
		quality: 90,
		destinationType: MockCamera.DestinationType.DATA_URL,
		sourceType: MockCamera.PictureSourceType.CAMERA,
		allowEdit: true,
		encodingType: MockCamera.EncodingType.PNG,
		targetWidth: null,
		targetHeight: null,
		saveToPhotoAlbum: false,
		mediaType: MockCamera.MediaType.PICTURE,
	},
	Image: {
		width: 400,
		height: 400
	}
}
