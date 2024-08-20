<template>
    <div id="photo-container">
        <v-row>
            <v-col v-for="(photo, index) in photoStore.photos" :key="index" cols="12" md="4">
                <v-card class="mb-5">
                    <v-img :src="photo.data" height="200px"></v-img>
                    <v-card-text>
                        <p style="color: red">{{ photo.name }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" @click="removePhoto(index)">Remove</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
const propos = defineProps({
    photos: Array,
});

const emit = defineEmits(['remove-photo']);

const removePhoto = (index) => {
    emit('remove-photo', index);
};


</script>