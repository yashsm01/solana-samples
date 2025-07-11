# Solana SOL Transfer Project

A complete Solana blockchain project featuring a smart contract for SOL transfers and a modern React-based decentralized application (dApp) frontend.

## 🚀 Project Overview

This project consists of two main components:

1. **Smart Contract**: A Solana program written in Rust using the Anchor framework
2. **Frontend dApp**: A React TypeScript application with wallet integration

## 📁 Project Structure

```
solana-samples/
├── programs/
│   └── mint-token/
│       └── src/
│           └── lib.rs              # Smart contract code
├── frontend/                       # React dApp
│   ├── src/
│   │   ├── components/
│   │   │   └── SolTransfer.tsx    # Transfer component
│   │   ├── contexts/
│   │   │   └── WalletContextProvider.tsx
│   │   ├── App.tsx                # Main app
│   │   └── index.tsx              # Entry point
│   ├── public/
│   └── package.json
├── tests/
│   └── mint-token.ts              # Smart contract tests
├── Anchor.toml                    # Anchor configuration
├── Cargo.toml                     # Rust dependencies
└── package.json                   # Root package.json
```

## 🔧 Prerequisites

- **Rust**: Install from [rustup.rs](https://rustup.rs/)
- **Solana CLI**: Install from [docs.solana.com](https://docs.solana.com/cli/install-solana-cli-tools)
- **Anchor Framework**: Install from [anchor-lang.com](https://anchor-lang.com/docs/installation)
- **Node.js**: Version 16+ required
- **Yarn**: Package manager

## 🛠️ Installation & Setup

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd solana-samples
yarn install
```

### 2. Configure Solana CLI

```bash
# Set to devnet for testing
solana config set --url devnet

# Create a new keypair (or use existing)
solana-keygen new

# Get some SOL for testing
solana airdrop 2
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 🔥 Smart Contract

### Features

- **SOL Transfer**: Transfer SOL between accounts using CPI
- **Anchor Framework**: Modern Solana development
- **Cross-Program Invocation**: Secure program interactions

### Program ID

```
4bBvnqzTnXMuD2nLNT2WMRCgtZcB39KGofmSwGGDCCk1
```

### Deploy Smart Contract

```bash
# Build the program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Run tests
anchor test
```

### Program Structure

```rust
// Main transfer function
pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
    // CPI to system program for transfer
    transfer(cpi_context, amount)?;
    Ok(())
}
```

## 🌐 Frontend dApp

### Features

- 🔗 **Multi-Wallet Support**: Phantom, Solflare, Torus
- ⚡ **Real-time Updates**: Live transaction status
- 🎨 **Modern UI**: TailwindCSS styling
- 📱 **Responsive Design**: Mobile-friendly
- 🔒 **Secure**: Wallet-based authentication

### Run Development Server

```bash
# From root directory
npm run frontend

# Or from frontend directory
cd frontend && npm start
```

### Build for Production

```bash
npm run build-frontend
```

## 🚀 Usage

### Using the Smart Contract

```typescript
import { Program, AnchorProvider } from "@coral-xyz/anchor";

// Initialize program
const program = new Program(idl, programId, provider);

// Transfer SOL
await program.methods
  .solTransfer(new BN(amount))
  .accounts({
    sender: senderPublicKey,
    recipient: recipientPublicKey,
    systemProgram: SystemProgram.programId,
  })
  .signers([senderKeypair])
  .rpc();
```

### Using the dApp

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Enter Details**: Input recipient address and amount
3. **Send Transaction**: Click "Send SOL" and confirm in your wallet
4. **View Result**: Check transaction on Solana Explorer

## 🧪 Testing

### Run Smart Contract Tests

```bash
anchor test
```

### Test Coverage

- ✅ SOL transfer functionality
- ✅ Account validation
- ✅ CPI integration
- ✅ Error handling

## 📊 Available Scripts

### Root Level

```bash
npm run frontend        # Start frontend development server
npm run build-frontend  # Build frontend for production
npm run lint           # Run linting
npm run lint:fix       # Fix linting issues
```

### Frontend

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
```

### Smart Contract

```bash
anchor build           # Build program
anchor deploy          # Deploy program
anchor test            # Run tests
```

## 🔧 Configuration

### Network Configuration

**Anchor.toml**
```toml
[provider]
cluster = "devnet"  # Change to "mainnet" for production
wallet = "~/.config/solana/id.json"
```

**Frontend Network**
```typescript
// In WalletContextProvider.tsx
const network = WalletAdapterNetwork.Devnet; // Change for different networks
```

## 🌟 Key Features

### Smart Contract Features

- **Secure Transfers**: Uses Solana's system program for transfers
- **CPI Integration**: Cross-program invocation for secure operations
- **Error Handling**: Comprehensive error management
- **Anchor Framework**: Modern Solana development tools

### Frontend Features

- **Wallet Integration**: Support for multiple Solana wallets
- **Real-time Updates**: Live transaction status and confirmations
- **Modern UI**: Clean, responsive design with TailwindCSS
- **Transaction Explorer**: Direct links to view transactions
- **Error Handling**: User-friendly error messages

## 🔐 Security

### Smart Contract Security

- ✅ Proper account validation
- ✅ Secure CPI implementation
- ✅ Error handling for edge cases
- ✅ Signer verification

### Frontend Security

- ✅ Wallet-based authentication
- ✅ Transaction confirmation in wallet
- ✅ Address validation
- ✅ Amount validation

## 🚀 Deployment

### Smart Contract Deployment

```bash
# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet (ensure proper configuration)
anchor deploy --provider.cluster mainnet
```

### Frontend Deployment

```bash
# Build for production
npm run build-frontend

# Deploy to Netlify/Vercel
# Upload the 'frontend/build' folder
```

## 📱 Supported Wallets

- **Phantom**: Most popular Solana wallet
- **Solflare**: Feature-rich wallet with staking
- **Torus**: Social login-based wallet
- **Extensible**: Easy to add more wallets

## 🛠️ Development

### Adding New Features

1. **Smart Contract**: Modify `programs/mint-token/src/lib.rs`
2. **Frontend**: Add components in `frontend/src/components/`
3. **Tests**: Update `tests/mint-token.ts`

### Common Development Tasks

```bash
# Start local validator
solana-test-validator

# Deploy to local
anchor deploy --provider.cluster localnet

# Watch frontend changes
npm run frontend
```

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection**: Ensure wallet is unlocked and set to correct network
2. **Transaction Fails**: Check SOL balance and network connection
3. **Build Errors**: Ensure all dependencies are installed
4. **Deploy Fails**: Check Solana CLI configuration and keypair

### Getting Help

- Check browser console for errors
- Verify network configuration
- Ensure sufficient SOL for transactions
- Check Anchor and Solana CLI versions

## 📖 Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ on Solana blockchain
