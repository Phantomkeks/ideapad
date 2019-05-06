![Alt text](/src/statics/logo_three_post_its/three_post_its_128x128.png?raw=true "Mini-Memo Logo")  
# Mini-Memo

Mini-Memo is a small to do and note app with Vue.js and Quasar as a basis.

### Features
- Simple to do app
- Only client app without need of a backend
- Cloud Storage Provider possible, but not needed

### To Do 
- Hybrid application for iOS and Android
- Lists with caskets
- Refactor code and designs (avoid duplicate code)
- Better failure behavior for loading files / importing notes
- Automatically Synchronise notes when Cloud Storage Provider is maintained (interval / program start sync)
- Delete Dropbox token and other settings button
- Add Google Drive as Cloud Storage Provider
- Add Microsoft OneDrive as Cloud Storage Provider
- Popups/message toast for deleting or similar
- Fix Routing and remove this splitting / read more routing docu / http://localhost:8080/#/ not working
- Test all screens and functions
- Use sync component of Quasar and cloud sync when on notes screen (also sync on start of app) (Pull-To-Refresh)
- Add file input to cloud storage setting -> so the user can say where to put or where get the note file
- Copy selected notes functionality
- Use watch + intermediate (e.g. settings screen) to avoid too many layouts

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
- https://github.com/axios/axios

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

##### Play Store
- https://support.google.com/googleplay/android-developer/answer/113469
- https://stackoverflow.com/questions/27435068/how-do-i-put-my-cordova-application-on-the-android-play-store
