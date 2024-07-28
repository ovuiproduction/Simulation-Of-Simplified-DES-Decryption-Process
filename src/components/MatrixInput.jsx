import React, { useRef } from 'react';

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

const MatrixInput = ({ matrix, setMatrix }) => {
  const inputRefs = useRef([]);

  const handleChange = (rowIndex, colIndex, event) => {
    const newMatrix = matrix.map((row, rIdx) =>
      row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? event.target.value : col))
    );
    setMatrix(newMatrix);

    if (event.target.value.length === 1) {
      const nextInputIndex = rowIndex * matrix[0].length + colIndex + 1;
      if (nextInputIndex < inputRefs.current.length) {
        inputRefs.current[nextInputIndex].focus();
      }
    }
  };

  const handleKeyDown = (rowIndex, colIndex, event) => {
    const index = rowIndex * matrix[0].length + colIndex;

    if (event.key === 'Backspace') {
      if (matrix[rowIndex][colIndex] !== '') {
        const newMatrix = matrix.map((row, rIdx) =>
          row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? '' : col))
        );
        setMatrix(newMatrix);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((col, colIndex) => (
            <input
              key={colIndex}
              type="text"
              value={col}
              onChange={(e) => handleChange(rowIndex, colIndex, e)}
              onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
              className="matrix-input"
              ref={(el) => (inputRefs.current[rowIndex * matrix[0].length + colIndex] = el)}
              maxLength={1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;
