import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

// const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_URL_1 as string,
    56: process.env.NEXT_PUBLIC_RPC_URL_56 as string,
    97: process.env.NEXT_PUBLIC_RPC_URL_97 as string
}

console.log('prc.env', process.env.NEXT_PUBLIC_RPC_URL_97)
export const injected = new InjectedConnector({ supportedChainIds: [56, 97] })


export const network = new NetworkConnector({
    urls: { 56: RPC_URLS[56], 97: RPC_URLS[97] },
    defaultChainId: 97
})

export const walletConnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    qrcode: true,
    bridge: 'https://bridge.walletconnect.org/'
})

