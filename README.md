# To Do

## Issues

- Cleanup the files and repo
- Update all files to new versions
- Bring notes back to life and ensure that everything is running again
- Enable Cordova run
- Cleanup README.md
- Disable Drag & Drop for now // Make it optional or hide it via settings tab
- Make use of Quasar 1.2.X and Vue 3.X
- Rewrite code with TypeScript

## Features

- Build MVP for notes and checkbox list (similar to Keep and Standard Notes)
- Make use of local storage and Firebase as a sync mechanism
- Dark theme support // Blue and white theme // Orange theme
- Enable the app to be used via PWA

---

# Notes

![Alt text](/src/statics/logo_three_post_its/three_post_its_128x128.png?raw=true 'Notes Logo')

Notes is a small idea and note app with Vue.js and Quasar framework.

### Features

- Only client app without need of a backend
- Cloud Storage Provider possible, but not needed

### To Do

##### Nice To Have

- Hybrid application for iOS and Android
- Add images to notes

##### Important Till Play Store Release

- Better failure behavior for loading files / importing notes
- Automatically Synchronise notes when Cloud Storage Provider is maintained (interval / program start sync)
- Add Google Drive as Cloud Storage Provider
- Use sync component of Quasar and cloud sync when on notes screen (also sync on start of app) (Pull-To-Refresh)
- Add file input to cloud storage setting -> so, the user can say where to put or where get the note file from the cloud storage
- Check import of duplicate ids
- Export does not work on mobile
- QA over i18n texts (en) / align with German texts
- Delete Cloud Storage Provider Button -> Put it into Cloud Tab
- Clean Read Me
- Adapt UI / clean CSS and bundle it // Remove black font color and set it to grey
- Remove not needed functions and clean everything to a simple setup
- Revert functionality
- Built own draggable? HTML5 Draggable?
- Clean Quasar components
- Undo Redo function issue with check and uncheck in note detail

### Local Setup

- Install [Quasar Framework](https://v1.quasar-framework.org/quasar-cli/installation)
- Install [Vue.js](https://vuejs.org/)
- Install [Vue CLI](https://cli.vuejs.org)
- Open a terminal and run 'quasar dev'

### Build APK

- Run "bash build_cordova_apk.sh" in ./bin folder
- Or push to the master branch

### Git Commands

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
- https://quasar.dev/style/spacing

##### Vue.js

- https://vuetifyjs.com/en/
- https://laracasts.com/series/learn-vue-2-step-by-step/episodes/3
- https://vuejs.org/v2/guide/components.html
- https://github.com/vuejs/awesome-vue

##### Icon Libraries / Colors

- https://material.io/tools/icons/?style=baseline
- https://ionicframework.com/docs/v3/ionicons/
- https://materialdesignicons.com/
- https://fontawesome.com/
- https://coolors.co/f1dede-bbacc1-80727b-909580-545643

##### Play Store

- https://support.google.com/googleplay/android-developer/answer/113469
- https://stackoverflow.com/questions/27435068/how-do-i-put-my-cordova-application-on-the-android-play-store

##### GitHub

- https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions
