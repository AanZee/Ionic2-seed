import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// Utility providers
import { StorageProvider } from './storage-provider';

describe('StorageProvider', () => {
	let _events: Events;
	let _storage: Storage;

	let storageProvider: StorageProvider;
	let originalTimeout: number;
	let testKey: string;
	let testVal: string;

	beforeAll(() => {
		localStorage.setItem('user_id', 'jasmine');
	});

	beforeEach(() => {
		_events = new Events();
		_storage = new Storage();
		storageProvider = new StorageProvider(_events, _storage);
	});

	beforeEach(() => {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});

	beforeEach(() => {
		testKey = 'testKey';
		testVal = 'testVal';
	});

	afterEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it('should be created', () => {
		expect(storageProvider instanceof StorageProvider).toBe(true);
	});

	it('should have setItem method', () => {
		expect(storageProvider.setItem).toBeDefined();
	});

	it('should have getItem method', () => {
		expect(storageProvider.getItem).toBeDefined();
	});

	it('should have deleteItem method', () => {
		expect(storageProvider.deleteItem).toBeDefined();
	});

	it('should be able to set a value in storage', (done: any) => {
		storageProvider.setItem(testKey, testVal).then(() => {
			done();
		}).catch(() => {
			fail('exception caught while setting');
			done();
		});
	});

	it('should be able to get a value from storage', (done: any) => {
		storageProvider.getItem(testKey).then((data: any) => {
			expect(data).toBe(testVal);
			done();
		}).catch(() => {
			fail('exception caught while getting');
			done();
		});
	});

	it('should be able to remove a value from storage', (done: any) => {
		storageProvider.deleteItem(testKey).then(() => {
			storageProvider.getItem(testKey).then((data: any) => {
				expect(data).not.toBe(testVal);
				done();
			}).catch(() => {
				expect(true).toBe(true);
				done();
			});
		}).catch(() => {
			fail('exception caught while deleting');
			done();
		});
	});

	it('should save for current user', (done: any) => {
		_events.subscribe('user+logout', () => {
			storageProvider.getItem(testKey).then((data: any) => {
				expect(data).not.toBe(testVal);
				done();
			}).catch(() => {
				expect(true).toBe(true);
				done();
			});
		});

		storageProvider.setItem(testKey, testVal).then(() => {
			localStorage.removeItem('user_id');
			_events.publish('user+logout');
		}).catch(() => {
			fail('exception caught while setting');
			done();
		});
	});
});
