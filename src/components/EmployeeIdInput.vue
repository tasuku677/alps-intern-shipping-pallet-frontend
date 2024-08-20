<template>
    <v-text-field
      v-model="photoStore.employeeId"
      label="Employee ID"
      ref="employeeIdInput"
      autofocus
      @input="handleEmployeeIdInput"
    ></v-text-field>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePhotoStore } from '../stores/photoStore';
  import { checkEmployeeId } from '../utils/helper';
  
  const photoStore = usePhotoStore();
  
  const handleEmployeeIdInput = () => {
    if (checkEmployeeId(photoStore.employeeId)) {
      emit('validEmployeeId');
    } else {
      // エラー処理
    }
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加 */
  </style>
  