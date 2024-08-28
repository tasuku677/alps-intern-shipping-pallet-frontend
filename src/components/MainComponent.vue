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

      <v-col cols="3" v-show="photoStore.photos.length > 0">
        <SubmitButton @reset="resetComponents"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, nextTick} from 'vue';
import { usePhotoStore } from '../stores/photoStore';
import { useIdStore } from '../stores/idStore';
import EmployeeIDInput from './EmployeeIDInput';
import PalletIDInput from './PalletIDInput';
import CameraComponent from './CameraComponent';
import SubmitButton from './SubmitButton';

const photoStore = usePhotoStore();
const idStore = useIdStore();
const palletIdInput = ref(null);


const resetComponents = async () => {
  idStore.reset();
  photoStore.reset();
  palletIdInput.value.focusPalletIdInput();

  console.log('palletIdInput.value', palletIdInput.value);  // ここで ref の状態を確認
}


</script>

<style scoped>
</style>