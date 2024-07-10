"use client"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { FC, ReactNode, useMemo } from "react"
import { clusterApiUrl } from "@solana/web3.js"
import {
    WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");


const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = "https://devnet.helius-rpc.com/?api-key=301961ea-ae60-4242-98eb-512e084a81b6";
    const wallets = useMemo(() => [], []);
  
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
  
export default WalletContextProvider;
