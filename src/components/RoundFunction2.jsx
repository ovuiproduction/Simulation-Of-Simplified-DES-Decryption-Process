import React, { useEffect, useState } from "react";

import ConversionP4 from "./ConversionP4";
import DivideAndEP from "./DivideAndEP";
import DetermineXOR from "./DetermineXOR";
import SboxResult from "./SboxResult";
import Combine from "./Combine";

export default function RoundFunction2({
  inputText,
  key2,
  p4,
  ep,
  s0,
  s1,
  initialStep,
  onResultUpdate,
}) {
  //step
  const [step, setStep] = useState(initialStep);

  //*****Plaintext Conversion Variable

  // Expansion Conversion Result
  const [fk2_ep_result, set_fk2_ep_result] = useState([]);

  // divide
  const [fk2_Initial_N1, set_fk2_Initial_N1] = useState([]);
  const [fk2_Initial_N2, set_fk2_Initial_N2] = useState([]);

  // p4
  const [fk2_p4_result, set_fk2_p4_result] = useState([]);

  // xor
  const [fk2_ep_xor, set_fk2_ep_xor] = useState([]);
  const [fk2_p4_xor, set_fk2_p4_xor] = useState([]);

  // combine
  const [fk2_combine, set_fk2_combine] = useState([]);

  // sbox result
  const [fk2_sbox_result, set_fk2_sbox_result] = useState([]);

  const handleP4Conversion = (result) => {
    set_fk2_p4_result(result);
  };

  const handleEpConversion = ({ leftNibble, rightNibble, epRightNibble }) => {
    set_fk2_Initial_N1(leftNibble);
    set_fk2_Initial_N2(rightNibble);
    set_fk2_ep_result(epRightNibble);
  };

  const handle_XOR_Result = (result) => {
    if (fk2_ep_xor.length == 0) {
      set_fk2_ep_xor(result);
    } else if (fk2_p4_xor.length == 0) {
      set_fk2_p4_xor(result);
    }
  };

  const handleSboxResult = (result) => {
    set_fk2_sbox_result(result);
  };

  const handleCombineResult = (result) => {
    set_fk2_combine(result);
  };

  useEffect(() => {
    if (fk2_combine.length == 8) {
      onResultUpdate({ result: fk2_combine, lastStep: step });
    }
  }, [fk2_combine]);

  return (
    <>
      {step >= 15 && step <= 21 && (
        <>
          <DivideAndEP
            inputText={inputText}
            ep={ep}
            onResultUpdate={handleEpConversion}
          />
          <h2>
            Applying EP ⊕ Key 1
            <button onClick={() => setStep(16)}>Apply XOR</button>
          </h2>
        </>
      )}

      {step >= 16 && step <= 21 && (
        <>
          <DetermineXOR
            inputText1={fk2_ep_result}
            inputText2={key2}
            onResultUpdate={handle_XOR_Result}
          />
          <h2>
            Applying Sbox Substitution
            <button onClick={() => setStep(17)}>Apply Sbox</button>
          </h2>
        </>
      )}

      {step >= 17 && step <= 21 && (
        <>
          <SboxResult
            inputText={fk2_ep_xor}
            s0={s0}
            s1={s1}
            onResultUpdate={handleSboxResult}
          />
          <h2>
            Applying P4 Conversion
            <button onClick={() => setStep(18)}>Applying P4 Conversion</button>
          </h2>
        </>
      )}

      {step >= 18 && step <= 21 && (
        <>
          <ConversionP4
            inputText={fk2_sbox_result}
            p4={p4}
            onResultUpdate={handleP4Conversion}
          />
          <h2>
            Applying P4 ⊕ Initial Nibble
            <button onClick={() => setStep(19)}>Apply XOR</button>
          </h2>
        </>
      )}

      {step >= 19 && step <= 21 && (
        <>
          <DetermineXOR
            inputText1={fk2_p4_result}
            inputText2={fk2_Initial_N1}
            onResultUpdate={handle_XOR_Result}
          />
          <h2>
            Combining P4 and Initial Nibble
            <button onClick={() => setStep(20)}>Apply Combine</button>
          </h2>
        </>
      )}

      {step >= 20 && step <= 21 && (
        <>
          <Combine
            inputText1={fk2_p4_xor}
            inputText2={fk2_Initial_N2}
            onResultUpdate={handleCombineResult}
          />
        </>
      )}
    </>
  );
}
