<template>
  <div>
    <div id="camera" class="d-flex flex-column align-center mb-5">
      <video ref="video" width="100%" autoplay></video>
      <canvas ref="canvas" style="display: none;"></canvas>
      <v-btn :disabled="photoStore.photos.length >= 10" color="primary" @click="takePhoto" class="circular-btn">
        <v-icon size="x-large">mdi-camera</v-icon>
      </v-btn>
      <p>
        {{ photoStore.photos.length }}
      </p>
    </div>
    <div id="photo-container">
      <v-row>
        <v-col v-for="(photo, index) in photoStore.photos.slice().reverse()" :key="index" cols="12" md="4">
          <v-card class="custom-border mb-5 d-flex flex-column align-center pt-5">
            <!-- <v-img :src="photo.data" width="80%"></v-img> -->
            <v-img :src="getBlobUrl(photo.data)" width="80%"></v-img>
            <v-card-text>
              <p style="color: red">{{ photo.name }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" variant="outlined" @click="removePhoto(photoStore.photos.length - 1 - index)">
                <v-icon>mdi-delete</v-icon>
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useIdStore } from '../stores/idStore';
import { usePhotoStore } from '../stores/photoStore';
import { getTimeStampISO, isoToPhotoTimestamp } from '../utils/helper';


let mediaStream = null;


const idStore = useIdStore();
const photoStore = usePhotoStore();
const video = ref(null);
const canvas = ref(null);

const activateCamera = () => {
  const constraints = {
    video: {
      width: { ideal: 960 },
      height: { ideal: 960 },
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
  if (photoStore.photos.length <= 10) {
    const context = canvas.value.getContext('2d');
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    // toDataURL version
    // const data = canvas.value.toDataURL('image/png');
    // const photoName = `${idStore.palletId}_${getTimeStamp()}`;
    // console.log('Base64', data);
    // photoStore.addPhoto({ data, name: photoName });

    //blob version
    canvas.value.toBlob(async (blob) => {
      if (blob) {
        const isoString = getTimeStampISO();
        const timeStamp = isoToPhotoTimestamp(isoString);
        const photoName = `${idStore.palletId}_${timeStamp}`;
        if (photoStore.photos.length === 0 || photoStore.photos[photoStore.photos.length - 1].name !== photoName) {
          photoStore.addPhoto({ data: blob, name: photoName, isoTimeStamp: isoString });
          console.log('blob', blob);
          
          nextTick(() => {
            video.value.scrollIntoView({ block: "center", inline: "nearest", behavior: 'smooth' });
          });
        }
      }
    }, 'image/png');
  }
};
function getBlobUrl(blob) {
  return URL.createObjectURL(blob);
}

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


</script>

<style scoped>
#camera {
  /* border: #000 1px solid; */
  padding: 5px 5px 0px 5px;
  background-color: #000;
}

.custom-border {
  border: 0.1px solid #000;
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