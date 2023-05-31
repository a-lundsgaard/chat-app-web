// import { AppProps } from 'next/app';
import Head from 'next/head';
// // import ApolloWrapper from '../path/to/ApolloWrapper';
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import DefaultLayout from '@/components/layouts/rootLayout';

import './css/style.css'

// import { Inter } from 'next/font/google'


// const inter = Inter({
// 	subsets: ['latin'],
// 	variable: '--font-inter',
// 	display: 'swap'
// })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(
		<>
			<ApolloWrapper>
				<Component {...pageProps} />
			</ApolloWrapper>
		</>

	);
}