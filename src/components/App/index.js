import React from 'react';
import './index.css';
import Header from '../Header';
import List from '../List';
import Note from '../Note';
import { generateId } from '../../utils';

class App extends React.Component {
    state = {
        notes: [
            {
                id: '_asdsdjd',
                title: '제목을 자유롭게 입력해보세요',
                contents: '이곳에는 내용을 입력하세요'
            },
            {
                id: '_djdwjnb',
                title: '추가와 삭제',
                contents: '오늘쪽 상단의 추가와 삭제 버튼을 통해 노트를 추가하고 삭제하세요'
            },
            {
                id: '_dksjdkl',
                title: '이제 자유롭게 작성해나가세요',
                contents: '노트 사용에 감사드립니다'
            }
        ],
        activeId: '_asdsdjd'
    };

    handleListItemClick = id => {
        this.setState({ activeId: id });
    };

    handleEditNote = (type, e) => {
        // 새 notes array 생성
        const notes = [...this.state.notes];
        // notes에서 현재 activeId와 일치하는 노트 객체 찾기
        const note = notes.find(item => item.id === this.state.activeId);
        // 객체 속성에 값 할당 .note.title 또는 note.contents
        note[type] = e.target.value;
        // notes에 새 array를 할당하여 state 변경
        this.setState({
            notes
        });
        // notes data를를 localStorage에 저장
        this.handleSaveNote(notes);
    };

    handleAddNote = () => {
        const id = generateId();
        this.setState({
            notes: [
                ...this.state.notes,
                {
                    id,
                    title: '제목을 입력하세요',
                    contents: '내용을 입력하세요'
                }
            ],
            activeId: id
        });
    };

    handleDeleteNote = () => {
        // 현재 선택한 노트를 제외한 새로운 array를 생성
        const notes = this.state.notes.filter(item => item.id !== this.state.activeId);
        this.setState({
            notes: notes,
            activeId: notes.length === 0 ? null : notes[0].id
        });
    };

    handleSaveNote = data => {
        const notes = data;
        localStorage.setItem('data', JSON.stringify(notes));
    };

    render() {
        const { notes, activeId } = this.state;
        const activeNote = notes.filter(item => item.id === activeId)[0]; // 현재 활성화된 객체를 찾아서 activeNote 변수에 할당
        return (
            <div className="app">
                <Header onAddNote={this.handleAddNote} onDeleteNote={this.handleDeleteNote} />
                <div className="container">
                    <List
                        notes={notes}
                        activeId={activeId}
                        onListItemClick={this.handleListItemClick}
                    />
                    {/* activeNote가 존재할때 <Note />를 렌더링 */}
                    {/* note 속성에 activeNote 전달 */}
                    {notes.length !== 0 && (
                        <Note note={activeNote} onEditNotes={this.handleEditNote} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;