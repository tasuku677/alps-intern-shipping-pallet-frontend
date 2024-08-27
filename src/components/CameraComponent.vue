<template>
  <div>
    <div class="d-flex flex-column align-center mb-5">
      <video ref="video" width="80%" autoplay></video>
      <canvas ref="canvas" style="display: none;"></canvas>
      <v-btn :disabled="photoStore.numberOfPictures >= 10" color="primary" @click="takePhoto" class="circular-btn">
        <svg-icon type="mdi" :path="pathCamera"></svg-icon>
      </v-btn>
      <p>
        {{ photoStore.numberOfPictures }}
      </p>
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
                <svg-icon type="mdi" :path="pathDelete" />Remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { getTimeStamp } from '../utils/helper';

import ImageCard from './ImageCard.vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCamera, mdiDelete } from '@mdi/js';

let mediaStream = null;


const pathCamera = ref(mdiCamera);
const pathDelete = ref(mdiDelete);



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
  if (photoStore.numberOfPictures <= 10) {
    const context = canvas.value.getContext('2d');
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    const data = canvas.value.toDataURL('image/png');
    const photoName = `${idStore.palletId}_${getTimeStamp()}`;

    // console.log("Base64 String Length:", data.length);
    // Base64データのサイズ（バイト単位）
    // const base64Length = data.length - 'data:image/png;base64,'.length;
    // const padding = (data.charAt(data.length - 2) === '=') ? 2 : (data.charAt(data.length - 1) === '=') ? 1 : 0;
    // const byteSize = (base64Length * 3 / 4) - padding;
    // console.log("Data Size in Bytes:", byteSize);


    photoStore.addPhoto({ data, name: photoName });
  }
};

const removePhoto = (index) => {
  // alert(index);
  photoStore.removePhoto(index);
};

watch(() => idStore.showCamera, (newVal) => {
  if (newVal) {
    activateCamera();
  } else {
    deactivateCamera();
  }

});

// onMounted(() => {
//   activateCamera();
// });


// onUnmounted(() => {
//   deactivateCamera();
// });
</script>

<style scoped>
.custom-border {
  border: 0.1px solid #000;
  /* 黒いボーダー */
}

.circular-btn {
  width: 30px;
  /* Adjust the size as needed */
  height: 60px;
  /* Make height equal to width */
  border-radius: 50%;
  /* Make the button circular */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>