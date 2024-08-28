<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { sendImages } from '../utils/sendImages';

const idStore = useIdStore();
const photoStore = usePhotoStore();

const emit = defineEmits(['reset']);
const submitPicture = async () => {
    if (!navigator.onLine) { //!navigator.onLine => need to be modified into navigator.onLine in the end.
        //send the iamges to the server.
        // await sendImages(photoStore.photos, idStore.employeeId, idStore.palletId);
        // console.log('submitPicture');
        // await deleteDataAll();
    } else {
        let db = await initializeDB();
        // await deleteDataAll(db);
        for (const photo of photoStore.photos) {
            await updateData(db, { data: photo.data, name: photo.name }); //x: updateData(db, photo); this cause an error because the `photo` object is runtime JavaScript object, which is not accepted by IndexedDB. 
            // console.log('add data', photo.data.length);
            // alert('add data');
        }
        for (const photo of photoStore.photos) {
            await getData(db, photo.name);
        }
        // alert('Data has been successfully submitted');
        emit('reset');
    }
};

const initializeDB = () => {
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
                db.createObjectStore('MyObjectStore', { keyPath: 'name' });
                console.log('Create object store\n');
            }
            else {
                console.log('Object store already exists\n');
            }
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
        console.log(`Data has been retrieved.\n:${event.target.result.name}`);
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
        console.log(`${imageName} has been deleted.\n`);
    };

    request.onerror = function (event) {
        console.error("Failed to delete data.\n", event);
    };
}
const deleteDataAll = (db) => {
    const transaction = db.transaction(['MyObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('MyObjectStore');

    const request = objectStore.clear();

    request.onsuccess = function () {
        console.log("All data has been deleted.\n");
    };

    request.onerror = function (event) {
        console.error("Failed to delete all data.\n", event);
    };
}

const deleteDatabase = () => {
    const request = window.indexedDB.deleteDatabase("MyTestDatabase");
    request.onsuccess = function () {
        console.log("Database deleted successfully\n");
    };
    request.onerror = function (event) {
        console.error("Failed to delete database:\n", event);
    };
};


onMounted(() => {
    window.addEventListener('beforeunload', deleteDatabase);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', deleteDatabase);
});

</script>
