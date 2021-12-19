import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { Web3ReactProvider } from '@web3-react/core'


import type {
    ExternalProvider,
    JsonRpcFetchFunc,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
declare let window: any;

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>$DUIT</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Component {...pageProps} />
                </Web3ReactProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
