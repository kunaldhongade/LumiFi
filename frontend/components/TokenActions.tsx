import { useState } from "react";
import { createToken, mintTokens, transferTokens } from "../hooks/useFreighter";

export default function TokenActions() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState<number>(0);

  const handleCreateToken = async () => {
    try {
      await createToken(address, name, symbol, decimals, parseInt(amount));
      alert("Token Created Successfully!");
    } catch (error) {
      alert(`Error creating token: ${error}`);
    }
  };

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
        placeholder="Token Owner Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="text"
        placeholder="Token Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="text"
        placeholder="Token Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="number"
        placeholder="Decimals"
        value={decimals}
        onChange={(e) => setDecimals(parseInt(e.target.value))}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="number"
        placeholder="Initial Supply"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <button className="btn btn-primary mr-2" onClick={handleCreateToken}>
        Create Token
      </button>
      <button className="btn btn-success mr-2" onClick={handleMint}>
        Mint Tokens
      </button>
      <button className="btn btn-warning" onClick={handleTransfer}>
        Transfer Tokens
      </button>
    </div>
  );
}
