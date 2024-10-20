import { useState } from "react";
import { mintTokens, transferTokens } from "../hooks/useFreighter";

export default function TokenActions() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleMint = async () => {
    await mintTokens(address, parseInt(amount));
  };

  const handleTransfer = async () => {
    await transferTokens(address, parseInt(amount));
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <button className="btn btn-success mr-2" onClick={handleMint}>
        Mint Tokens
      </button>
      <button className="btn btn-warning" onClick={handleTransfer}>
        Transfer Tokens
      </button>
    </div>
  );
}
