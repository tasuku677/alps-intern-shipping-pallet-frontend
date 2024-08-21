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

      <!-- Camera Component -->
      <v-col cols="12" v-show="idStore.showCamera">
        <CameraComponent ref="cameraRef"/>
      </v-col>

      <!-- Submit Button -->
      <!-- <v-col cols="3" v-show="photoStore.numberOfPictures === 0">
        <v-btn color="success" @click="submitPicture">Submit</v-btn>
      </v-col> -->
      <v-col cols="3" v-show="photoStore.numberOfPictures === 0">
        <SubmitButton/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePhotoStore } from '../stores/photoStore';
import { useIdStore } from '../stores/idStore';
import EmployeeIDInput from './EmployeeIDInput';
import PalletIDInput from './PalletIDInput';
import CameraComponent from './CameraComponent';
import SubmitButton from './SubmitButton';

const photoStore = usePhotoStore();
const idStore = useIdStore();

</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>