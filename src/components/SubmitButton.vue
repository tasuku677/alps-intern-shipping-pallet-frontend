<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { sendImages } from '../utils/sendImages';
import { initializeDB, addData, updateData, getData, deleteDataAll, deleteDatabase } from '../utils/operateDB';
const idStore = useIdStore();
const photoStore = usePhotoStore();

const emit = defineEmits(['reset']);

const submitPicture = async () => {
    let db = await initializeDB();
    // await deleteDataAll(db);

    const temp = {
        palletId: idStore.palletId,
        currentSessionPhotos: photoStore.photos.map(photo => ({
            name: photo.name,
            data: photo.data
        })),
    }
    try {
        const isDone = await addData(db, temp);
        if (isDone === true) photoStore.numberOfUnsentPallet += 1;
    }
    catch (e) {
        
        alert('error in sendImages', e);
    }




    // for (const photo of photoStore.photos) {
    //     try {
    //         const isDone = await addData(db, { data: photo.data, name: photo.name, palletId: idStore.palletId });//x: updateData(db, photo); this cause an error because the `photo` object is Proxy object, which is not accepted by IndexedDB.
    //         // const isDone = await updateData(db, photo);
    //         if (isDone === true) photoStore.storedPhotosCount += 1;
    //     }
    //     catch (e) {
    //         console.log('error in submitPicture', e);
    //         // alert(`${idStore.palletId} was not saved`);
    //     }
    //     // console.log('add data', photo.data.length);
    //     // alert('add data');
    // }
    emit('reset');
};

</script>
