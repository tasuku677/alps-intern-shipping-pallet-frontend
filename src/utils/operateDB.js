
let db = null;
const initializeDB = () => {
    if (db) {
        return Promise.resolve(db);
    }
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("MyTestDatabase", 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log("Success to open database\n");
            // alert('Success to open database');
            resolve(db);
        };
        request.onerror = function (event) {
            console.log("Why didn't you allow my web app to use IndexedDB?!\n");
            reject(event);
        };
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('MyObjectStore')) {
                db.createObjectStore('MyObjectStore', { keyPath: 'palletId' });
                console.log('Create object store\n');
            }
            else {
                console.log('Object store already exists\n');
            }
        };
    });
};
const addData = (db, photo) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore'], 'readwrite');
        const objectStore = transaction.objectStore('MyObjectStore');
        const request = objectStore.add(photo);
        request.onsuccess = function () {
            resolve(true);
        };
        request.onerror = function (event) {
            reject('Error adding data:\n', event.target.errorCode);
        };
    });
};

const getDataByKey = (db, keyName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore']);
        const objectStore = transaction.objectStore('MyObjectStore');

        const request = objectStore.get(keyName);

        request.onsuccess = function (event) {
            resolve(event.target.result);
            console.log(`Data has been retrieved.\n:${event.target.result.name}`);
        };

        request.onerror = function (event) {
            reject(`Failed to retrieve data.\n:${event}`);
        };
    });
};
const getDataByIndex = (db, indexNumber) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore']);
        const objectStore = transaction.objectStore('MyObjectStore');
        const request = objectStore.openCursor();
        request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                if (indexNumber) {
                    cursor.continue();
                    indexNumber--;
                } else {
                    resolve(cursor.value);
                }
            }
            else {
                resolve(null);
            }
        }
        request.onerror = function (event) {
            reject(`Failed to retrieve data.\n:${event}`);
        }
    });
};
const getAllData = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore']);
        const objectStore = transaction.objectStore('MyObjectStore');
        const request = objectStore.getAll();
        request.onsuccess = function (event) {
            resolve(event.target.result);
        }
        request.onerror = function (event) {
            reject(`Failed to retrieve data.\n:${event}`);
        }
    });
}
const countData = (db, imageName = undefined) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore']);
        const objectStore = transaction.objectStore('MyObjectStore');
        const request = objectStore.count(imageName);
        request.onsuccess = function () {
            resolve(request.result);
        }
        request.onerror = function (event) {
            reject(`Failed to count data.\n:${event}`);
        }
    });
}

const updateData = (db, newData) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore'], 'readwrite');
        const objectStore = transaction.objectStore('MyObjectStore');
        const request = objectStore.put(newData);

        request.onsuccess = function () {
            resolve(true);
        };

        request.onerror = function (event) {
            reject(false);
        };
    });
}
const deleteData = (db, keyName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore'], 'readwrite');
        const objectStore = transaction.objectStore('MyObjectStore');

        const request = objectStore.delete(keyName);

        request.onsuccess = function () {
            resolve(true);
        };

        request.onerror = function (event) {
            reject(false);
        };
    });
}
const deleteDataAll = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['MyObjectStore'], 'readwrite');
        const objectStore = transaction.objectStore('MyObjectStore');

        const request = objectStore.clear();

        request.onsuccess = function () {
            resolve(true);
        };

        request.onerror = function (event) {
            reject(false);
        };
    });
}

const deleteDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.deleteDatabase("MyTestDatabase");
        request.onsuccess = function () {
            console.log('Database deleted successfully');
            resolve(true);
        };
        request.onerror = function (event) {
            reject(false);
        };
    });
};

export { initializeDB, addData, getDataByIndex, getAllData, countData, updateData, deleteData, deleteDataAll, deleteDatabase };