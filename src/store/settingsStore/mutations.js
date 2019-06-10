export const updateImportPassphrase = (state, oPayload) => {
  state.settings.importPassphrase = oPayload.importPassphrase
}

export const updateExportPassphrase = (state, oPayload) => {
  state.settings.exportPassphrase = oPayload.exportPassphrase
}

export const updateCloudPassphrase = (state, oPayload) => {
  state.settings.cloudPassphrase = oPayload.cloudPassphrase
}

export const updateDropboxToken = (state, oPayload) => {
  state.settings.dropboxToken = oPayload.dropboxToken
}

export const updateGoogleDriveToken = (state, oPayload) => {
  state.settings.googleDriveToken = oPayload.googleDriveToken
}

export const updateCloudIntegrationStep = (state, oPayload) => {
  state.settings.cloudIntegrationStep = oPayload.cloudIntegrationStep
}

export const updateSelectedLanguage = (state, oPayload) => {
  state.settings.selectedLanguage = oPayload.selectedLanguage
}

export const resetCloudSettings = (state, oPayload) => {
  state.settings.dropboxToken = ''
  state.settings.googleDriveToken = ''
  state.settings.cloudIntegrationStep = 1
}

export const resetSettings = (state, oPayload) => {
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
