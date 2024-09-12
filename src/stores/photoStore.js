// stores/photoStore.js
import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photoStore', {
  state: () => ({
    photos: [],
    numberOfUnsentPallet: 0,
  }),
  actions: {
    addPhoto(photoData) {
      this.photos.push(photoData);
    },
    removePhoto(index) {
      this.photos.splice(index, 1);
    },
    reset() {
      this.photos = [];
    },
    incrementUnsentPallet() {
      this.numberOfUnsentPallet += 1;
    },
    decrementUnsentPallet() {
      this.numberOfUnsentPallet -= 1;
    },
    updateUnsentPallet(number) {
      this.numberOfUnsentPallet = number;
    }
  },
});
