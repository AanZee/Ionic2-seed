/**********************************************************************************************************
 * Requires:                                                                                              *
 * - `fine-uploader` module                                                                               *
 * - Add `<script src="build/s3.fine-uploader.js"></script>` to `index.html` above `polyfills.js` include *
 * - Add to `config/copy.config.js`                                                                       *
 * ```                                                                                                    *
 *     //Copy fine-uploader to build folder                                                               *
 *     orgCopyConfig.copyS3FineUploader = {                                                               *
 *         src: ['{{ROOT}}/node_modules/fine-uploader/s3.fine-uploader/s3.fine-uploader.js'],             *
 *         dest: '{{BUILD}}'                                                                              *
 *     }                                                                                                  *
 * ```                                                                                                    *
 **********************************************************************************************************/


import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {SETTINGS} from './app-settings';

declare var qq: any;

@Injectable()
export class S3Upload {
	// s3 fine-uploader object
	private uploader: any;
	// bucket prefix for the uploaded file
	private prefix: string = 'tmp/';
	// internal subject where uploaded file is stored (after success)
	private imageSubject = new Subject<any>();
	// Provide the *public* Observable that clients can subscribe to
	image$: Observable<any>;

	constructor() {
		this.image$ = this.imageSubject.asObservable();

		this.uploader = new qq.s3.FineUploaderBasic({
			request: {
				endpoint: SETTINGS.S3.ENDPOINT,
				accessKey: SETTINGS.S3.ACCESSKEY
			},
			signature: {
				endpoint: SETTINGS.API_ENDPOINT + "s3upload.signature"
			},
			uploadSuccess: {
				endpoint: SETTINGS.API_ENDPOINT + "s3upload.success"
			},
			objectProperties: {
				acl: 'public-read',
				key: (fileId: any) => {
					let filename = this.uploader.getName(fileId);
					let uuid = this.uploader.getUuid(fileId);

					//specially for android filename mess
					let dotIndx = filename.lastIndexOf('.');
					let tmpExt = filename.substr(dotIndx + 1);
					let ext = dotIndx < 0 || tmpExt.length > 4 ? 'jpg' : filename.substr(dotIndx + 1).toLowerCase();

					let newName = this.prefix + uuid + '.' + ext;
					this.uploader.setName(fileId, newName);

					return newName;
				}
			},
			iframeSupport: {
				localBlankPagePath: SETTINGS.API_ENDPOINT + "s3upload.blank"
			},
			// optional feature
			chunking: {
				enabled: true
			},
			// optional feature
			validation: {
				itemLimit: 0,
				sizeLimit: 0 //in bytes
			},
			callbacks: {
				onSubmitted: (id, name) => { this.onSubmitted(id, name) },
				onComplete: (id, name, responseJSON) => { this.onComplete(id, name, responseJSON) },
				onAllComplete: () => { this.onAllComplete() }
			}
		});

		return this;
	};



	/******************/
	/* public methods */
	/******************/

	addFile(reference) {

		if (typeof reference === 'object') {
			this.uploader.addFiles(reference);
		}
		else {
			this.uploader.addBlobs(this.b64toBlob(reference));
		}
	};

	uploadStoredFiles() {
		this.uploader.uploadStoredFiles();
	};

	setPrefix(prefix) {
		this.prefix = prefix;
	};

	/*****************/
	/* event methods */
	/*****************/

	onSubmitted(id, name) {};

	onComplete(id, name, responseJSON) {
		this.imageSubject.next(name);
	};

	onAllComplete() {};

	/*******************/
	/* private methods */
	/*******************/

	b64toBlob(b64Data, contentType?, sliceSize?) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		let byteCharacters = atob(b64Data);
		let byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			let byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		let blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};
}
