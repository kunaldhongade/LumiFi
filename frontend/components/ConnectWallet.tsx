import { useEffect, useState } from "react";
import { isConnected, requestAccess } from "../hooks/useFreighter";

export default function ConnectWallet() {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      const connection = await isConnected();
      if (connection) {
        const { address } = await requestAccess();
        setPublicKey(address);
        setConnected(true);
      }
    };
    connect();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button className="ant-btn ant-btn-primary" onClick={() => setConnected(true)}>
        {connected ? "Connected" : "Connect Freighter"}
      </button>
      <p style={{ marginTop: "10px" }}>Public Key: {publicKey ?? "Not connected"}</p>
    </div>
  );
}
