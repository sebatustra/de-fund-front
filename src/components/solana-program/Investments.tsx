import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label"
import * as anchor from "@coral-xyz/anchor"
import { FundProgram } from "../../../idl";
import * as web3 from "@solana/web3.js";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { ReloadIcon } from "@radix-ui/react-icons";

type InvestmentAccount = anchor.ProgramAccount<{
    investmentAmount: anchor.BN;
    paymentAmount: any;
    maturityDate: anchor.BN;
    paymentDate: any;
    isActive: boolean;
    identifier: string;
}>

export default function Investments({
    fundPDA,
    program,
    usdcMint
}: {
    fundPDA: string | undefined,
    program: anchor.Program<FundProgram> | undefined,
    usdcMint: string |undefined
}) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const {sendTransaction } = useWallet();

    const [investmentAmount, setInvestmentAmount] = useState<number>(0)
    const [paymentAmount, setPaymentAmount] = useState<number>(0)
    const [maturity, setMaturity] = useState<number | null>(null);
    const [paymentDate, setPaymentDate] = useState<number | null>(null);
    const [identifier, setIdentifier] = useState("");

    const [investments, setInvestments] = useState<InvestmentAccount[]>([])

    const [isLoading, setIsLoading] = useState(false);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = event.target.value; // Format: "YYYY-MM-DD"
        const date = new Date(dateString);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        setMaturity(unixTimestamp);
    };

    const handlePaymentDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = event.target.value; // Format: "YYYY-MM-DD"
        const date = new Date(dateString);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        setPaymentDate(unixTimestamp);
    };

    const addInvestment = async () => {
        if (program && investmentAmount && maturity && wallet) {
            setIsLoading(true)
            try {
                const transaction = new web3.Transaction();
    
                const instruction = await program.methods
                    .addInvestment(
                        identifier,
                        new anchor.BN(investmentAmount),
                        new anchor.BN(maturity)
                    )
                    .accounts({
                        manager: wallet.publicKey
                    })
                    .instruction();
    
                transaction.add(instruction);
    
                const sig = await sendTransaction(transaction, connection);
                console.log("sig for addInvestment: ", sig);

                setInvestmentAmount(0);
                setMaturity(null);
                setIdentifier("");

                setIsLoading(false)
            } catch(error) {
                console.error(error)
                setIsLoading(false)
            }
        }
    }

    const fetchInvestments = async () => {
        if (program && wallet) {
            setIsLoading(true)
            try {
                const accounts = await program.account
                    .investmentAccount
                    .all();

                console.log("account: ", accounts)

                setInvestments(accounts)

                setIsLoading(false)
                console.log("pda: ", fundPDA)
                console.log("usdcmint", usdcMint)
            } catch(error) {
                console.error(error)
                setIsLoading(false)
            }
        } else {
            console.log("no program or wallet")
        }
    }

    const payInvestment = async(investment: InvestmentAccount) => {
        if (program && wallet) {
            setIsLoading(true)
            try {
                const transaction = new web3.Transaction();

                const instruction = await program.methods
                    .payInvestment(
                        investment.account.identifier,
                        new anchor.BN(paymentAmount),
                        new anchor.BN(paymentDate)
                    )
                    .accounts({
                        manager: wallet.publicKey
                    })
                    .instruction();

                transaction.add(instruction);

                const sig = await sendTransaction(transaction, connection);

                console.log("sig for payInvestment: ", sig);

                setPaymentAmount(0);
                setPaymentDate(null)

                setIsLoading(false)
            } catch(error) {
                console.error(error)
                setIsLoading(false)
            }
        }
    }

    function formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Inversiones
                </CardTitle>
            </CardHeader>
            {fundPDA && (
                <></>
            )}
            <CardContent className='flex flex-col space-y-6'>
                <div className='flex flex-col space-y-2'>
                    <p>Agregar inversión</p>
                    <Label>Identificador</Label>
                    <Input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <Label>Monto</Label>
                    <Input 
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    />
                    <Label>Maturity date</Label>
                    <Input
                        type="date"
                        onChange={handleDateChange}
                    />
                    <Button
                        onClick={() => addInvestment()}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Agregar"
                            )}
                    </Button>
                </div>

                <div className='flex flex-col space-y-2'>
                    <p>Lista investiones</p>
                    <ul>
                        {investments.map(investment => (
                            <li className='flex flex-row w-full items-center' key={investment.publicKey.toString()}>
                                <div className='flex flex-col w-4/5 space-y-2'>
                                    <p>Monto: {Number(investment.account.investmentAmount)}</p>
                                    <p>Maturity date: {formatTimestamp(Number(investment.account.maturityDate))}</p>
                                    <p>Estado: {investment.account.isActive ? "Activo" : "No activo"}</p>
                                </div>
                                <div className='flex flex-col w-1/5 space-y-2'>
                                    {investment.account.isActive && (
                                        <>
                                            <Label>Monto Final</Label>
                                            <Input 
                                                type="number"
                                                value={paymentAmount}
                                                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                                            />
                                            <Label>Fecha de pago</Label>
                                            <Input
                                                type="date"
                                                onChange={handlePaymentDateChange}
                                            />
                                            <Button
                                                disabled={isLoading}
                                                onClick={() => payInvestment(investment)}
                                            >
                                                {isLoading ? (
                                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Pagar"
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Button
                        onClick={() => fetchInvestments()}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            "Actualizar lista"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
