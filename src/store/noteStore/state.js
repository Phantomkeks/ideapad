import NoteTypes from '../../constants/NoteTypes'

export default {
  notes: [
    {
      id: '5d7c0602-79b4-11e9-8f9e-2a86e4085a59',
      title: 'Note 1',
      highlighted: false,
      type: NoteTypes.Default,
      details: [
        {
          text: 'Go Grocery Shopping',
          ticked: false
        },
        {
          text: 'Play Hollow Knight',
          ticked: false
        },
        {
          text: 'Learn Vue.js',
          ticked: false
        }
      ]
    },
    {
      id: '5d7c0896-79b4-11e9-8f9e-2a86e4085a59',
      title: 'Note 2',
      highlighted: false,
      type: NoteTypes.Default,
      details: [
        {
          text: 'Enjoy the Sun',
          ticked: false
        },
        {
          text: 'Pay the Bills',
          ticked: false
        },
        {
          text: 'Plan your Vacation Time',
          ticked: false
        }
      ]
    },
    {
      id: '5d7c09ea-79b4-11e9-8f9e-2a86e4085a59',
      title: 'Note 3',
      highlighted: false,
      type: NoteTypes.Default,
      details: [
        {
          text: 'Use Vuex for Storage',
          ticked: false
        },
        {
          text: 'Play Switch on TV',
          ticked: false
        },
        {
          text: 'Write better Vue.js Code',
          ticked: false
        }
      ]
    },
    {
      id: '5d7c0b20-79b4-11e9-8f9e-2a86e4085a59',
      title: 'Note 4',
      highlighted: false,
      type: NoteTypes.Checkbox,
      details: [
        {
          text: 'Drink Coffee while Coding',
          ticked: true
        },
        {
          text: 'Eat Pizza Test Functionality before Pushing ' +
            'Eat Pizza Test Functionality before Pushing ' +
            'Eat Pizza Test Functionality before Pushing ' +
            'Eat Pizza Pizza Test Functionality before Pushing',
          ticked: false
        },
        {
          text: 'Test Functionality before Pushing',
          ticked: true
        }
      ]
    }
  ],
  deletedNotes: []
}
