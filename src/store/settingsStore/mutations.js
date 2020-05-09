export const updateImportPassphrase = (state, payload) => {
  state.settings.importPassphrase = payload.importPassphrase
}

export const updateExportPassphrase = (state, payload) => {
  state.settings.exportPassphrase = payload.exportPassphrase
}

export const updateCloudPassphrase = (state, payload) => {
  state.settings.cloudPassphrase = payload.cloudPassphrase
}

export const updateDropboxToken = (state, payload) => {
  state.settings.dropboxToken = payload.dropboxToken
}

export const updateGoogleDriveToken = (state, payload) => {
  state.settings.googleDriveToken = payload.googleDriveToken
}

export const updateCloudIntegrationStep = (state, payload) => {
  state.settings.cloudIntegrationStep = payload.cloudIntegrationStep
}

export const updateSelectedLanguage = (state, payload) => {
  state.settings.selectedLanguage = payload.selectedLanguage
}

export const resetCloudSettings = (state, payload) => {
  state.settings.dropboxToken = ''
  state.settings.googleDriveToken = ''
  state.settings.cloudIntegrationStep = 1
}

export const resetSettings = (state, payload) => {
  let oSettings = {
    importPassphrase: 'ImportPassphrase',
    exportPassphrase: 'ExportPassphrase',
    cloudPassphrase: 'CloudPassphrase',
    dropboxToken: '',
    dropboxAppId: 'dhok9s70o02egga',
    googleDriveToken: '',
    cloudIntegrationStep: 1,
    selectedLanguage: 'en-us'
  }
  state.settings = oSettings
}
