// export const metadata = {
//     title: 'Sign In - Simple',
//     description: 'Page description',
// }

import Head from 'next/head';
import Link from 'next/link'
// import SignInForm from '@/app/pages/auth/SignInForm'
import SignInForm from '@/components/auth/signInForm'
import { ReactElement } from 'react';
import RootLayout from '@/components/layouts/rootLayout';

export default function SignIn() {

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl px-4 mx-auto sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
                        <h1 className="h1">Welcome back. We exist to make messaging easier.</h1>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">

                        <SignInForm />

                        {/* <div className="flex items-center my-6">
                <div className="mr-3 border-t border-gray-300 grow" aria-hidden="true"></div>
                <div className="italic text-gray-600">Or</div>
                <div className="ml-3 border-t border-gray-300 grow" aria-hidden="true"></div>
              </div> */}

                        <div className="mt-6 text-center text-gray-600">
                            Don't you have an account? <Link href="/signup" className="text-blue-600 transition duration-150 ease-in-out hover:underline">Sign up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}


// export a layout
SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            <Head>
                <title>Sign In</title>
            </Head>
            {page}
        </RootLayout>
    );
};
