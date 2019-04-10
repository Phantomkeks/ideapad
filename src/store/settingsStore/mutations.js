export const updateImportPassphrase = (state, oPayload) => {
  state.settings.importPassphrase = oPayload.importPassphrase
}

export const updateExportPassphrase = (state, oPayload) => {
  state.settings.exportPassphrase = oPayload.exportPassphrase
}

export const updateDropboxToken = (state, oPayload) => {
  state.settings.dropboxToken = oPayload.dropboxToken
}

export const updateGoogleDriveToken = (state, oPayload) => {
  state.settings.googleDriveToken = oPayload.googleDriveToken
}

export const updateMicrosoftOneDriveToken = (state, oPayload) => {
  state.settings.microsoftOneDrive = oPayload.microsoftOneDrive
}
