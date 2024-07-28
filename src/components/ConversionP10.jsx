import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function ConversionP10({ randomKey, p10, onResultUpdate }) {
  const [newKey, setNewKey] = useState([]);
  const [detailedText, setDetailedText] = useState([]);
  
  useEffect(() => {
    p10.forEach((index, i) => {
      setTimeout(() => {
        setNewKey((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = randomKey[index - 1];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `newKey[${i}] = key[P10[${i}]-1] = key[${index - 1}] = ${
              randomKey[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (newKey.length == 10) {
      if (onResultUpdate) {
        onResultUpdate(newKey);
      }
    }
  }, [newKey]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>P10 : </h3>
          <div className="bit-block">
            {p10.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>
        <div className="array-generation-block">
        {detailedText.map((text, i) => (
          <p className="generation-line" key={i}>
            {text}
          </p>
        ))}
        </div>
        <div className="bit-number-display">
        <h3>Updated Text : </h3>
        <div className="bit-block">
          {newKey.map((char, i) => (
            <span key={i} className="bit-element">
              {char}
            </span>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
