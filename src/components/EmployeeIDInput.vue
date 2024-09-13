<template>
  <v-text-field
    v-model="idStore.employeeId"
    ref="employeeField"
    autofocus
    @keyup.enter="handleEmployeeField"
    @blur="handleEmployeeField"
    @focus="clearForm"
  >
    <template v-slot:label>
      <v-icon class="icon" color="">mdi-account</v-icon> Employee ID
    </template>
  </v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { useIdStore } from '../stores/idStore';
import { checkEmployeeId } from '../utils/helper';

const idStore = useIdStore();
const employeeField = ref(null);

const handleEmployeeField = () => {
  if (checkEmployeeId(idStore.employeeId)) {
    employeeField.value.$el.style.color = '#1976D2';
    idStore.setShowPalletIdInput(true);
  } else {
    employeeField.value.$el.style.color = 'red';
    idStore.setShowPalletIdInput(false);
    idStore.palletId = '';
  }
  employeeField.value.blur();
};
const clearForm = () =>{
  idStore.employeeId = '';
}
</script>

<style scoped>
.icon {
  vertical-align: sub;
  font-size: 1.5em;
}
</style>
