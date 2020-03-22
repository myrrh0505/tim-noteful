import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from './CircleButton'
import { countNotesForFolder } from './notes-helpers'

import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

export default function NoteListNav(props) {
    console.log(props)
    return(
        <div className='NotelistNav'>

            <ul className='NoteListNav__list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className="NoteListNav_folder-link"
                            to={`/folder/${folder.id}`} >
                                <span className='NoteListNav_num-notes'>
                                    {countNotesForFolder(props.notes, folder.id)}
                                </span>
                            </NavLink>
                    </li>
                    )}
            </ul>
            <div className='NoteListNav_button-wrapper'>
                <CircleButton
                    tag={Link}
                    to='/add=folder'
                    type='button'
                    className='NoteListNav__add-folder-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Folder
                    </CircleButton>
            </div>
        </div>
    )
}