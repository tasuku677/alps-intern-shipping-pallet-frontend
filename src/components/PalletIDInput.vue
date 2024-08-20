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
  
  const handlePalletIdInput = () => {
    if (checkPalletId(idStore.palletId)) {
      emit('validPalletId');
    } else {
      // エラー処理
    }
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加 */
  </style>
  