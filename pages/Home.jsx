import React from 'react';
import Board from '../sources/components/Board';
import Editor from '../sources/components/Editor';

const Home = ({ user }) => {
  return (
    <>
        <h1>Slides</h1>
        <Editor />
        <Board />
    </>
  )
}

export default Home;