import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default function Header(){
    return (
        <header>
            <h1>
                <Link to = {'/'}>NoteApp</Link>
            </h1>
        </header>
    )
}