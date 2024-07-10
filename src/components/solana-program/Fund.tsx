"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor"
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { IDL, FundProgram } from "../../../idl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label"

interface FundAccount {
    manager: anchor.web3.PublicKey;
    fundTokenMint: anchor.web3.PublicKey;
    fundSharesVault: anchor.web3.PublicKey;
    usdcVault: anchor.web3.PublicKey | null;
    totalShares: anchor.BN;
    totalValue: anchor.BN;
}

export default function Fund({
    usdcMint
}: {
    usdcMint: string | undefined
}) {
    const [program, setProgram] = useState<anchor.Program<FundProgram>>();
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const {sendTransaction } = useWallet();

    const [initialInvestment, setInitialInvestment] = useState<number>(0);
    const [initialShares, setInitialShares] = useState<number>(0);

    const [fundAccount, setFundAccount] = useState<FundAccount>();
    const [fundUsdcBalance, setFundUsdcBalance] = useState(0);

    const [fundPDA, setFundPDA] = useState<string>();

    useEffect(() => {
        if (wallet) {
            let provider: anchor.Provider
            try {
                provider = anchor.getProvider()
            } catch {
                provider = new anchor.AnchorProvider(connection, wallet, {})
    
                anchor.setProvider(provider)
            }

            const program = new anchor.Program(IDL as FundProgram);
            setProgram(program)
        }
    }, [wallet, connection]);

    const initializeFund = async () => {
        if (program && wallet && usdcMint) {
            try {
                const [fundPda] = web3.PublicKey.findProgramAddressSync(
                    [Buffer.from("fund")],
                    program.programId
                );

                const transaction = new web3.Transaction();

                const initializeFundInstruction = await program.methods
                    .initializeFund(
                        new anchor.BN(initialInvestment),
                        new anchor.BN(initialShares)
                    )
                    .accounts({
                        manager: wallet.publicKey
                    })
                    .instruction();

                const initializeFundUdscVault = await program.methods
                    .initializeUsdcVault()
                    .accounts({
                        usdcMint: usdcMint,
                        manager: wallet.publicKey
                    })
                    .instruction();

                transaction.add(initializeFundInstruction);
                transaction.add(initializeFundUdscVault)

                const sig = await sendTransaction(transaction, connection);

                console.log("sig for initializeFund: ", sig);

                setFundPDA(fundPda.toString())

                const fundAccount = await program.account
                    .fundAccount
                    .fetch(fundPda);

                setFundAccount(fundAccount);

                const [usdcVauldPDA] = web3.PublicKey.findProgramAddressSync(
                    [Buffer.from("fund_usdc_vault")],
                    program.programId
                );
            

                const fundUsdcVault = await token.getAccount(
                    connection,
                    usdcVauldPDA
                );

                setFundUsdcBalance(Number(fundUsdcVault.amount))
 
            } catch(error) {
                console.error(error)
            }
        }
    }

    const updateFundData = async () => {
        if (program && fundPDA) {
            try {
                const fundPdaPubkey = new web3.PublicKey(fundPDA)
                const fundAccount = await program.account
                    .fundAccount
                    .fetch(fundPdaPubkey);

                setFundAccount(fundAccount);

                const [usdcVauldPDA] = web3.PublicKey.findProgramAddressSync(
                    [Buffer.from("fund_usdc_vault")],
                    program.programId
                );
            

                const fundUsdcVault = await token.getAccount(
                    connection,
                    usdcVauldPDA
                );

                setFundUsdcBalance(Number(fundUsdcVault.amount))
            } catch(error) {
                console.error(error)
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Fund
                </CardTitle>
            </CardHeader>
            <CardContent>
                {fundPDA ? (
                    <div className="flex flex-col space-y-2">
                        <Label>Inversión total</Label>
                        <Input
                            value={Number(fundAccount?.totalValue)}
                            disabled
                        />

                        <Label>Cantidad de cuotas actual</Label>
                        <Input
                            value={Number(fundAccount?.totalShares)}
                            disabled
                        />

                        <Label>Saldo cuenta USDC</Label>
                        <Input
                            value={fundUsdcBalance}
                            disabled
                        />

                        <Button
                            onClick={() => updateFundData()}
                        >
                            Actualizar datos
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <Label>inversión inicial</Label>
                        <Input
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        />

                        <Label>Cantidad de cuotas inicial</Label>
                        <Input
                            type="number"
                            value={initialShares}
                            onChange={(e) => setInitialShares(Number(e.target.value))}
                        />

                        <Button
                            onClick={() => initializeFund()}
                        >
                            Inicializar
                        </Button>
                    </div>

                )}
            </CardContent>
        </Card>
    )
}
