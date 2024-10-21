# 🌟 **LumiFi**: Illuminate Your Finance

<!-- ![LumiFi Banner]()   -->

## Illuminate Your Finance – Tokenize, Trade, and Thrive

**LumiFi** is a next-generation decentralized finance (DeFi) launchpad built on **Stellar's Soroban smart contract platform**, empowering individuals, businesses, and communities to create, trade, and manage their own tokens with ease. LumiFi offers an all-in-one suite that includes:

- **Token Creation**: Mint custom tokens with metadata and supply.
- **ICO Campaigns**: Launch and manage token sales.
- **Liquidity Pools**: Add liquidity and earn rewards.
- **Decentralized Exchange**: Trade tokens seamlessly.

Join LumiFi and revolutionize your financial ecosystem today!

---

<!-- ℹ️  Transaction hash is 7ac35f5a1a7d4b26e61afb4363be335ff600564f1513b842862cf66d9743d12f
🔗 https://stellar.expert/explorer/testnet/tx/7ac35f5a1a7d4b26e61afb4363be335ff600564f1513b842862cf66d9743d12f
🔗 https://stellar.expert/explorer/testnet/contract/CDICWJS6IJGQEJ7TSWXSHPVGG5ZMCMSI3AF643DNNAKD6AT7HJMYNQQD
✅ Deployed!
CDICWJS6IJGQEJ7TSWXSHPVGG5ZMCMSI3AF643DNNAKD6AT7HJMYNQQD -->

## 🎉 **Deployment Successful!**

ℹ️ **Using wasm hash**: `c32e7a32df72d9f2a9ed55320ff312d292e2ddcceb67f3cac51e2697da5a3449`

🌎 **Submitting deploy transaction…**

ℹ️ **Transaction Hash**: `1ce742c2f5501497d31cc78884d024f61c012b28a246832d38b9d213ec37d0b1`

🔗 [View transaction on Stellar Expert](https://stellar.expert/explorer/testnet/tx/1ce742c2f5501497d31cc78884d024f61c012b28a246832d38b9d213ec37d0b1)

🔗 [Contract on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CBSZTRZYLMZI4PMU34MBO5KRCBQ3P4CSLIPV3QSHUITO7TTXFYOVK3QO)

✅ **Deployed Contract ID**: `CBSZTRZYLMZI4PMU34MBO5KRCBQ3P4CSLIPV3QSHUITO7TTXFYOVK3QO`

## 📖 **Table of Contents**

- [Overview](#-overview)
- [Features](#-features)
- [Smart Contract Overview](#-smart-contract-overview)
- [Installation](#️-installation)
- [Deployment](#-deployment)
- [Usage](#-usage)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Security](#-security)
- [Contributing](#-contributing)
- [Community & Support](#-community--support)
- [License](#-license)

---

## ✨ **Overview**

**LumiFi** is an **end-to-end decentralized finance (DeFi) launchpad** built on the **Stellar Soroban smart contract platform**. It enables users to **mint tokens, run ICO campaigns, manage liquidity pools, and trade tokens via a DEX**. Whether you are a startup launching a token or a trader looking for new opportunities, LumiFi makes DeFi **fast, simple, and affordable**.

---

## 🚀 **Features**

- **🔨 Token Factory**: Create custom tokens with metadata and supply.
- **💸 ICO Launchpad**: Host token sales with dynamic pricing and supply caps.
- **🌊 Liquidity Pools & AMM**: Add liquidity to pools and earn rewards.
- **🔄 Decentralized Exchange (DEX)**: Trade tokens seamlessly via automated market maker (AMM).
- **🔗 IPFS Integration**: Store token metadata and images on IPFS.
- **⚡ Fast & Low Cost**: Built on Stellar with low fees and quick finality.

---

## 🛠️ **Smart Contract Overview**

### **1️⃣ Token Factory**

Allows users to mint tokens with a name, symbol, decimals, and supply.  
**File**: [`src/token_factory.rs`](./src/token_factory.rs)

### **2️⃣ Token Contract**

Manages token minting, burning, and transfers.  
**File**: [`src/token.rs`](./src/token.rs)

### **3️⃣ ICO Contract**

Launches token sales with configurable pricing and supply.  
**File**: [`src/ico.rs`](./src/ico.rs)

### **4️⃣ Liquidity Pool & AMM**

Provides liquidity and enables token swaps via AMM logic.  
**File**: [`src/liquidity_pool.rs`](./src/liquidity_pool.rs)

---

## ⚙️ **Installation**

### Prerequisites

- **Rust**: Install from [rustup.rs](https://rustup.rs)
- **Soroban CLI**: Install following the [Soroban documentation](https://soroban.stellar.org/docs/getting-started/cli)

### Clone the Repository

```bash
git clone https://github.com/your-repo/lumifi.git
cd lumifi
```

### Build the Project

```bash
cargo build --target wasm32-unknown-unknown --release
```

---

## 🚢 **Deployment**

### Step 1: Deploy the Smart Contracts on Futurenet

```bash
soroban deploy --wasm target/wasm32-unknown-unknown/release/<contract_name>.wasm --network futurenet
```

### Step 2: Example – Create a Token with TokenFactory

```bash
soroban invoke \
  --id <factory_contract_id> \
  --fn create_token \
  --arg '{"name": "MyToken", "symbol": "MTK", "decimals": 18, "initial_supply": 1000000, "owner": "<your_address>"}' \
  --network futurenet
```

---

## 📈 **Usage**

1. **Create Tokens**  
   Use the **TokenFactory** contract to mint new tokens with metadata.

2. **Launch an ICO**  
   Run an ICO campaign using the **ICO contract** to raise funds.

3. **Add Liquidity**  
   Provide liquidity in **AMM-based pools** and earn LP rewards.

4. **Trade Tokens**  
   Use the **Liquidity Pool contract** to swap tokens and participate in DeFi markets.

---

## 🧪 **Testing**

### Run Unit Tests

```bash
cargo test
```

### Example: Test Token Transfer

```rust
#[test]
fn test_token_transfer() {
    let env = Env::default();
    let owner = Address::random(&env);
    let recipient = Address::random(&env);

    Token::init(env.clone(), "LumiCoin".into(), "LC".into(), 18, 1000, owner.clone());
    Token::transfer(env, owner.clone(), recipient.clone(), 500);
    assert_eq!(Token::balance_of(env, recipient), 500);
}
```

---

## 🛣️ **Roadmap**

- **Phase 1**: Complete smart contract development and deploy on Futurenet.
- **Phase 2**: Build a front-end interface with React/Next.js.
- **Phase 3**: Integrate wallet solutions (Freighter, Albedo).
- **Phase 4**: Mainnet deployment and liquidity mining rewards.

---

## 🛡️ **Security**

- **Ownership Controls**: Only token owners can mint or burn tokens.
- **Reentrancy Guards**: Prevent exploits during token swaps and liquidity operations.
- **Auditing**: Planned third-party security audits before mainnet launch.
- **Slippage Management**: Prevent large slippage on trades.

---

## 🤝 **Contributing**

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add new feature"`).
4. Push your branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 💬 **Community & Support**

Stay connected with the LumiFi community:

- 🌐 [Website](https://lumifi.io)
- 🐦 [Twitter](https://twitter.com/lumifi)
- 💬 [Discord](https://discord.gg/lumifi)

Have questions? Open an issue or join our Discord for help!

---

## 📜 **License**

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## ✨ **Get Started Today!**

Create, trade, and launch your tokens with LumiFi—the future of decentralized finance is here! 🚀

---

Feel free to modify any section based on your specific needs. Let me know if anything needs to be added or changed!
