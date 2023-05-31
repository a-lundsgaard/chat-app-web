'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';
// import { SIGNIN_USER, REGISTER_USER } from '@/app/graphql/graphqlMutations';
import { REGISTER_USER } from '@/graphql/graphqlMutations';
import useUser from '@/lib/useUser';

export default function SignUpForm() {

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { user } = useUser();

    useEffect(() => {
        console.log('user from visit sign up', user);
    }, [user]);

    if (loading) {
        console.log('loading');
    }

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('email', username);

        try {
            const { data } = await registerUser({
                variables: {
                    input: {
                        username: username,
                        email: email,
                        password: password
                    }
                }
            });
            console.log('data', data);

            // redirect to login page if user is registered
            if (data?.registerUser) {
                router.push('/auth/signin');
            }
        }
        catch (err) {
            console.error('error', err);
        }
    }

    return (
        <div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-1 text-sm font-medium text-gray-800" htmlFor="name">Name <span className="text-red-600">*</span></label>
                    <input id="name" type="text" className="w-full text-gray-800 form-input" placeholder="Enter your name" required value={username}
                        onChange={
                            (e) => {
                                setUsername(e.target.value);
                            }
                        }
                    />
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-1 text-sm font-medium text-gray-800" htmlFor="email">Email <span className="text-red-600">*</span></label>
                    <input id="email" type="email" className="w-full text-gray-800 form-input" placeholder="Enter your email address" required
                        onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }
                    />
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-1 text-sm font-medium text-gray-800" htmlFor="password">Password <span className="text-red-600">*</span></label>
                    <input id="password" type="password" className="w-full text-gray-800 form-input" placeholder="Enter your password" required
                        onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        }
                    />
                </div>
            </div>
            <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full px-3">
                    <button
                        className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                        onClick={(e) => handleRegister(e)}
                    >Sign up</button>
                </div>
            </div>
            {/* <div className="mt-3 text-sm text-center text-gray-500">
      By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
    </div> */}
        </div>
    )
}
