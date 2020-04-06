import React from 'react';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import moment from 'moment';
import Dropdown from '../Dropdown';
import NotefulError from '../NotefulError';
import './AddNote.css';

export default class AddNote extends React.Component {
    static contextType = NotefulContext; 
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
            modified: '',
            folder_id: {
                value: '1',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
        };
    }

    linkTo() {
        console.log('redirected via linkTo');
        this.props.router.push('/');
    }

    updateName(name, modified) {
        this.updateModified(modified);
        this.setState({name: {value: name, touched: true}});
    }

    updateModified(modified) {
        this.setState({modified: modified});
    }

    updateContent(content, modified) {
        this.updateModified(modified);
        this.setState({content: {value: content, touched: true}});
    }

    updateFolderId = (folder) => {
        this.setState({folder_id: {value: folder, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            modified: this.state.modified,
            content: this.state.content.value,
            folder_id: this.state.folder_id.value
        }
        const url = config.API_ENDPOINT + 'notes';
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => { 
            this.setState({
                name: {value: data.name},   
                modified: data.modified,     
                folder_id: {value: data.folder_id},
                content: {value: data.content},
            })
            this.context.addNote(data)
            this.props.history.push('/')
        })
    }

    timeStamp() {
        moment().ToDate()
    }

    validateFolderId() {
        const folderOption = this.state.folder_id.value;
        if (folderOption === null) {
            return 'Picking a folder is required'
        }
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Contents of the note are empty, this is required for note creation';
        }
    }
    
    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folder_idError = this.validateFolderId();
        const modified = moment().toDate();
         return (
            <form className = "newNote"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <NotefulError>
                    <h2>Create a new note!</h2>
                    <div className="registration__hint">* required field</div>
                    <label htmlFor="name">Note Name *</label> 
                    <input 
                        type = "text" 
                        className = "noteCreation" 
                        id = "makeName"
                        onChange = {e => this.updateName(e.target.value, modified)}/>
                    {this.state.name.touched && (
                        <ValidationError message = {nameError}/>
                    )}
                    <label className = "select" htmlFor = "folderSelect">Pick a folder *</label>
                    <Dropdown 
                        updateFolderId = {this.updateFolderId}/>
                    {this.state.folder_id.touched && (   
                        <ValidationError folder_idError = {folder_idError}/>
                    )} 
                    <label className = "contentText" htmlFor = "Content">Note Content *</label> 
                    <input 
                        type = "text" 
                        className = "noteContentCreation"
                        name = "Content" 
                        id = "makeContent" 
                        onChange = {e => this.updateContent(e.target.value, modified)}/>
                    {this.state.name.touched && (
                        <ValidationError message = {contentError}/>
                    )}
                    <button
                        type = "submit"
                        className = "noteCreation_button"
                        disabled = {
                            this.validateName() ||
                            this.validateContent() ||
                            this.validateFolderId()
                        }
                        onSubmit = {e => this.linkTo()}>
                        Create Note
                    </button>
                </NotefulError>
            </form>
        )
    }
}