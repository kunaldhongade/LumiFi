import { requestAccess, setAllowed, signTransaction } from "@stellar/freighter-api";
import { BASE_FEE, Contract, Networks, SorobanRpc, TransactionBuilder, xdr } from "@stellar/stellar-sdk";

// Replace with your Soroban RPC URL and contract ID
const rpcUrl = "https://soroban-testnet.stellar.org";
const contractId = "CDICWJS6IJGQEJ7TSWXSHPVGG5ZMCMSI3AF643DNNAKD6AT7HJMYNQQD";

// Check if Freighter is connected and allowed
export async function isConnected() {
  const result = await setAllowed();
  if (result.error) throw new Error(result.error);
  return result.isAllowed;
}

// Request access from Freighter to retrieve the public key
export async function requestFreighterAccess(): Promise<string> {
  const accessObj = await requestAccess();
  if (accessObj.error) throw new Error(accessObj.error);
  return accessObj.address;
}

// Helper function to send transactions through Soroban RPC
async function sendTransaction(txXDR: string) {
  const provider = new SorobanRpc.Server(rpcUrl);
  const tx = TransactionBuilder.fromXDR(txXDR, Networks.TESTNET);

  const response = await provider.sendTransaction(tx);

  if (response.errorResult) {
    throw new Error("Transaction failed: " + response.errorResult);
  }

  return response;
}

// Mint tokens to a specified address
export async function mintTokens(to: string, amount: number) {
  const publicKey = await requestFreighterAccess();
  const provider = new SorobanRpc.Server(rpcUrl);
  const contract = new Contract(contractId);
  const sourceAccount = await provider.getAccount(publicKey);

  const tx = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call("mint", xdr.ScVal.scvString(to), xdr.ScVal.scvI32(amount)))
    .setTimeout(30)
    .build();

  const signedTx = await signTransaction(tx.toXDR(), {
    networkPassphrase: Networks.TESTNET,
  });

  return sendTransaction(signedTx.signedTxXdr);
}

// Transfer tokens to a specified address
export async function transferTokens(to: string, amount: number) {
  const publicKey = await requestFreighterAccess();
  const provider = new SorobanRpc.Server(rpcUrl);
  const contract = new Contract(contractId);
  const sourceAccount = await provider.getAccount(publicKey);

  const tx = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call("transfer", xdr.ScVal.scvString(to), xdr.ScVal.scvI32(amount)))
    .setTimeout(30)
    .build();

  const signedTx = await signTransaction(tx.toXDR(), {
    networkPassphrase: Networks.TESTNET,
  });

  return sendTransaction(signedTx.signedTxXdr);
}
export { requestAccess };
