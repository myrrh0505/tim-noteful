import React from 'react';
import {Redirect, Link} from 'react-router-dom';
// import {format} from 'date-fns';
import NotefulContext from '../NotefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css';

export default class Note extends React.Component {
    static contextType = NotefulContext
    static defaultProps = {
        onDeleteNote: () => {},
        history: {
            push: () => { }
        },
    }
    static contextType = NotefulContext;

    handleClickDelete = (e) => {
        e.preventDefault() 
        const noteId = this.props.id
    
        fetch(`${config.API_ENDPOINT}notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error('delete note', {error})
            })
    }
    
    render() {
        const {id, name, modified} = this.props
        if (!this.props.id) {
            return <Redirect to = '/' />
        }
        
        return (
            <div className = 'note'>
                <h2 className = 'noteTitle'>
                    <Link to = {`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className = 'deleteNote'
                    type = 'button'
                    onClick = {this.handleClickDelete}>
                    remove
                </button>
                <div className = 'noteDate'>
                    <div className = 'modifiedDate'>
                        Modified 
                        {' '}
                        <span className = 'Date'>
                            {modified}
                            {/* {format(props.modified, 'Do MMM YYYY')} */}
                        </span>
                    </div>
                </div>
                
            </div>
        )
    }
}

Note.propTypes = { 
    name: PropTypes.string,
    id: PropTypes.number,
    modified: PropTypes.string,
    onDeleteNote: PropTypes.func
};
