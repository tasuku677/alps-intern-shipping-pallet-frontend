<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { sendImages } from '../utils/sendImages';

const idStore = useIdStore();
const photoStore = usePhotoStore();

const submitPicture = async () => {
    if (!navigator.onLine) { //!navigator.onLine => need to be modified into navigator.onLine in the end.
        //send the iamges to the server.
        // await sendImages(photoStore.photos, idStore.employeeId, idStore.palletId);

    } else {

        let db = await initializeDB();
        for (const photo of photoStore.photos) {
            await updateData(db, {data: photo.data, name: photo.name}); //x: updateData(db, photo); this cause an error because the `photo` object is runtime JavaScript object, which is not accepted by IndexedDB. 
            // console.log('add data', photo.data.length);
        }
        for (const photo of photoStore.photos) {
          await getData(db, photo.name);
        }

    }
};

const initializeDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("MyTestDatabase", 2);
        request.onerror = function (event) {
            console.log("Why didn't you allow my web app to use IndexedDB?!\n");
            reject(event);
        };
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('MyObjectStore')) {
                db.createObjectStore('MyObjectStore', { keyPath: 'name' });
                console.log('create object store\n');
            }
            else {
                console.log('object store already exists\n');
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log("Success to open database\n");
            resolve(db);
        };
    });
};
const addData = (db, photo) => {
    const transaction = db.transaction(['MyObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('MyObjectStore');
    const request = objectStore.add(photo);
    request.onsuccess = function () {
        console.log('The data has been written successfully\n');
    };
    request.onerror = function (event) {
        console.error('Error adding data:\n', event.target.errorCode);
    };
};

const getData = (db, imageName) => {
    const transaction = db.transaction(['MyObjectStore']);
    const objectStore = transaction.objectStore('MyObjectStore');

    const request = objectStore.get(imageName);

    request.onsuccess = function (event) {
        console.log(`Data has been retrieved.\n:${event.target.result.data}`);
    };

    request.onerror = function (event) {
        console.log(`Failed to retrieve data.\n:${event}`);
    };
};
const updateData = (db, newData) => {
    const transaction = db.transaction(['MyObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('MyObjectStore');

    const clonedData = JSON.parse(JSON.stringify(newData));


    const request = objectStore.put(newData);

    request.onsuccess = function () {
        console.log("Data has been successfully updated.\n");
    };

    request.onerror = function (event) {
        console.error("Failed to update data.\n", event);
    };
}
const deleteData = (db, imageName) => {
    const transaction = db.transaction(['MyObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('MyObjectStore');

    const request = objectStore.delete(imageName);

    request.onsuccess = function () {
        console.log("Data has been deleted.\n");
    };

    request.onerror = function (event) {
        console.error("Failed to delete data.\n", event);
    };
}


</script>
