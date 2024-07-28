import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function ConversionP8({ leftShiftResult, p8, onResultUpdate }) {
  const [p8ConvertedKey, setP8ConvertedKey] = useState([]);
  const [detailedText, setDetailedText] = useState([]);

  useEffect(() => {
    p8.forEach((index, i) => {
      setTimeout(() => {
        setP8ConvertedKey((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = leftShiftResult[index - 1];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `newKey[${i}] = key[P8[${i}]-1] = key[${index - 1}] = ${
              leftShiftResult[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000);
    });
  }, []);

  useEffect(() => {
    if (p8ConvertedKey.length == 8) {
      if (onResultUpdate) {
        onResultUpdate(p8ConvertedKey);
      }
    }
  }, [p8ConvertedKey]);

  return (
    <>
      <div className="result-number-block">

        <div className="bit-number-display">
          <h3>P8 : </h3>
            <div className="bit-block">
              {p8.map((element, j) => (
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
        <h3>New Key :{" "} </h3>
          <div className="bit-block">
            {p8ConvertedKey.map((char, i) => (
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
