// Code examples:
// :label="$t('button.upload')"
// this.$t('alertDialog.missingDropboxTokenTitle')
// {{ $t('appTitle') }}
export default {
  appTitle: 'Mini-Memo',

  name: {
    dropbox: 'Dropbox',
    oneDrive: 'OneDrive',
    googleDrive: 'Google Drive'
  },

  error: {
    404: 'Sorry, nothing here...(404)'
  },

  languageLabel: {
    enUs: 'English (US)',
    de: 'German'
  },

  select: {
    language: 'Select your preferred language:'
  },

  link: {
    dropboxAuth: 'Authenticate with Dropbox'
  },

  placeholder: {
    title: 'Title',
    description: 'Description'
  },

  input: {
    importPassphrase: 'Passphrase for Decryption',
    exportPassphrase: 'Passphrase for Encryption',
    selectSourceFile: 'Select Source File'
  },

  button: {
    upload: 'Upload',
    download: 'Download',
    deleteCSP: 'Delete Cloud Storage Provider',
    deleteAllSettings: 'Delete All Settings',
    resetApp: 'Reset Application',
    export: 'Export',
    continue: 'Continue',
    back: 'Back',
    backToSelect: 'Back To Select'
  },

  navigation: {
    title: 'Navigation',
    notes: 'Notes',
    trash: 'Trash',
    settings: 'Settings'
  },

  tab: {
    general: 'General',
    import: 'Import',
    export: 'Export',
    cloud: 'Cloud'
  },

  step: {
    select: {
      title: 'Selection',
      description: 'Select the cloud storage provider which fits your needs the best to save your encrypted notes.'
    },
    authenticate: {
      title: 'Authentication',
      description: 'Authenticate with Dropbox and allow the application to store your notes in the cloud storage.'
    },
    synchronise: {
      title: 'Synchronisation',
      description: 'Synchronise your current notes with Dropbox.'
    }
  },

  setting: {
    title: {
      general: 'General Settings',
      importNotes: 'Import Notes',
      exportNotes: 'Export Notes',
      cloudStorageIntegration: 'Cloud Storage Integration'
    }
  },

  menuItem: {
    delete: 'Delete',
    permDelete: 'Permanently Delete',
    selectDelete: 'Delete Selected',
    permSelectDelete: 'Permanently Delete Selected',
    restore: 'Restore',
    copy: 'Copy',
    selectCopy: 'Copy Selected',
    selectRestore: 'Restore Selected',
    emptyTrash: 'Empty Trash'
  },

  alertDialog: {
    noteImportSuccessfulTitle: 'Note Import',
    noteImportSuccessfulMessage: 'The note import was successful.',
    missingDropboxTokenTitle: 'Missing Dropbox Token',
    missingDropboxTokenMessage: 'You need to authenticate with Dropbox first.',
    cloudUploadSyncSuccessfulTitle: 'Cloud Upload',
    cloudUploadSyncSuccessfulMessage: 'The cloud upload was successfully.',
    cloudUploadSyncFailedTitle: 'Cloud Upload Failed',
    cloudUploadSyncFailedMessage: 'Unable to upload or find a note file. Please try it again.',
    cloudDownloadSyncSuccessfulTitle: 'Cloud Download',
    cloudDownloadSyncSuccessfulMessage: 'The cloud download was successfully.',
    cloudDownloadSyncFailedTitle: 'Cloud Download Failed',
    cloudDownloadSyncFailedMessage: 'Unable to download or find a note file. Please try it again.'
  }
}
