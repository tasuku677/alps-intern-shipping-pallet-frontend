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

import { initializeDB, updateData, getData, getAllData, deleteDataAll, deleteDatabase } from '../utils/operateDB';

const photoStore = usePhotoStore();
const idStore = useIdStore();
const palletIdInput = ref(null);
let db = null;

const resetComponents = async () => {
  idStore.reset();
  photoStore.reset();
  palletIdInput.value.focusPalletIdInput();

  // console.log('palletIdInput.value', palletIdInput.value); 
}

const sendImageBackground = async () => {
  if(db === null) db = await initializeDB();
  console.log('db in main', db);
  const allPhotos = await getAllData(db);
  // console.log('allPhotos', allPhotos);
  for (let photo of allPhotos) {
    console.log('photo', photo);
  }
  // alert('Data has been successfully submitted');
};

onMounted(async() => {
  sendImageBackground();
  setInterval(sendImageBackground, 200000);
});

// onMounted(() => {
//     window.addEventListener('beforeunload', deleteDatabase);
  
// });

// onUnmounted(() => {
//     window.removeEventListener('beforeunload', deleteDatabase);
// });

</script>

<style scoped></style>