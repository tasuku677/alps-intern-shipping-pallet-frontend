<template>
  <v-text-field v-model="idStore.palletId" label="Pallet ID" ref="palletIdInput" @input="handlePalletIdInput" autofocus>
    <template v-slot:label>
      <v-icon class="icon" >mdi-shipping-pallet</v-icon> Pallet ID
    </template>
  </v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { useIdStore } from '../stores/idStore';
import { checkPalletId } from '../utils/helper';

const idStore = useIdStore();
const palletIdInput = ref('');

const handlePalletIdInput = () => {
  idStore.palletId = idStore.palletId.slice(idStore.prePalletId.length);
  idStore.prePalletId = idStore.palletId;

  if (checkPalletId(idStore.palletId)) {
    idStore.setShowCamera(true);
    palletIdInput.value.$el.style.color = '#1976D2';
    palletIdInput.value.blur();
  } else {
    palletIdInput.value.$el.style.color = 'red';
    palletIdInput.value.focus();
  }
};

//After submitting the data, all components are reset. The pallet ID input field is focus on again.
const focusPalletIdInput = () => {
  palletIdInput.value.focus();
  palletIdInput.value.$el.style.color = '#212121';
};
defineExpose({ focusPalletIdInput });
</script>

<style scoped>

</style>
