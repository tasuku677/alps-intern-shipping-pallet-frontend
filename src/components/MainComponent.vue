<template>
  <v-container>
    <v-row>
      
      <TopBar/>

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
import { ref, onMounted } from 'vue';

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


const resetComponents = async () => {
  idStore.reset();
  photoStore.reset();
  palletIdInput.value.focusPalletIdInput();

  // console.log('palletIdInput.value', palletIdInput.value); 
}

const sendImageBackground = async () => {
  let db = await initializeDB();
  console.log('db in main', db);
  // getAllData(db);

  // for (const photo of photoStore.photos) {
  //   await updateData(db, { data: photo.data, name: photo.name }); //x: updateData(db, photo); this cause an error because the `photo` object is runtime JavaScript object, which is not accepted by IndexedDB. 
  //   // console.log('add data', photo.data.length);
  //   // alert('add data');
  // }
  // alert('Data has been successfully submitted');
};

// onMounted(() => {
//   window.addEventListener('online', sendImageBackground);
//   window.addEventListener('offline', ()=> console.log('Hello') );
// });

// onMounted(() => {
//     window.addEventListener('beforeunload', deleteDatabase);
// });

// onUnmounted(() => {
//     window.removeEventListener('beforeunload', deleteDatabase);
// });

</script>

<style scoped></style>