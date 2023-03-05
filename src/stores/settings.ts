import { defineStore } from 'pinia';

interface Setting {
  importPassphrase: string;
  exportPassphrase: string;
  cloudPassphrase: string;
  dropboxToken: string;
  dropboxAppId: string;
  googleDriveToken: string;
  cloudIntegrationStep: number;
  selectedLanguage: string;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    settings: {
      importPassphrase: 'ImportPassphrase',
      exportPassphrase: 'ExportPassphrase',
      cloudPassphrase: 'CloudPassphrase',
      dropboxToken: '',
      dropboxAppId: 'dhok9s70o02egga',
      googleDriveToken: '',
      cloudIntegrationStep: 1,
      selectedLanguage: 'en-us',
    } as Setting,
  }),

  getters: {
    getSettings: (state) => {
      return state.settings;
    },
    getLanguageSetting: (state) => {
      return state.settings.selectedLanguage;
    },
  },
});
