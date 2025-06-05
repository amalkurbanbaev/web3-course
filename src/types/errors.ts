export class WalletNotConnectedError extends Error {
  constructor() {
    super("Wallet is not connected")
    this.name = "WalletNotConnectedError"
  }
}
