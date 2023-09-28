import React from "react";
import { mytoken_backend } from "../../../declarations/mytoken_backend/index";
import { useState } from "react";
function Faucet() {
  const [DisabledValue,setDisabled] = useState(false);
  const [myText,setMyText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisabled(true);
    const result =await mytoken_backend.payOut();
    setMyText(result);
    setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={DisabledValue}>
          {myText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
