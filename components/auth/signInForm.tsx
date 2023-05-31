// 'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router';


import { useMutation, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { SIGNIN_USER, REGISTER_USER } from '@/app/graphql/graphqlMutations';

import { SIGNIN_USER } from '@/graphql/graphqlMutations';
// import { setCookie } from 'nookies';
const customEndpoint = process.env.NEXT_PUBLIC_LOGIN_GATEWAY;

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: customEndpoint,
    }),
});

export default function SignInForm() {

    console.log('customEndpoint', customEndpoint);


    const [signInUser, { data, loading, error }] = useMutation(SIGNIN_USER, {
        client: client
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            console.log("logging in", email, password)
            const { data } = await signInUser({
                variables: {
                    input: {
                        email: email,
                        password: password
                    }
                }
            })
            console.log('data', data?.login);
            // redirect to /chat on successful login
            if (data?.login) {
                // window.location.href = '/chat';
                Router.push('/chat');
            }

        } catch (error) {
            console.log('error', error);
        }
    }



    return (
        <div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-1 text-sm font-medium text-gray-800" htmlFor="email">Email</label>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        id="email" type="email" className="w-full text-gray-800 form-input" placeholder="Enter your email address" required />
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <div className="flex justify-between">
                        <label className="block mb-1 text-sm font-medium text-gray-800" htmlFor="password">Password</label>
                        <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                    </div>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        id="password" type="password" className="w-full text-gray-800 form-input" placeholder="Enter your password" required />
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <div className="flex justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-600">Keep me signed in</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full px-3">
                    <button
                        onClick={signIn}
                        className="w-full text-white bg-blue-600 btn hover:bg-blue-700">Sign in</button>
                </div>
            </div>
        </div>
    )
}
