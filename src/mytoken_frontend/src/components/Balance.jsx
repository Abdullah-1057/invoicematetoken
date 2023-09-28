import React from "react";
import { useState,useEffect } from "react";
import {Principal} from "@dfinity/principal";
import { mytoken_backend } from "../../../declarations/mytoken_backend/index";

function Balance() {
  const [inputValue,setInput] = useState("");
  const [balanceValue,setBalance] = useState("");
  const [symbolValue,setSymbol] = useState("");
  const [DisabledValue,setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);
    const principal = Principal.fromText(inputValue);
    const balance = await mytoken_backend.BalanceOf(principal);
    setBalance(balance.toLocaleString());
    const symbol = await mytoken_backend.GetSymbol();
    setSymbol(symbol.toLocaleString());
    setDisabled(false);

  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>{setInput(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
          disabled={DisabledValue}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balanceValue} - {symbolValue}</p>
    </div>
  );
}

export default Balance;
