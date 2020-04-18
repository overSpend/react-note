import React from 'react';
import './index.css';

class Note extends React.Component {
   
    render() {
        const { note, onEditNotes } = this.props;
        const { title, contents } = note;
        return (
            <div className="note">
                <input
                    className="title"
                    value={title}
                    onChange={e => onEditNotes('title', e)}
                    onKeyDown={this.handleEnterShift}
                />
                <textarea
                    className="note-contents"
                    value={contents}
                    onChange={e => onEditNotes('contents', e)}
                />
            </div>
        );
    }
}

export default Note;