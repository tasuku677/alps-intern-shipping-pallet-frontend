<template>
  <v-text-field v-model="idStore.palletId" label="Pallet ID" ref="palletIdInput" @input="handlePalletIdInput"
    autofocus>
    <template v-slot:label>
      <svg-icon class="icon" type="mdi" :path="pathPallet" /> Pallet ID
    </template></v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiShippingPallet } from '@mdi/js';

import { useIdStore } from '../stores/idStore';
import { checkPalletId } from '../utils/helper';

const idStore = useIdStore();
const palletIdInput = ref(null);

const pathPallet = ref(mdiShippingPallet);

const handlePalletIdInput = () => {
  idStore.palletId = idStore.palletId.slice(idStore.prePalletId.length);
  idStore.prePalletId = idStore.palletId;

  if (checkPalletId(idStore.palletId)) {
    idStore.setShowCamera(true);
    palletIdInput.value.$el.style.color = '#1976D2';
    palletIdInput.value.blur();
  } else {
    palletIdInput.value.$el.style.color = 'red';
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
.icon {
  vertical-align: sub;
  font-size: 1.5em; /* Adjust the size as needed */
}
</style>