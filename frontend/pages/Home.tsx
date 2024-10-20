import ConnectWallet from "../components/ConnectWallet";
import TokenActions from "../components/TokenActions";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Lumifi Dashboard</h1>
      <ConnectWallet />
      <TokenActions />
    </div>
  );
}
