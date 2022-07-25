import React from 'react';
import Board from '../sources/components/Board';
import Editor from '../sources/components/Editor';

import "../styles/room.css";

const Room = () => {
  return (
    <>
      <div className="room">
        <Editor />
        <Board />
      </div>
    </>
  )
}

export default Room;