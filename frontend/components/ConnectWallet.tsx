import React, { useEffect, useState } from "react";
import { isConnected, requestAccess } from "../hooks/useFreighter";

export default function ConnectWallet() {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      const connection = await isConnected();
      if (connection.isAllowed) {
        const { address } = await requestAccess();
        setPublicKey(address);
        setConnected(true);
      }
    };
    connect();
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setConnected(true)}
      >
        {connected ? "Connected" : "Connect Freighter"}
      </button>
      <p>Public Key: {publicKey ?? "Not connected"}</p>
    </div>
  );
}
