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
    idStore.setShowPalletIdInput(true);
    employeeIdInput.value.$el.style.backgroundColor = 'white';
    employeeIdInput.value.blur()
  }
  else {
    employeeIdInput.value.employeeIdInput.$el.style.backgroundColor = 'red';
  }
};
</script>

<style scoped></style>

<!--   

<template>
  <v-text-field v-model="employeeId" label="Employee ID" @input="validateEmployeeId" autofocus></v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { checkEmployeeId } from '../utils/helper'; // 有効なIDを確認するための関数

const employeeId = ref('');

function validateEmployeeId() {
  if (checkEmployeeId(employeeId.value)) {
    // IDが有効ならイベントを発火
    emit('validEmployeeId');
  }
};

</script> -->