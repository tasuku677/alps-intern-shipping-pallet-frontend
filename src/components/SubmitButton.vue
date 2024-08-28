<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { sendImages } from '../utils/sendImages';
import { initializeDB, updateData, getData, deleteDataAll, deleteDatabase } from '../utils/operateDB';
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




onMounted(() => {
    window.addEventListener('beforeunload', deleteDatabase);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', deleteDatabase);
});

</script>
