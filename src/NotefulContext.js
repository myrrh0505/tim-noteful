import React from 'react';

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addNote: () => {},
  newFolder: () => {},
  deleteFolder: () => {},
})

export default NotefulContext
