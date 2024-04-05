import React, { useState } from 'react';

interface AddEventModalProps {
    onClose: () => void;
    onSave: (event: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSave = () => {
        // 이벤트 정보 저장
        onSave({ title, start, end });
        console.log(title);
        console.log(start);
        console.log(end);

        onClose(); // 모달 닫기
    };

    return (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 border border-gray-300 z-10">
            <h2>Add Event</h2>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)}/>
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)}/>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddEventModal;
