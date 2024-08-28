<template>
  <v-text-field v-model="idStore.employeeId" label="Employee ID" ref="employeeField" autofocus
    @input="handleEmployeeField"></v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { useIdStore } from '../stores/idStore';
import { checkEmployeeId } from '../utils/helper';

const idStore = useIdStore();
const preEmployeeId = ref('');
const employeeField = ref('');

const handleEmployeeField = () => {
  idStore.employeeId = idStore.employeeId.slice(preEmployeeId.value.length);
  preEmployeeId.value = idStore.employeeId;
  if (checkEmployeeId(idStore.employeeId)) {
    employeeField.value.$el.style.color = '#1976D2';
    idStore.setShowPalletIdInput(true);
    employeeField.value.blur();
  }
  else {
    employeeField.value.$el.style.color = 'red';
  }
};
</script>

<style scoped></style>

