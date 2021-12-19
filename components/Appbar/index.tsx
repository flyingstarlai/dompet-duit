import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import BalanceIcon from "@mui/icons-material/Balance";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {AppProps} from "next/app";
import {EmotionCache} from "@emotion/react";
import {useEffect, useState} from "react";


interface MyAppProps {
    account:  string;
    web3?: any;
    onUnlockWallet: (acc: string) => void;
    openDrawer: (drawer: boolean) => void;
    open: boolean;
}

declare let window: any;

export default function AppbarIndex(props: MyAppProps) {



    async function handleUnlockWallet() {
        if(props.account !== 'Unlock') return;
        await props.web3?.eth.requestAccounts();
        const accounts = await props.web3?.eth.getAccounts();
        if(accounts) props.onUnlockWallet(accounts[0])
    }
    return (
            <AppBar  position="absolute">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Avatar>
                            <BalanceIcon />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        $DUIT Tokenomic
                    </Typography>
                    {
                        props.web3 &&
                        <>
                            <Typography color="inherit">{props.account}</Typography>
                            <IconButton onClick={handleUnlockWallet} color="inherit">
                                <AccountBalanceWalletIcon />
                            </IconButton>
                        </>
                    }
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => props.openDrawer(!props.open)}
                        sx={{ ...(props.open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>

            </AppBar>
    );
}
