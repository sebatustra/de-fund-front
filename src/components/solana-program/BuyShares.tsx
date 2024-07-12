import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor"
import * as token from "@solana/spl-token";
import { FundProgram } from "../../../idl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { ReloadIcon } from "@radix-ui/react-icons";

export default function BuyShares({
    program,
    usdcMint
}: {
    program:  anchor.Program<FundProgram> | undefined,
    usdcMint: string | undefined
}) {

    const [amount, setAmount] = useState(0);

    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const {sendTransaction } = useWallet();

    const [isLoading, setIsLoading] = useState(false);


    const buyShares = async () => {
        if (program && wallet && usdcMint) {
            try {
                
                const mintPubkey = new web3.PublicKey(usdcMint);
                const transaction = new web3.Transaction();

                const userATA = await token.getAssociatedTokenAddress(
                    mintPubkey,
                    wallet.publicKey
                );

                const instruction = await program.methods
                    .buyShares(new anchor.BN(amount))
                    .accounts({
                        usdcMint: mintPubkey,
                        buyerUsdcTokenAccount: userATA,
                        buyer: wallet.publicKey,
                    })
                    .instruction();

                transaction.add(instruction);

                const sig = await sendTransaction(transaction, connection);

                console.log("sig in buyShares: ", sig);
                setAmount(0)

            } catch(error) {
                console.error(error)
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Compra cuotas
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col space-y-4'>
                <Label>Monto inversión USDC</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <Button
                    onClick={() => buyShares()}
                >Invertir</Button>
            </CardContent>
        </Card>
    )
}
