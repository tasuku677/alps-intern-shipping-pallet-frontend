<template>
  <v-text-field
    v-model="idStore.employeeId"
    ref="employeeField"
    autofocus
    @input="handleEmployeeField"
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
const preEmployeeId = ref('');
const employeeField = ref(null);

const handleEmployeeField = () => {
  idStore.employeeId = idStore.employeeId.slice(preEmployeeId.value.length);
  preEmployeeId.value = idStore.employeeId;

  if (checkEmployeeId(idStore.employeeId)) {
    employeeField.value.$el.style.color = '#1976D2';
    idStore.setShowPalletIdInput(true);
    employeeField.value.blur();
  } else {
    employeeField.value.$el.style.color = 'red';
  }
};
</script>

<style scoped>
.icon {
  vertical-align: sub;
  font-size: 1.5em; /* Adjust the size as needed */
}
</style>
