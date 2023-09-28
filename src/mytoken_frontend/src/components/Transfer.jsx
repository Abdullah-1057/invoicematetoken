import React from "react";
import { mytoken_backend } from "../../../declarations/mytoken_backend/index";
import { useState } from "react";
import {Principal} from "@dfinity/principal";

function Transfer() {
  const [message,setMessage]= useState("");
  const [receipientId,setReceipientId]= useState("");
  const [amount,setAmount]= useState("");

  async function handleClick() {
    const Text = await mytoken_backend.transfer((Principal.fromText(receipientId)),(Number(amount)));
    console.log(Text);
    setMessage(Text);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={receipientId}
                onChange={(e)=>{
                  setReceipientId(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>{
                  setAmount(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer - {message}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
