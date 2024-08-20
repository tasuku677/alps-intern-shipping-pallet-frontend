// stores/photoStore.js
import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photoStore', {
  state: () => ({
    photos: [],
    numberOfPictures: 4,
    maxNumberOfPictures: 4,
  }),
  actions: {
    addPhoto(photoData) {
      this.photos.push(photoData);
      this.numberOfPictures -= 1;
    },
    removePhoto(index) {
      this.photos.splice(index, 1);
      this.numberOfPictures += 1;
    },
  },
});
