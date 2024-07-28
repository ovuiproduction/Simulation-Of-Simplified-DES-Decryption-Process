import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function LCS1({ p10ConvertedKey, onResultUpdate }) {
  const [newLeftNibble, setNewLeftNibble] = useState([]);
  const [newRightNibble, setNewRightNibble] = useState([]);
  const [detailedTextLeftNibble, setDetailedTextLeftNibble] = useState([]);
  const [detailedTextRightNibble, setDetailedTextRightNibble] = useState([]);
  const [result, setResult] = useState([]);

  const leftNibble = p10ConvertedKey.slice(0, p10ConvertedKey.length / 2);
  const rightNibble = p10ConvertedKey.slice(p10ConvertedKey.length / 2);

  useEffect(() => {
    const left1 = leftNibble[0];
    const right1 = rightNibble[0];

    const updateLeftNibble = () => {
      leftNibble.forEach((_, i) => {
        setTimeout(() => {
          setNewLeftNibble((prev) => {
            const newLeftNibble = [...prev];
            newLeftNibble[i] =
              i < leftNibble.length - 1 ? leftNibble[i + 1] : left1;
            return newLeftNibble;
          });
          setDetailedTextLeftNibble((prev) => {
            const newText = [
              ...prev,
              `newLeftNibble[${i}] = ${
                i < leftNibble.length - 1
                  ? `leftNibble[${i + 1}] = ${leftNibble[i + 1]}`
                  : `leftNibble[0] = ${left1}`
              }`,
            ];
            return newText;
          });
        }, i * 1500);
      });
    };

    const updateRightNibble = () => {
      rightNibble.forEach((_, i) => {
        setTimeout(() => {
          setNewRightNibble((prev) => {
            const newRightNibble = [...prev];
            newRightNibble[i] =
              i < rightNibble.length - 1 ? rightNibble[i + 1] : right1;
            return newRightNibble;
          });
          setDetailedTextRightNibble((prev) => {
            const newText = [
              ...prev,
              `newRightNibble[${i}] = ${
                i < rightNibble.length - 1
                  ? `rightNibble[${i + 1}] = ${rightNibble[i + 1]}`
                  : `rightNibble[0] = ${right1}`
              }`,
            ];
            return newText;
          });
        }, i * 1500);
      });
    };

    updateLeftNibble();
    updateRightNibble();
  }, [p10ConvertedKey]);

  useEffect(() => {
    if (
      newLeftNibble.length === leftNibble.length &&
      newRightNibble.length === rightNibble.length
    ) {
      const combinedResult = [...newLeftNibble, ...newRightNibble];
      setResult(combinedResult);
      if (onResultUpdate) {
        onResultUpdate(combinedResult);
      }
    }
  }, [newLeftNibble, newRightNibble]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>P10 Converted Key : </h3>
          <div className="bit-block">
            {p10ConvertedKey.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="lsc1-main-block">
          <div className="lsc1-sub-block">
            <div className="bit-number-display">
              <h3>Left Nibble: </h3>
              <div className="bit-block">
                {leftNibble.map((element, j) => (
                  <span key={`left-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>

            <div className="array-generation-block">
              {detailedTextLeftNibble.map((element, i) => (
                <p className="generation-line" key={i}>
                  {element}
                </p>
              ))}
            </div>

            <div className="bit-number-display-lcs1">
              <h3>Updated Left Nibble: </h3>
              <div className="bit-block">
                {newLeftNibble.map((element, j) => (
                  <span key={`left-updated-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lsc1-sub-block">
            <div className="bit-number-display">
              <h3>Right Nibble: </h3>
              <div className="bit-block">
                {rightNibble.map((element, j) => (
                  <span key={`right-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>

            <div className="array-generation-block">
              {detailedTextRightNibble.map((element, i) => (
                <p className="generation-line" key={i}>
                  {element}
                </p>
              ))}
            </div>

            <div className="bit-number-display-lcs1">
              <h3>Updated Right Nibble: </h3>
              <div className="bit-block">
                {newRightNibble.map((element, j) => (
                  <span key={`right-updated-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bit-number-display">
          <h3>Left Shift Result: </h3>
          <div className="bit-block">
            {result.map((element, j) => (
              <span key={`result-${j}`} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
