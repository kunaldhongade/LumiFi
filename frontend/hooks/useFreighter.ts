import { requestAccess, setAllowed, signTransaction } from "@stellar/freighter-api";
import { BASE_FEE, Contract, Networks, SorobanRpc, TransactionBuilder } from "@stellar/stellar-sdk";

const rpcUrl = "https://soroban-testnet.stellar.org";
const contractId = "YOUR_CONTRACT_ADDRESS";

export async function isConnected() {
  return await setAllowed();
}

export async function requestFreighterAccess(): Promise<string> {
  const accessObj = await requestAccess();
  if (accessObj.error) throw new Error(accessObj.error);
  return accessObj.address;
}

export async function mintTokens(to: any, amount: any) {
  const publicKey = await requestFreighterAccess();
  const provider = new SorobanRpc.Server(rpcUrl);
  const contract = new Contract(contractId);
  const sourceAccount = await provider.getAccount(publicKey);

  const tx = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call("mint", to, amount))
    .setTimeout(30)
    .build();

  const signedTx = await signTransaction(tx.toXDR(), {
    networkPassphrase: Networks.TESTNET,
  });
  await provider.sendTransaction(TransactionBuilder.fromXDR(signedTx.signedTxXdr, Networks.TESTNET));
}

export async function transferTokens(to: string, amount: number) {
  // Similar to mintTokens, but calls 'transfer' instead.
}
export { requestAccess };
