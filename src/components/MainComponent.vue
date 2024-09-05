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
      <v-col cols="12" v-show="idStore.showCamera">
        <CameraComponent ref="cameraRef" />
      </v-col>

      <v-col cols="3" v-show="photoStore.photos.length > 0">
        <SubmitButton @reset="resetComponents" />
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

import { initializeDB, updateData, getDataByIndex, getAllData, deleteData, deleteDatabase } from '../utils/operateDB';
import { sendImages } from '../utils/sendImages';


const photoStore = usePhotoStore();
const idStore = useIdStore();
const palletIdInput = ref(null);

const resetComponents = async () => {
  idStore.reset();
  photoStore.reset();
  palletIdInput.value.focusPalletIdInput();

  // console.log('palletIdInput.value', palletIdInput.value); 
}

const sendImageBackground = async () => {
  if(photoStore.numberOfUnsentPallet === 0) return;
  else {
    const db = await initializeDB();
    console.log('db in main', db);
    const unsentPallet = await getDataByIndex(db, 0); 
    console.log('unsentPallet', unsentPallet);  // alert('Data has been successfully submitted');
    const response = await sendImages(unsentPallet.currentSessionPhotos, unsentPallet.employeeId, unsentPallet.palletId);
    // alert('response', response)
    if(response.status === 200) {
      const isDone =  await deleteData(db, unsentPallet.palletId);
      if(isDone) photoStore.numberOfUnsentPallet -= 1;
    }
    else {
      console.log('Error in sending images');
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

<style scoped></style>