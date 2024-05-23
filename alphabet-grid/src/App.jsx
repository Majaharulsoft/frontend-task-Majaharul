import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [outputString, setOutputString] = useState('');
  const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(65 + i));

  const handleTileClick = (letter) => {
    let newString = outputString + letter;

    // Regex to find sequences of three or more identical letters
    newString = newString.replace(/(.)\1{2,}/g, (match) => '_'.repeat(match.length));

    setOutputString(newString);
  };

  return (
    <div className="center">
      <div className="container">
        {alphabet.map((letter) => (
          <div className="tile" key={letter} onClick={() => handleTileClick(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div id="outputString" className="output-string">
        {outputString}
      </div>
    </div>
  );
};

export default App;
