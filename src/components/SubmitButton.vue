<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { initializeDB, addData, deleteDatabase } from '../utils/operateDB';
const idStore = useIdStore();
const photoStore = usePhotoStore();

const emit = defineEmits(['reset']);

const submitPicture = async () => {
    let db = await initializeDB();
    // await deleteDataAll(db);

    const temp = {
        employeeId: idStore.employeeId,
        palletId: idStore.palletId,
        currentSessionPhotos: photoStore.photos.map(photo => ({
            data: photo.data,
            name: photo.name,
            isoTimeStamp: photo.isoTimeStamp,
        })),
    }
    try {
        const isDone = await addData(db, temp);
        if (isDone === true) photoStore.numberOfUnsentPallet += 1;
    }
    catch (e) {
        alert('Failed to send the images', e);
    }
    emit('reset');
};

</script>
