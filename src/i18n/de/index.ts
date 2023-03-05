// Code examples:
// :label="$t('button.upload')"
// this.$t('alertDialog.token')
// {{ $t('appTitle') }}
export default {
  appTitle: 'Notes',

  error: {
    404: 'Entschuldige, nichts gefunden...(404)',
  },

  languageLabel: {
    enUs: 'Englisch (US)',
    de: 'Deutsch',
  },

  select: {
    language: 'Wähle deine bevorzugte Anzeigesprache:',
  },

  placeholder: {
    title: 'Titel',
    description: 'Beschreibung',
    listEntry: 'Listeneintrag',
    dots: '...',
    noFileChosen: 'Keine Datei ausgewählt',
    writeNote: 'Notiz schreiben...',
  },

  input: {
    importPassphrase: 'Passphrase für Entschlüsselung',
    exportPassphrase: 'Passphrase für Verschlüsselung',
    selectSourceFile: 'Quelldatei auswählen',
    chooseSourceFile: 'Quelldatei auswählen',
  },

  button: {
    upload: 'Hochladen',
    download: 'Herunterladen',
    deleteCSP: 'Cloud Anbindung löschen',
    deleteAllSettings: 'Einstellungen zurücksetzen',
    resetApp: 'Anwendung zurücksetzen',
    export: 'Export',
    continue: 'Weiter',
    back: 'Zurück',
    backToSelect: 'Zurück zur Auswahl',
  },

  navigation: {
    title: 'Navigation',
    notes: 'Notizen',
    trash: 'Papierkorb',
    settings: 'Einstellungen',
  },

  tab: {
    general: 'Allgemein',
    import: 'Import',
    export: 'Export',
    cloud: 'Cloud',
  },

  step: {
    select: {
      title: 'Auswahl',
      description:
        'Wähle den Cloud-Speicheranbieter, der deinen Bedürfnissen am besten entspricht, um deine verschlüsselten Notizen zu speichern.',
    },
  },

  setting: {
    title: {
      general: 'Allgemeine Einstellungen',
      importNotes: 'Notizen importieren',
      exportNotes: 'Notizen exportieren',
      cloudStorageIntegration: 'Anbindung an Cloud-Speicher',
    },
  },

  menuItem: {
    delete: 'Löschen',
    permDelete: 'Permanent löschen',
    restore: 'Wiederherstellen',
    copy: 'Kopieren',
    emptyTrash: 'Papierkorb leeren',
  },

  alertDialog: {
    noteImportSuccessfulTitle: 'Notiz Import',
    noteImportSuccessfulMessage: 'Der Notiz-Import was erfolgreich.',
    cloudUploadSyncSuccessfulTitle: 'Cloud-Upload',
    cloudUploadSyncSuccessfulMessage: 'Der Cloud-Upload war erfolgreich.',
    cloudUploadSyncFailedTitle: 'Cloud-Upload Gescheitert',
    cloudUploadSyncFailedMessage:
      'Es ist nicht möglich, eine Notizdatei hochzuladen oder zu finden. Bitte versuche es erneut.',
    cloudDownloadSyncSuccessfulTitle: 'Cloud-Download',
    cloudDownloadSyncSuccessfulMessage: 'Der Cloud-Download war erfolgreich.',
    cloudDownloadSyncFailedTitle: 'Cloud-Download Gescheitert',
    cloudDownloadSyncFailedMessage:
      'Es ist nicht möglich, eine Notizdatei herunterzuladen oder zu finden. Bitte versuche es erneut.',
  },

  confirmDialog: {
    permanentDeleteTitle: 'Bestätigen',
    permanentDeleteMessage: 'Diese Notiz dauerhaft löschen?',
    permanentDeleteSelectedTitle: 'Bestätigen',
    permanentDeleteSelectedMessage:
      'Die ausgewählten Notizen dauerhaft löschen?',
    emptyTrashTitle: 'Papierkorb Leeren',
    emptyTrashMessage: 'Alle Notizen im Papierkorb werden endgültig gelöscht.',
    deleteListEntryTitle: 'Bestätigen',
    deleteListEntryMessage: 'Den ausgewählten Listeneintrag dauerhaft löschen?',
    deleteCloudStorageProviderTitle: 'Cloud Anbindung löschen',
    deleteCloudStorageProviderMessage:
      'Deine Daten werden nicht mehr in der Cloud gesichert, sondern nur noch auf deinem Gerät.',
    deleteAllSettingsTitle: 'Einstellung zurücksetzen',
    deleteAllSettingsMessage:
      'Setzt deine Einstellungen und die Anbindung an den Cloud-Speicheranbieter zurück.',
    resetApplicationTitle: 'Anwendung zurücksetzen',
    resetApplicationMessage:
      'Setzt alle Einstellungen zurück und löscht deine gespeicherten Notizen.',
  },
};
