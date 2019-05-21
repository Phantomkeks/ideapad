# Ideapad
![Alt text](/src/statics/logo_three_post_its/three_post_its_128x128.png?raw=true "Ideapad Logo")  

Ideapad is a small idea and note app with Vue.js and Quasar as a basis.

### Features
- Only client app without need of a backend
- Cloud Storage Provider possible, but not needed

### To Do 
- Test all screens and functions
- Hybrid application for iOS and Android
- Refactor code and designs (avoid duplicate code)
- Better failure behavior for loading files / importing notes
- Automatically Synchronise notes when Cloud Storage Provider is maintained (interval / program start sync)
- Delete Dropbox token and other settings button
- Add Google Drive as Cloud Storage Provider
- Use sync component of Quasar and cloud sync when on notes screen (also sync on start of app) (Pull-To-Refresh)
- Add file input to cloud storage setting -> so the user can say where to put or where get the note file
- Fix masonry when second note is huge and the first one small (third one will be beyond second one)
- Check import of duplicate ids
- Fix caskets padding in detail view
- Add splash screen icons
- On trash screen the caskets are not displayed
- Export does not work on mobile
- Dropbox redirects to browser
- Delete entries in trash after 30 days
- Test mobile app and write down bugs
- Retest draggable, select and scrolling

### Local Setup
- Install [Quasar Framework](https://v1.quasar-framework.org/quasar-cli/installation)
- Install [Vue.js](https://vuejs.org/)
- Install [Vue CLI](https://cli.vuejs.org)
- Open a terminal and run 'quasar dev'

### Build APK
- sudo quasar build -m cordova -T android
- sudo cordova build

- sudo cordova platform remove android;
- sudo cordova platform add android;
- sudo cordova build android;

### Git
Undo Commits:
- git reset --soft HEAD~2

Local:
- git config user.name <NAME>
- git config user.email <EMAIL> 

Global:
- git config --global user.name <NAME>
- git config --global user.email <EMAIL> 

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
- https://developers.google.com/api-client-library/javascript/start/start-js

##### Play Store
- https://support.google.com/googleplay/android-developer/answer/113469
- https://stackoverflow.com/questions/27435068/how-do-i-put-my-cordova-application-on-the-android-play-store
