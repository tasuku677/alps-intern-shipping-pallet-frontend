\<template>
    <v-app-bar>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-toolbar-title>Barcode Scanner</v-toolbar-title>
                </v-col>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-col cols="0"></v-col> -->
                <v-col cols="6">
                    <v-chip v-if="photoStore.storedPhotosCount" color="secondary" class="mr-4 pl-1" label>
                        <v-icon>mdi-camera</v-icon>
                        <span class="chip-text">{{ photoStore.storedPhotosCount }} photo{{ photoStore.storedPhotosCount > 1 ? 's' : '' }} need to be sent.</span>
                    </v-chip>
                    <v-chip v-else color="success" class="mr-4" label>
                        <v-icon>mdi-check-circle</v-icon>
                        <span class="chip-text">All photos have been sent.</span>
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script setup>
import { ref, onMounted } from 'vue';

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdi } from '@mdi/js';

import { usePhotoStore } from '../stores/photoStore';
import { initializeDB, getData, getAllData, countData, updateData, deleteData, deleteDataAll, deleteDatabase } from '../utils/operateDB';

const photoStore = usePhotoStore();

onMounted(async () => {
    let db = await initializeDB();
    photoStore.storedPhotosCount = await countData(db);
});

</script>

<style scoped>
.chip-text {
  white-space: nowrap;
  font-size: 0.8em;
  /* overflow: visible;
  display: inline-block; */
  /* max-width: 100%; */
}
</style>




