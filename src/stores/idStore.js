import { defineStore } from 'pinia';

export const useIdStore = defineStore('idStore', {
    state: () => ({
        employeeId: '',
        palletId: '',
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
    },
});