\<template>
    <v-app-bar style="background-color: lightyellow;">
        <v-container>
            <v-row>
                <v-col cols="10">
                    <v-toolbar-title>Barcode Scanner</v-toolbar-title>
                </v-col>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-col cols="0"></v-col> -->
                <v-col cols="2">
                    <v-chip v-if="photoStore.numberOfUnsentPallet" color="error" class="d-flex align-center justify-end">
                        <v-icon>mdi-exclamation</v-icon>
                        {{ photoStore.numberOfUnsentPallet }}
                    </v-chip>
                    <v-icon v-else color="success">mdi-check-circle</v-icon>
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
import { initializeDB, getAllData, countData, updateData, deleteData, deleteDataAll, deleteDatabase } from '../utils/operateDB';

const photoStore = usePhotoStore();

onMounted(async () => {
    let db = await initializeDB();
    photoStore.numberOfUnsentPallet = await countData(db);
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
