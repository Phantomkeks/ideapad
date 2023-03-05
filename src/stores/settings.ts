import { defineStore } from 'pinia';

interface Setting {
  importPassphrase: string;
  exportPassphrase: string;
  selectedLanguage: string;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    settings: {
      importPassphrase: 'ImportPassphrase',
      exportPassphrase: 'ExportPassphrase',
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
