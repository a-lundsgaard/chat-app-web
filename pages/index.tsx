import Head from "next/head";
import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import Homelayout from "@/components/layouts/homeLayout";
import verifyUser from "@/lib/verifyUser";
import { GetServerSidePropsContext } from 'next';
import Cookies from "cookies";
import RootLayout from "@/components/layouts/rootLayout";

// imporit 


import Hero from "@/components/hero";

const Home: NextPageWithLayout = () => {
	return (
		<>
			<Hero />
			{/* <Features /> */}
			{/* <FeaturesBlocks /> */}
			{/* <Testimonials /> */}
			{/* <Newsletter /> */}
		</>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<RootLayout>
			<Head>
				<title>MyChat</title>
			</Head>
			<Homelayout>
				{page}
			</Homelayout>
		</RootLayout>
	);
};

export default Home;


export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	try {
		const cookies = new Cookies(req, res);
		const user = cookies.get('auth-token');

		if (user) {
			res.setHeader('Location', '/chat');
			res.statusCode = 302;
			res.end();
		}

		return { props: {} }
	} catch (err) {
		console.error('got error', err)
		return { props: {} }
	}
}