import Cookies from "cookies";
import Router from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from 'next';

function Logout() {
	useEffect(() => {
		Router.push('/');
	}, [])

	return (
		<></>
	)
}

export default Logout


export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const cookies = new Cookies(req, res)
	// Delete the cookie by not setting a value
	cookies.set('auth-token')
	res.setHeader("Location", "/");
	res.statusCode = 302;
	res.end();
	return { props: {} }
}