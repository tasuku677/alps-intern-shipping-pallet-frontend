<template>
  <v-text-field v-model="idStore.employeeId" label="Employee ID" ref="employeeIdInput" autofocus
    @input="handleEmployeeIdInput"></v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { useIdStore } from '../stores/idStore';
import { checkEmployeeId } from '../utils/helper';

const idStore = useIdStore();
const preEmployeeId = ref('');
const employeeIdInput = ref('');

const handleEmployeeIdInput = () => {
  idStore.employeeId = idStore.employeeId.slice(preEmployeeId.value.length);
  preEmployeeId.value = idStore.employeeId;
  if (checkEmployeeId(idStore.employeeId)) {
    employeeIdInput.value.$el.style.color = '#1976D2';
    idStore.setShowPalletIdInput(true);
    employeeIdInput.value.blur()
  }
  else {
    employeeIdInput.value.$el.style.color = 'red';
  }
};
</script>

<style scoped></style>

