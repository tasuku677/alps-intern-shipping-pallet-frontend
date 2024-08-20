<template>
  <v-container>
    <v-row>
      <!-- Employee ID Input -->
      <v-col cols="12">
        <EmployeeIDInput ref="employeeIdInput" />
      </v-col>

      <!-- Pallet ID Input -->
      <v-col cols="12" v-show="idStore.showPalletIdInput">
        <PalletIDInput ref="palletIdInput"/>
      </v-col>

      <!-- Camera Component
      <v-col cols="12" v-show="idStore.showCamera">
        <CameraComponent />
      </v-col>

      Submit Button -->
      <!-- <v-col cols="3" v-show="photoStore.numberOfPictures === 0">
        <v-btn color="success" @click="submitPicture">Submit</v-btn> -->
      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { usePhotoStore } from '../stores/photoStore';
import { useIdStore } from '../stores/idStore';
import EmployeeIDInput from './EmployeeIDInput';
import PalletIDInput from './PalletIDInput';
// import CameraComponent from './CameraComponent';

const photoStore = usePhotoStore();
const idStore = useIdStore();


const submitPicture = () => {
  if (navigator.onLine) {
    alert('Data has been sent to the server');
  } else {
    console.log('offline');
  }
};
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>