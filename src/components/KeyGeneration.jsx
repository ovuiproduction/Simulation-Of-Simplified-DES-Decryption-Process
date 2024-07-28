import React, { useEffect, useState } from "react";

// key Generation
import LCS1 from "./LCS1";
import ConversionP10 from "./ConversionP10";
import ConversionP8 from "./ConversionP8";
import LCS2 from "./LCS2";

export default function KeyGeneration({
  randomKey,
  p10,
  p8,
  initialStep,
  onResultUpdate,
}) {
  // step
  const [step, setStep] = useState(initialStep);

  //*****Key Generation variables
  const [p10ConvertedKey, setP10ConvertedKey] = useState([]);
  const [leftShiftResult1, setLeftShiftResult1] = useState([]);
  const [leftShiftResult2, setLeftShiftResult2] = useState([]);
  const [key1, setKey1] = useState([]);
  const [key2, setKey2] = useState([]);

  // functions for Key Genration
  const handleP10Conversion = (result) => {
    setP10ConvertedKey(result);
  };

  const handleP8Conversion = (result) => {
    if (key1.length == 0) {
      setKey1(result);
    } else {
      setKey2(result);
    }
  };

  const handleLeftshift1ResultUpdate = (result) => {
    setLeftShiftResult1(result);
  };

  const handleLeftshift2ResultUpdate = (result) => {
    setLeftShiftResult2(result);
  };

  useEffect(() => {
    if (key1.length == 8 && key2.length == 8) {
      onResultUpdate({ key1: key1, key2: key2, lastStep: step });
    }
  }, [key1, key2]);

  return (
    <>
      {step >= 2 && step <= 21 && (
        <>
          <ConversionP10
            randomKey={randomKey}
            p10={p10}
            onResultUpdate={handleP10Conversion}
          />
          <h2>
            Applying Left Shift
            <button onClick={() => setStep(3)}>Apply Left Shift</button>
          </h2>
        </>
      )}

      {step >= 3 && step <= 21 && (
        <>
          <LCS1
            p10ConvertedKey={p10ConvertedKey}
            onResultUpdate={handleLeftshift1ResultUpdate}
          />
          <h2>
            Applying P8
            <button onClick={() => setStep(4)}>Apply P8</button>
          </h2>
        </>
      )}

      {step >= 4 && step <= 21 && (
        <>
          <ConversionP8
            leftShiftResult={leftShiftResult1}
            p8={p8}
            onResultUpdate={handleP8Conversion}
          />
          <h2>
            Start Key 2 Generation
            <button onClick={() => setStep(5)}>Apply Left Shift 2</button>
          </h2>
        </>
      )}

      {step >= 5 && step <= 21 && (
        <>
          <LCS2
            leftShiftResult={leftShiftResult1}
            onResultUpdate={handleLeftshift2ResultUpdate}
          />
          <h2>
            Applying P8
            <button onClick={() => setStep(6)}>Apply P8</button>
          </h2>
        </>
      )}

      {step >= 6 && step <= 21 && (
        <>
          <ConversionP8
            leftShiftResult={leftShiftResult2}
            p8={p8}
            onResultUpdate={handleP8Conversion}
          />
        </>
      )}
    </>
  );
}
