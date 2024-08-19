<template>
    <v-container>
      <v-row>
        <!-- Employee ID Input -->
        <v-col cols="12">
          <v-text-field
            v-model="photoStore.employeeId"
            label="Employee ID"
            ref="employeeIdInput"
            autofocus
            @input="handleEmployeeIdInput"
          ></v-text-field>
        </v-col>
  
        <!-- Pallet ID Input -->
        <v-col cols="12" v-show="showPalletIdInput">
          <v-text-field
            v-model="photoStore.palletId"
            label="Pallet ID"
            ref="palletIdInput"
            @input="handlePalletIdInput"
          ></v-text-field>
        </v-col>
  
        <!-- Camera and Photo Section -->
        <v-col cols="12" v-show="showCamera">
          <v-btn
            :disabled="photoStore.numberOfPictures <= 0"
            color="primary"
            @click="takePhoto"
          >
            Take Photo
          </v-btn>
          <p :style="{ color: photoStore.numberOfPictures > 0 ? 'red' : 'black' }">
            {{ 4 - photoStore.numberOfPictures }} / {{ 4 }}
          </p>
          <video ref="video" width="100%" autoplay></video>
          <canvas ref="canvas" style="display: none;"></canvas>
          <div id="photo-container">
            <v-row>
              <v-col
                v-for="(photo, index) in photoStore.photos"
                :key="index"
                cols="12"
                md="4"
              >
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
        </v-col>
  
        <!-- Submit Button -->
        <v-col cols="12" v-show="photoStore.numberOfPictures === 0">
          <v-btn color="success" @click="submitPicture">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { usePhotoStore } from '@/stores/photoStore';
  import { checkEmployeeId, checkPalletId, getTimeStamp } from '../helper';
  
  const photoStore = usePhotoStore();
  const video = ref(null);
  const canvas = ref(null);
  const showPalletIdInput = ref(false);
  const showCamera = ref(false);
  
  onMounted(() => {
    // その他の初期化処理があればここに記述
  });
  
  const handleEmployeeIdInput = () => {
    if (checkEmployeeId(photoStore.employeeId)) {
      showPalletIdInput.value = true;
      nextTick(() => {
        const palletInput = document.getElementById('input-pallet-id');
        palletInput.focus();
      });
    } else {
      // エラー処理
    }
  };
  
  const handlePalletIdInput = () => {
    if (checkPalletId(photoStore.palletId)) {
      showCamera.value = true;
      activateCamera();
    } else {
      // エラー処理
    }
  };
  
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
        video.value.srcObject = stream;
        video.value.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
  };
  
  const takePhoto = () => {
    if (photoStore.numberOfPictures > 0) {
      const context = canvas.value.getContext('2d');
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  
      const data = canvas.value.toDataURL('image/png');
      const photoName = `${photoStore.palletId}_${getTimeStamp()}`;
  
      photoStore.addPhoto({ data, name: photoName });
    }
  };
  
  const removePhoto = (index) => {
    photoStore.removePhoto(index);
  };
  
  const submitPicture = () => {
    if (navigator.onLine) {
      alert('Data has been sent to the server');
    } else {
      console.log('offline');
    }
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加 */
  </style>
  