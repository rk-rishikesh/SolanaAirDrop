const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   
//STEP-1 Generating a new wallet keypair
const newPair = new Keypair();
console.log(newPair);

//STEP-2 Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

//STEP-3 Getting the wallet Balance
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
          );
        console.log("Wallet Address : " , `${publicKey}`);
        console.log("Wallet Balance : ", `${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
};

//STEP-4 Air dropping SOL (in terms of LAMPORTS)
const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        console.log("=== Airdropping 2 SOL ===");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey),
            2 * LAMPORTS_PER_SOL
          );
          await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

//STEP-5 Driver function
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();
