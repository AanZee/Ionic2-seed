/********************************************
 * Default configuration for some providers *
 ********************************************/


import { Injectable } from '@angular/core';
// import { Camera } from '@ionic-native/camera';

@Injectable()
export class Config {
	// private static _camera: any = new Camera();

	// public static readonly camera: any = {
	// 	quality: 90,
	// 	destinationType: Config._camera.DestinationType.DATA_URL,
	// 	sourceType: Config._camera.PictureSourceType.CAMERA,
	// 	allowEdit: true,
	// 	encodingType: Config._camera.EncodingType.PNG,
	// 	targetWidth: null,
	// 	targetHeight: null,
	// 	saveToPhotoAlbum: false,
	// 	mediaType: Config._camera.MediaType.PICTURE,
	// };
	public static readonly image: any = {
		width: 400,
		height: 400
	};
}
