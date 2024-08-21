<template>
  <div>
    <v-btn :disabled="photoStore.numberOfPictures <= 0" color="primary" @click="takePhoto">
      Take Photo
    </v-btn>
    <p :style="{ color: photoStore.numberOfPictures > 0 ? 'red' : 'black' }">
      {{ 4 - photoStore.numberOfPictures }} / {{ photoStore.maxNumberOfPictures }}
    </p>
    <div class="d-flex flex-column align-center mb-5">
      <video ref="video" width="80%" autoplay></video>
      <canvas ref="canvas" style="display: none;"></canvas>
    </div>
    <div id="photo-container">
      <v-row>
        <v-col v-for="(photo, index) in photoStore.photos.slice().reverse()" :key="index" cols="12" md="4">
          <v-card class="custom-border mb-5 d-flex flex-column align-center pt-5">
            <v-img :src="photo.data" width="80%"></v-img>
            <v-card-text>
              <p style="color: red">{{ photo.name }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" variant="outlined" @click="removePhoto(photoStore.photos.length - 1 - index)">
                <svg-icon type="mdi" :path="path" />Remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { getTimeStamp } from '../utils/helper';

import ImageCard from './ImageCard.vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete } from '@mdi/js';

let mediaStream = null;



const path = ref(mdiDelete);



const idStore = useIdStore();
const photoStore = usePhotoStore();
const video = ref(null);
const canvas = ref(null);

const activateCamera = () => {
  const constraints = {
    video: {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      facingMode: 'environment',
    },
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      mediaStream = stream;
      video.value.srcObject = stream;
      video.value.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

const deactivateCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks()[0].stop();
    mediaStream = null;
  }
}

const takePhoto = () => {
  if (photoStore.numberOfPictures > 0) {
    const context = canvas.value.getContext('2d');
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    const data = canvas.value.toDataURL('image/png');
    const photoName = `${idStore.palletId}_${getTimeStamp()}`;

    photoStore.addPhoto({ data, name: photoName });
  }
};

const removePhoto = (index) => {
  // alert(index);
  photoStore.removePhoto(index);
};

// watch(() => idStore.showCamera, (newVal) => {
//   if (newVal) {
//     activateCamera();
//   } 
// });

onMounted(() => {
  activateCamera();
});

// onUnmounted(() => {
//   deactivateCamera();
// });
</script>

<style scoped>
.custom-border {
  border: 0.1px solid #000;
  /* 黒いボーダー */
}
</style>