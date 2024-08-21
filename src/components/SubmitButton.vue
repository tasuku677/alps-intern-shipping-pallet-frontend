<template>
    <v-btn color="success" @click="submitPicture">Submit</v-btn>
</template>

<script setup>
import { usePhotoStore } from '../stores/photoStore';
import { useIdStore } from '../stores/idStore';

const submitPicture = () => {
    if (navigator.onLine) {
        alert('Data has been sent to the server');
    } else {
        console.log('offline');
    }
};
</script>
