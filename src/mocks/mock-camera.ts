import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Platform } from 'ionic-angular';

export class MockCamera extends Camera {

	// constructor(
	// 	private camera: Camera,
	// 	private platform: Platform,
	// ) {
	// 	super();
	// }

    static DestinationType: {
        DATA_URL: 0;
        FILE_URI: 1;
        NATIVE_URI: 2;
    };
    static EncodingType: {
        JPEG: 0;
        PNG: 1;
    };
    static MediaType: {
        PICTURE: 0;
        VIDEO: 1;
        ALLMEDIA: 2;
    };
    static PictureSourceType: {
        PHOTOLIBRARY: 0;
        CAMERA: 1;
        SAVEDPHOTOALBUM: 2;
    };
    static PopoverArrowDirection: {
        ARROW_UP: 1;
        ARROW_DOWN: 2;
        ARROW_LEFT: 4;
        ARROW_RIGHT: 8;
        ARROW_ANY: 15;
    };
    static Direction: {
        BACK: 0;
        FRONT: 1;
    };

	public getPicture(options?: CameraOptions): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
		navigator.getUserMedia({
			audio: false,
			video: true
		}, (stream: any) => {
			let video: any = document.createElement('video');
			document.body.appendChild(video);
			video.style['position'] = 'absolute';
			video.style['z-index'] = '999';
			let canvas: any = document.createElement('canvas');
			canvas.setAttribute('width', '200px');
			canvas.setAttribute('height', '200px');
			document.body.appendChild(canvas);
			canvas.style['position'] = 'absolute';
			canvas.style['z-index'] = '999';
			video.src = window.URL.createObjectURL(stream);
			video.play();
			let context = canvas.getContext('2d');
			setTimeout(() => {
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
				var data = canvas.toDataURL('image/jpg');
				resolve(data);
				document.body.removeChild(video);
				document.body.removeChild(canvas);
			}, 1000);
		}, (error: any) => {
			console.log('error', error);
			reject();
		});
		// if (this.platform.is('cordova')) {
		// 	return super.getPicture(options);
		// } else {
		// }
		});
	}

	public cleanup(): Promise<any> {
		return null;
	}
}
