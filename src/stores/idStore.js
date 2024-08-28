import { defineStore } from 'pinia';

export const useIdStore = defineStore('idStore', {
    state: () => ({
        employeeId: '',
        palletId: '',
        prePalletId: '',
        showPalletIdInput: false,
        showCamera: false,
    }),
    actions: {
        setShowPalletIdInput(value) {
            this.showPalletIdInput = value;
        },
        setShowCamera(value) {
            this.showCamera = value;
        },
        reset() {
            // this.employeeId = this.employeeId;
            this.palletId = '';
            this.prePalletId = '';
            this.showPalletIdInput = true;
            this.showCamera = false;
        }
    },
});