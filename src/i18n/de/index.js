// Code examples:
// :label="$t('button.upload')"
// this.$t('alertDialog.missingDropboxTokenTitle')
// {{ $t('appTitle') }}
export default {
  appTitle: 'Ideapad',

  name: {
    dropbox: 'Dropbox',
    googleDrive: 'Google Drive'
  },

  error: {
    404: 'Entschuldige, nichts gefunden...(404)'
  },

  languageLabel: {
    enUs: 'Englisch (US)',
    de: 'Deutsch'
  },

  select: {
    language: 'Wähle deine bevorzugte Sprache:'
  },

  link: {
    dropboxAuth: 'Mit Dropbox authentifizieren'
  },

  placeholder: {
    title: 'Titel',
    description: 'Beschreibung',
    listEntry: 'Listeneintrag',
    dots: '...',
    noFileChosen: 'Keine Datei ausgewählt',
    writeNote: 'Notiz schreiben...'
  },

  input: {
    importPassphrase: 'Passphrase für Entschlüsselung',
    exportPassphrase: 'Passphrase für Verschlüsselung',
    selectSourceFile: 'Quelldatei auswählen',
    chooseSourceFile: 'Datei auswählen'
  },

  button: {
    upload: 'Hochladen',
    download: 'Herunterladen',
    deleteCSP: 'Cloud-Speicheranbieter löschen',
    deleteAllSettings: 'Alle Einstellungen löschen',
    resetApp: 'Applikation zurücksetzen',
    export: 'Export',
    continue: 'Fortsetzen',
    back: 'Zurück',
    backToSelect: 'Zurück zur Auswahl'
  },

  navigation: {
    title: 'Navigation',
    notes: 'Notizen',
    trash: 'Papierkorb',
    settings: 'Einstellungen'
  },

  tab: {
    general: 'Allgemein',
    import: 'Import',
    export: 'Export',
    cloud: 'Cloud'
  },

  step: {
    select: {
      title: 'Auswahl',
      description: 'Wähle den Cloud-Speicheranbieter, der deinen Bedürfnissen am besten entspricht, um deine verschlüsselten Notizen zu speichern.'
    },
    authenticate: {
      title: 'Authentifizierung',
      description: 'Mit Dropbox authentifizieren und der App erlauben deine Notizen im Cloudspeicher zu speichern.'
    },
    synchronise: {
      title: 'Synchronisation',
      description: 'Synchronisiere deine aktuellen Notizen mit Dropbox.'
    }
  },

  setting: {
    title: {
      general: 'Allgemeine Einstellungen',
      importNotes: 'Notizen Importieren',
      exportNotes: 'Notizen Exportieren',
      cloudStorageIntegration: 'Cloudspeicher-Integration'
    }
  },

  menuItem: {
    delete: 'Löschen',
    permDelete: 'Permanent löschen',
    restore: 'Wiederherstellen',
    copy: 'Kopieren',
    emptyTrash: 'Papierkorb leeren'
  },

  alertDialog: {
    noteImportSuccessfulTitle: 'Notiz Import',
    noteImportSuccessfulMessage: 'Der Notiz-Import was erfolgreich.',
    missingDropboxTokenTitle: 'Fehlender Dropbox Token',
    missingDropboxTokenMessage: 'Du musst dich zuerst mit Dropbox authentifizieren.',
    cloudUploadSyncSuccessfulTitle: 'Cloud-Upload',
    cloudUploadSyncSuccessfulMessage: 'Der Cloud-Upload war erfolgreich.',
    cloudUploadSyncFailedTitle: 'Cloud-Upload Gescheitert',
    cloudUploadSyncFailedMessage: 'Es ist nicht möglich, eine Notizdatei hochzuladen oder zu finden. Bitte versuche es erneut.',
    cloudDownloadSyncSuccessfulTitle: 'Cloud-Download',
    cloudDownloadSyncSuccessfulMessage: 'Der Cloud-Download war erfolgreich.',
    cloudDownloadSyncFailedTitle: 'Cloud-Download Gescheitert',
    cloudDownloadSyncFailedMessage: 'Es ist nicht möglich, eine Notizdatei herunterzuladen oder zu finden. Bitte versuche es erneut.'
  },

  confirmDialog: {
    permanentDeleteTitle: 'Bestätigen',
    permanentDeleteMessage: 'Diese Notiz dauerhaft löschen?',
    permanentDeleteSelectedTitle: 'Bestätigen',
    permanentDeleteSelectedMessage: 'Die ausgewählten Notizen dauerhaft löschen?',
    emptyTrashTitle: 'Papierkorb Leeren',
    emptyTrashMessage: 'Alle Notizen im Papierkorb werden endgültig gelöscht.',
    deleteListEntryTitle: 'Bestätigen',
    deleteListEntryMessage: 'Den ausgewählten Listeneintrag dauerhaft löschen?',
    deleteCloudStorageProviderTitle: 'Bestätigen',
    deleteCloudStorageProviderMessage: 'Die Cloudspeicher-Verbindung löschen?',
    deleteAllSettingsTitle: 'Bestätigen',
    deleteAllSettingsMessage: 'Alle Einstellungen löschen?',
    resetApplicationTitle: 'Bestätigen',
    resetApplicationMessage: 'Die Anwendung zurücksetzen?'
  }
}
