import React from "react";
import Board from "../components/Board";
import Editor from "../components/Editor";
import "../styles/room.css";

function Room() {
  return (
    <div className="room">
      <Editor />
      <Board />
    </div>
  );
}

export default Room;
