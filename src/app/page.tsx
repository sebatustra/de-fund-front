"use client"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"
import UsdcMint from "@/components/solana-program/UsdcMint";
import Fund from "@/components/solana-program/Fund";
import { useState } from "react";

export default function Home() {
    const {publicKey} = useWallet();
    const [usdcMint, setUsdcMint] = useState<string>();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-row justify-end w-full p-2">
                <WalletMultiButton />
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
                        />

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Aporta al fondo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>TOKENIZA</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Vende tus tokens
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>TOKENIZA</p>
                            </CardContent>
                        </Card>

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