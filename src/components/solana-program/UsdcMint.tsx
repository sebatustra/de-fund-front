"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UsdcMint({
    setUsdcMint,
    usdcMint
}: {
    setUsdcMint: Function,
    usdcMint: string | undefined
}) {
    const { connection } = useConnection()

    const {sendTransaction, publicKey} = useWallet();

    const [receiver, setReceiver] = useState<string>();
    const [usdcAmount, setUsdcAmount] = useState<number>()

    const initializeUsdcMint = async () => {
        if (publicKey) {
            try {
                const mintKeypair = web3.Keypair.generate();
                const transaction = new web3.Transaction();
                const lamports = await token.getMinimumBalanceForRentExemptMint(connection)

                const createAccountInstruction = web3.SystemProgram.createAccount({
                    fromPubkey: publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: token.MINT_SIZE,
                    lamports,
                    programId: token.TOKEN_PROGRAM_ID
                });
    
                const usdcMintInstruction = token.createInitializeMint2Instruction(
                    mintKeypair.publicKey,
                    0,
                    publicKey,
                    null
                );
                transaction.add(createAccountInstruction);
                transaction.add(usdcMintInstruction);

                await sendTransaction(transaction, connection, { signers: [mintKeypair] });

                setUsdcMint(mintKeypair.publicKey.toString())
    
            } catch(error: any) {
                console.error(error.message)
            }
        }
    }

    const transferUsdc = async () => {
        if (publicKey && receiver && usdcAmount && usdcMint) {
            try {
                const receiverPubkey = new web3.PublicKey(receiver);
                const mintPubkey = new web3.PublicKey(usdcMint);
                const transaction = new web3.Transaction();

                let ata = await token.getAssociatedTokenAddress(
                    mintPubkey,
                    receiverPubkey,
                    false
                );

                const createATAInstruction = token.createAssociatedTokenAccountInstruction(
                    publicKey,
                    ata,
                    receiverPubkey,
                    mintPubkey
                );

                const mintToReceiverInstruction = token.createMintToCheckedInstruction(
                    mintPubkey,
                    ata,
                    publicKey,
                    usdcAmount,
                    0
                );

                transaction.add(createATAInstruction);
                transaction.add(mintToReceiverInstruction);

                const sig = await sendTransaction(transaction, connection)
                console.log("sig: ", sig);
                
            } catch(error) {
                console.error(error)
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {usdcMint ? `mint: ${usdcMint}` : "Crea el Mint USDC"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                { usdcMint ? (
                    <div className="flex flex-col space-y-2">
                        <Input
                            placeholder="wallet"
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}
                        />

                        <Input
                            placeholder="monto"
                            type="number"
                            value={usdcAmount}
                            onChange={e => setUsdcAmount(Number(e.target.value))}
                        />

                        <Button 
                            className="w-full"
                            onClick={() => transferUsdc()}
                        >
                            Transferir USDC
                        </Button>
                    </div>
                ) : (
                    <Button 
                        className="w-full"
                        onClick={() => initializeUsdcMint()}
                    >Crea el mint</Button>
                )}
            </CardContent>
        </Card>
    )
}
