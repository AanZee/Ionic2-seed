import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Platform } from 'ionic-angular';

export class MockCamera extends Camera {

	// constructor(
	// 	private camera: Camera,
	// 	private platform: Platform,
	// ) {
	// 	super();
	// }

	/**
     * Constant for possible destination types
     */
    static DestinationType: {
        DATA_URL: number;
        FILE_URI: number;
        NATIVE_URI: number;
    };
    /**
     * Convenience constant
     */
    static EncodingType: {
        JPEG: number;
        PNG: number;
    };
    /**
     * Convenience constant
     */
    static MediaType: {
        PICTURE: number;
        VIDEO: number;
        ALLMEDIA: number;
    };
    /**
     * Convenience constant
     */
    static PictureSourceType: {
        PHOTOLIBRARY: number;
        CAMERA: number;
        SAVEDPHOTOALBUM: number;
    };
    /**
     * Convenience constant
     */
    static PopoverArrowDirection: {
        ARROW_UP: number;
        ARROW_DOWN: number;
        ARROW_LEFT: number;
        ARROW_RIGHT: number;
        ARROW_ANY: number;
    };
    /**
     * Convenience constant
     */
    static Direction: {
        BACK: number;
        FRONT: number;
    };

	public getPicture(options?: CameraOptions): Promise<any> {
		// if (this.platform.is('cordova')) {
		// 	return super.getPicture(options);
		// } else {
			return new Promise((resolve: any, reject: any) => {
				resolve("BASE_64_ENCODED_DATA_GOES_HERE");
			});
		// }
	}

	public cleanup(): Promise<any> {
		return null;
	}
}
