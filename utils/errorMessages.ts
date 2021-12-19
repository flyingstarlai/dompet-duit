import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'

import {UnsupportedChainIdError} from "@web3-react/core";

function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
        return 'Tidak terdeteksi metamask. Gunakan dApp browser.'
    } else if (error instanceof UnsupportedChainIdError) {
        return "Kamu terhubung ke network yang salah."
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
    ) {
        return 'Silahkan hubungkan akun wallet anda ke website ini.'
    } else {
        console.error(error)
        return 'Terjadi kesalahan.'
    }
}

export default getErrorMessage;
