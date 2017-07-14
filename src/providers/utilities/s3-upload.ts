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


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Settings } from './app-settings';

declare let qq: any;

@Injectable()
export class S3Upload {
	private uploader: any;
	// bucket prefix for the uploaded file
	private prefix: string = 'tmp/';
	private imageSubject: Subject<any> = new Subject<any>();

	public imageObservable: Observable<any>;

	constructor(
		private settings: Settings,
	) {
		this.imageObservable = this.imageSubject.asObservable();

		this.uploader = new qq.s3.FineUploaderBasic({
			request: {
				endpoint: this.settings.s3.endpoint,
				accessKey: this.settings.s3.accesskey
			},
			signature: {
				endpoint: this.settings.apiEndpoint + 's3upload.signature'
			},
			uploadSuccess: {
				endpoint: this.settings.apiEndpoint + 's3upload.success'
			},
			objectProperties: {
				acl: 'public-read',
				key: (fileId: any) => {
					let filename: string = this.uploader.getName(fileId);
					let uuid: string = this.uploader.getUuid(fileId);

					// specially for android filename mess
					let dotIndex: number = filename.lastIndexOf('.');
					let tempFileExtention: string = filename.substr(dotIndex + 1);
					let fileExtention: string = dotIndex < 0 || tempFileExtention.length > 4 ? 'jpg' : filename.substr(dotIndex + 1).toLowerCase();

					let newName: string = this.prefix + uuid + '.' + fileExtention;
					this.uploader.setName(fileId, newName);

					return newName;
				}
			},
			iframeSupport: {
				localBlankPagePath: this.settings.apiEndpoint + 's3upload.blank'
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
				onSubmitted: (id: number, name: string) => {
					this.onSubmitted(id, name);
				},
				onComplete: (id: number, name: string, responseJSON: any) => {
					this.onComplete(id, name, responseJSON);
				},
				onAllComplete: () => {
					this.onAllComplete();
				}
			}
		});
	}

	addFile(reference: any): void {
		if (typeof reference === 'object') {
			this.uploader.addFiles(reference);
		} else {
			this.uploader.addBlobs(this.b64toBlob(reference));
		}
	}

	uploadStoredFiles(): void {
		this.uploader.uploadStoredFiles();
	}

	setPrefix(prefix: string): void {
		this.prefix = prefix;
	}

	// Event methods
	onSubmitted(id: number, name: string): void {
	}

	onComplete(id: number, name: string, responseJSON: any): void {
		this.imageSubject.next(name);
	}

	onAllComplete(): void {
	}

	private b64toBlob(b64Data: string, contentType?: string, sliceSize?: number): Blob {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		let byteCharacters: string = atob(b64Data);
		let byteArrays: any[] = [];

		for (let offset: number = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice: string = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers: any[] = new Array(slice.length);
			for (let sliceIndex: number = 0; sliceIndex < slice.length; sliceIndex++) {
				byteNumbers[sliceIndex] = slice.charCodeAt(sliceIndex);
			}
			let byteArray: Uint8Array = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		let blob: Blob = new Blob(byteArrays, { type: contentType });
		return blob;
	}
}
