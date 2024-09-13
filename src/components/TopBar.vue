\<template>
  <v-app-bar style="background-color: rgb(0, 73, 135);">
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar-title style="color: white; font-family: sans-serif;">Export Pallet Check</v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex align-center justify-end">
          <v-chip v-if="photoStore.numberOfUnsentPallet" color="error" variant="flat" class="auto-width-chip" style="border-radius: 50px;" @click="snackbar = true">
            <v-icon class="arrow-icon">mdi-arrow-up</v-icon>
            {{ photoStore.numberOfUnsentPallet }}
          </v-chip>
          <v-icon v-else color="success">mdi-check-circle</v-icon>
        </v-col>
      </v-row>     
    </v-container>
  </v-app-bar>
  <v-snackbar v-model="snackbar" top right timeout="1000" click-outside @click-outside="snackbar = false">
    {{ photoStore.numberOfUnsentPallet }} pallet{{ photoStore.numberOfUnsentPallet > 1 ? 's are':' is' }} not sent yet.
  </v-snackbar>

</template>
<script setup>
import { ref, onMounted } from 'vue';

import { usePhotoStore } from '../stores/photoStore';
import { initializeDB, countData} from '../utils/operateDB';

const photoStore = usePhotoStore();
const snackbar = ref(false);

onMounted(async () => {
  let db = await initializeDB();
  photoStore.numberOfUnsentPallet = await countData(db);
});


</script>

<style scoped>

.chip-text {
  white-space: nowrap;
  font-size: 0.8em;
}

.arrow-icon {
  bottom: 0;
  animation: moveUp 2s ease-in-out infinite;
}

@keyframes moveUp {
  0% {
    opacity: 1;
    transform: translateY(5px);
  }

  50% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 0;
    transform: translateY(5px);
  }
}
</style>
