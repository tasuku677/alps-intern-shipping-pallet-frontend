<template>
  <v-container>
    <v-row>

      <TopBar />

      <!-- Employee ID Input -->
      <v-col cols="12">
        <EmployeeIDInput ref="employeeIdInput" />
      </v-col>

      <!-- Pallet ID Input -->
      <v-col cols="12" v-show="idStore.showPalletIdInput">
        <PalletIDInput ref="palletIdInput" />
      </v-col>

      <!-- Camera Component -->
      <v-col cols="12" v-show="idStore.showCamera" class="camera-container">
        <CameraComponent ref="cameraRef" />
        <SubmitButton v-show="photoStore.photos.length > 0" @reset="resetComponents" class="submit-button"/>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import { usePhotoStore } from '../stores/photoStore';
import { useIdStore } from '../stores/idStore';

import TopBar from './TopBar';
import EmployeeIDInput from './EmployeeIDInput';
import PalletIDInput from './PalletIDInput';
import CameraComponent from './CameraComponent';
import SubmitButton from './SubmitButton';

import { initializeDB, updateData, getDataByIndex, getAllData, countData, deleteData, deleteDatabase } from '../utils/operateDB';
import { sendImages } from '../utils/sendImages';


const photoStore = usePhotoStore();
const idStore = useIdStore();
const palletIdInput = ref(null);

const resetComponents = async () => {
  idStore.reset();
  photoStore.reset();
  palletIdInput.value.focusPalletIdInput();
}

const sendImageBackground = async () => {
  if(photoStore.numberOfUnsentPallet === 0) return;
  else {
    const db = await initializeDB();
    console.log('db in main', db);
    const unsentPallet = await getDataByIndex(db, 0); 
    console.log('unsentPallet', unsentPallet);
    const response = await sendImages(unsentPallet.employeeId, unsentPallet.palletId, unsentPallet.currentSessionPhotos);
    if(response.status === 200) {
      const isDone =  await deleteData(db, unsentPallet.palletId);
      // if(isDone === true) photoStore.decrementUnsentPallet();
      if(isDone === true) photoStore.updateUnsentPallet(await countData(db));
    }
    else if(response.status === 421 || response.status === 422) {
      alert(response.message, 'The data will be deleted');
      const isDone =  await deleteData(db, unsentPallet.palletId);
      if(isDone === true) photoStore.updateUnsentPallet(await countData(db));
    }
    else {
      console.log(response.message);
    }
  }
};

let intervalId;
onMounted(async() => {
  await sendImageBackground();
  intervalId = setInterval(sendImageBackground, 5000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});

// onMounted(() => {
//     window.addEventListener('beforeunload', deleteDatabase);
  
// });

// onUnmounted(() => {
//     window.removeEventListener('beforeunload', deleteDatabase);
// });

</script>

<style scoped>
.camera-container {
  position: relative;
}

.submit-button {
  position: fixed;
  bottom: 100px;
  right: 20px;
}</style>