![Alt text](/src/statics/logo_three_post_its/three_post_its_128x128.png?raw=true "Mini-Memo Logo")  
# Mini-Memo

Mini-Memo is a small to do and note app with Vue.js and Quasar as a basis.

### Features
- Simple to do app
- Only client app without need of a backend
- Cloud Storage Provider possible, but not needed

### To Do 
- Hybrid application for iOS and Android
- Vuex Store has multiple state entries of 'notes' and 'deletedNotes'
- Tab/hold on notes to delete and restore
- Lists with caskets
- Refactor code and designs (avoid duplicate code)
- Caching problem after note import (Home screen)
- Better solution for using CryptoJS?
- Better failure behavior for loading files / importing notes
- i18n German and English
- Make use of axios (https://github.com/axios/axios)
- Indicate local methods with _methodName()
- Automatically Synchronise notes when Cloud Storage Provider is maintained (interval / program start sync)
- Delete Dropbox token and other settings button
- Add Google Drive as Cloud Storage Provider
- Add Microsoft OneDrive as Cloud Storage Provider

##### Future
- Desktop application
- More than one user per note file

### Local Setup
- Install [Quasar Framework](https://v1.quasar-framework.org/quasar-cli/installation)
- Install [Vue.js](https://vuejs.org/)
- Install [Vue CLI](https://cli.vuejs.org)
- Open a terminal and run 'quasar dev'

### Further Links

##### Quasar Framework
- https://v1.quasar-framework.org/vue-components/tabs
- https://quasar-framework.org/guide/quasar-cli.html

##### Vue.js
- https://vuetifyjs.com/en/
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/3
- https://vuejs.org/v2/guide/components.html
- https://github.com/vuejs/awesome-vue
- https://www.npmjs.com/package/vue2-touch-events

##### Icon Libraries
- https://material.io/tools/icons/?style=baseline
- https://ionicframework.com/docs/v3/ionicons/
- https://materialdesignicons.com/
- https://fontawesome.com/

##### Cloud Integration
- https://www.dropbox.com/developers/documentation/javascript#tutorial
- https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesDownload__anchor
- https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/?view=odsp-graph-online
- https://developers.google.com/api-client-library/javascript/start/start-js
