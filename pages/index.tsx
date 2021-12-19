// noinspection SpellCheckingInspection

import  { NextPage } from 'next'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {ChangeEvent, useEffect, useState} from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Drawer,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import Appbar from '../components/Appbar'
import SwitchNetwork from '../components/SwitchNetwork'
import ContractInfo from '../components/ContractInfo'
import VendorShop from '../components/VendorShop'
import Alert from "@mui/material/Alert";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";

import { ethers } from 'ethers'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { InjectedConnector } from "@web3-react/injected-connector";
import getErrorMessages from '../utils/errorMessages'

const injected = new InjectedConnector({
    supportedChainIds: [1, 97],
});
// ABI

import DuitABI from '../abis/Duit.json'
import {useEagerConnect, useInactiveListener} from "../utils/hooks";
import {ConnectorNames} from "../config/constants";
import {network, walletConnect} from "../config/connector";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";

const Home: NextPage = () => {

    const connectorsByName: { [connectorName in ConnectorNames]: any } = {
        [ConnectorNames.Injected]: injected,
        [ConnectorNames.Network]: network,
        [ConnectorNames.WalletConnect]: walletConnect,
    }
    const context = useWeb3React<Web3Provider>()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context

    const [activatingConnector, setActivatingConnector] = useState();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const triedEager = useEagerConnect()

    useInactiveListener(!triedEager || !!activatingConnector)

    const connectToWeb3 = async () => {
       //  await web3React.activate(injected);
       // console.log('acc', web3React.active)
    }


  const [contractAddress, setAddress] = useState({
    token: "",
    vendor: ""
  })

  const [token, setToken] = useState({
    balance: '0',
    vendorBalance: '0'
  })

    const[drawer, setDrawer] = useState(false)

  const [currentAccount, setCurrentAccount] = useState<string>();
  const [values, setValues] = useState<{ [key: string]: string}>({
    customer: '',
    amount: ''
  })

  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [walletNotFound, setWalletNotFound] = useState(false)
  const [walletUnlocked, setWalletUnlocked] = useState(false)
  const [preLoading, setPreLoading] = useState(false)

  const [paymentInProcess, setPaymentInProcess] = useState(false)

  return (
      <Box sx={{ display: 'flex' }}>
        <Appbar
            web3={''}
            openDrawer={(open) => setDrawer(open)}
            open={drawer}
            onUnlockWallet={(acc) => setCurrentAccount(acc)}
            account={currentAccount || 'Unlock'}
        />
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={preLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

          <Drawer
              anchor={'top'}
              open={drawer}
              onClose={() => setDrawer(false)}
          >
             <List>
                 <ListItemText primary='home' />
                 <ListItemText primary='home' />
                 <ListItemText primary='home' />
             </List>
          </Drawer>
        <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{  mb: 4 }}>
            <Grid
                container spacing={3}
                justifyContent="center">

              <Grid item xs={12}  md={8} lg={9} >
                {wrongNetwork && <SwitchNetwork />}
                {walletNotFound && <Alert severity="warning">Please Install Metamask</Alert>}
                {walletUnlocked && <Alert severity="warning">Please Unlock Your Wallet</Alert>}
                {/*<Button onClick={handleConnectModal}>Connect</Button>*/}
              </Grid>

                {
                    Object.keys(connectorsByName).map((name) => {

                        // @ts-ignore
                        const currentConnector = connectorsByName[name];
                        const activating = currentConnector === activatingConnector
                        const connected = currentConnector === connector
                        const disabled = !triedEager || !!activatingConnector || connected || !!error

                        return(
                            <Grid key={name} item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Button
                                        variant={'outlined'}
                                        onClick={async () => {
                                            setActivatingConnector(currentConnector)
                                            // @ts-ignore
                                            await activate(connectorsByName[name])
                                        }}
                                    >
                                        Connect with {name}
                                    </Button>
                                 </Paper>
                            </Grid>
                        )
                    })
                }
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                >
                    <List>
                        <ListItem>
                            <ListItemText primary={'Chain ID'} secondary={chainId || '-'} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={'Account'} secondary={account === null
                                ? '-'
                                : account
                                    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                                    : ''} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={'Balance'} secondary={'content'} />
                        </ListItem>
                    </List>
                    <Stack spacing={2}>
                        {(active || error) && (
                            <Button
                                variant={'outlined'}
                                onClick={() => {
                                    deactivate()
                                }}>
                                Batalkan
                            </Button>

                        )}
                        {!!error && <Typography>{getErrorMessages(error)}</Typography>}
                    </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

      </Box>
  )
}

export default Home
