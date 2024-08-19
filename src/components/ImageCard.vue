<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn @click="capturePhoto">Capture Photo</v-btn>
        </v-col>
      </v-row>
      <v-row id="photo-container">
        <v-col v-for="(photo, index) in photoStore.photos" :key="index" cols="12" md="4">
          <v-card class="mb-5">
            <v-img :src="photo.data" width="100%"></v-img>
            <v-card-text>
              <p style="color: red">{{ photo.name }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="removePhoto(index)">Remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePhotoStore } from '../stores/photoStore';
  
  const photoStore = usePhotoStore();
  const video = ref(null);
  const canvas = ref(null);
  
  const capturePhoto = () => {
    const context = canvas.value.getContext('2d');
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  
    const data = canvas.value.toDataURL('image/png');
    const photoName = `${photoStore.palletId}_${getTimeStamp()}`;
  
    photoStore.addPhoto({ data, name: photoName });
  };
  
  const removePhoto = (index) => {
    photoStore.removePhoto(index);
  };
  
  const getTimeStamp = () => {
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  };
  </script>
  