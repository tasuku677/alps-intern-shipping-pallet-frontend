<template>
    <v-text-field
      v-model="idStore.palletId"
      label="Pallet ID"
      ref="palletIdInput"
      @input="handlePalletIdInput"
      autofocus
    ></v-text-field>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useIdStore } from '../stores/idStore';
  import { checkPalletId } from '../utils/helper';
  
  const idStore = useIdStore();
  const prePalletId = ref('');
  const palletIdInput = ref(null);
  
  const handlePalletIdInput = () => {
    idStore.palletId = idStore.palletId.slice(prePalletId.value.length);
    prePalletId.value = idStore.palletId;
    if (checkPalletId(idStore.palletId)) {
      idStore.setShowCamera(true);
      palletIdInput.value.$el.style.color = '#1976D2';
      palletIdInput.value.blur();
    } else {
      palletIdInput.value.$el.style.color = 'red';
    }
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加 */
  </style>
  