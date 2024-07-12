"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import UsdcMint from "@/components/solana-program/UsdcMint";
import Fund from "@/components/solana-program/Fund";
import { useEffect, useState } from "react";
import Investments from "@/components/solana-program/Investments";
import * as anchor from "@coral-xyz/anchor"
import {IDL, FundProgram} from "../../idl";
import BuyShares from "@/components/solana-program/BuyShares";
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function Home() {
    const {publicKey} = useWallet();
    const { connection } = useConnection();
    const [program, setProgram] = useState<anchor.Program<FundProgram>>();
    const anchorWallet = useAnchorWallet();

    const [usdcMint, setUsdcMint] = useState<string>();
    const [fundPDA, setFundPDA] = useState<string>();

    useEffect(() => {
        if (anchorWallet) {
            let provider: anchor.Provider
            try {
                provider = anchor.getProvider()
            } catch {
                provider = new anchor.AnchorProvider(connection, anchorWallet, {})
    
                anchor.setProvider(provider)
            }

            const program = new anchor.Program(IDL as FundProgram);
            setProgram(program)
            console.log("program is configured")
        }
    }, [anchorWallet, connection]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-row justify-end w-full p-2">
                <WalletMultiButtonDynamic />
            </div>
            <div className="p-2 space-y-10 w-[600px]">
                {publicKey ? (
                    <>
                        <UsdcMint
                            setUsdcMint={setUsdcMint}
                            usdcMint={usdcMint}
                        />

                        <Fund 
                            usdcMint={usdcMint}
                            fundPDA={fundPDA}
                            setFundPDA={setFundPDA}
                            program={program}
                        />

                        <Investments 
                            fundPDA={fundPDA}
                            program={program}
                            usdcMint={usdcMint}
                        />

                        <BuyShares
                            program={program}
                            usdcMint={usdcMint}
                        />

                        <div>
                            footer
                        </div>

                    </>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Conecta tu wallet!
                            </CardTitle>
                        </CardHeader>
                    </Card>
                )}

            </div>


            <div>

            </div>
        </main>
    );
}

    // useEffect(() => {
    //     if (wallet) {
    //         let provider: anchor.Provider;
    
    //         try {
    //             provider = anchor.getProvider()
    //         } catch {
    //             provider = new anchor.AnchorProvider(connection, wallet, {});
    //             anchor.setProvider(provider)
    //         }
    
    //         const program = new anchor.Program(idl as anchor.Idl);
    //         setProgram(program)
    //     }
    // }, [connection, wallet]);