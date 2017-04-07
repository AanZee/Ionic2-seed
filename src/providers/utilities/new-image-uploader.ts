// /************************************
//  * Requires:                        *
//  * - '@ionic-native/camera' module  *
//  * - `cordova-plugin-camera` plugin *
//  * - ./s3-upload.ts                 *
//  * - ./app-configuration.ts         *
//  ************************************/
//
//
// import { Injectable } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera';
//
// import { Config } from './app-configuration';
// import { Settings } from './app-settings';
// import { S3Upload } from './s3-upload';
//
// export class NewImageCamera extends Camera {}
// export interface NewImageCameraOptions extends CameraOptions {}
//
// @Injectable()
// export class NewImageUploader {
//
// 	/**
// 	 * Constructor
// 	 * @param  {S3Upload} privateuploader [description]
// 	 * @return {[type]}                   [description]
// 	 */
// 	constructor(
// 		private uploader: S3Upload,
// 		private camera: Camera,
// 	) {}
//
// 	/**
// 	 * Prompts the user to take/pick an image and uploads the selected image to an Amazon S3 server
// 	 * @param  {NewImageCameraOptions} options       Camera options
// 	 * @param  {string}                upload_folder Name of the folder to upload to
// 	 * @return {Promise<string>}                     [description]
// 	 */
// 	public start(options: NewImageCameraOptions, upload_folder: string): Promise<string> {
// 		return new Promise((resolve: any, reject: any) => {
// 			this.getImageFromPhone(options).then((image_data: any) => {
// 				this.uploadImage(image_data, Settings.imgBasePath + upload_folder).then((data: any) => {
// 					resolve(Settings.imgBaseEndpoint + data);
// 				}).catch((error: any) => {
// 					reject({ message: 'Failed to upload image', error: error });
// 				});
// 			}).catch((error: any) => {
// 				reject({ message: 'Failed to get image', error: error });
// 			});
// 		});
// 	}
//
// 	/**
// 	 * Prompts the user to take/pick an image
// 	 * @param  {NewImageCameraOptions} options Camera options
// 	 * @return {Promise<any>}                  [description]
// 	 */
// 	private getImageFromPhone(options: NewImageCameraOptions): Promise<any> {
// 		let cam_options: any = {
// 			quality: options.quality || Config.camera.quality,
// 			destinationType: options.destinationType || Config.camera.destinationType,
// 			sourceType: options.sourceType || Config.camera.sourceType,
// 			allowEdit: options.allowEdit || Config.camera.allowEdit,
// 			encodingType: options.encodingType || Config.camera.encodingType,
// 			saveToPhotoAlbum: options.saveToPhotoAlbum || Config.camera.saveToPhotoAlbum,
// 			mediaType: options.mediaType || Config.camera.mediaType
// 		};
// 		if (options.targetWidth || Config.camera.targetWidth) {
// 			cam_options.targetWidth = options.targetWidth || Config.camera.targetWidth;
// 		}
// 		if (options.targetHeight || Config.camera.targetHeight) {
// 			cam_options.targetHeight = options.targetHeight || Config.camera.targetHeight;
// 		}
//
// 		return this.camera.getPicture(cam_options);
// 	}
//
// 	/**
// 	 * Upload a base64 image to an Amazon S3 server
// 	 * @param  {any}          image_data Base64 image data
// 	 * @param  {string}       path       Where to upload the image
// 	 * @return {Promise<any>}            [description]
// 	 */
// 	private uploadImage(image_data: any, path: string): Promise<any> {
// 		return new Promise((resolve: any, reject: any) => {
// 			this.uploader.setPrefix(path);
// 			this.uploader.image$.subscribe(data => {
// 				resolve(data);
// 			}, (err) => {
// 				reject();
// 			});
// 			this.uploader.addFile(image_data);
// 			this.uploader.uploadStoredFiles();
// 		});
// 	}
// }
