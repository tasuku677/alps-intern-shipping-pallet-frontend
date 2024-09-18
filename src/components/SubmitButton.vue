<template>
    <v-btn style="height:50px" color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { initializeDB, addData, countData, updateData } from '../utils/operateDB';
const idStore = useIdStore();
const photoStore = usePhotoStore();

const emit = defineEmits(['reset']);

const submitPicture = async () => {
    let db = await initializeDB();
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
        if (isDone === true) photoStore.updateUnsentPallet(await countData(db));
    }
    catch (e) {
        if (confirm("This pallet has already been submitted before. Do you want to overwrite it?")) {
            await updateData(db, temp);
        } else {
            console.log("This data has been discarded.")
        }
    }
    emit('reset');
};

</script>
<style scoped></style>