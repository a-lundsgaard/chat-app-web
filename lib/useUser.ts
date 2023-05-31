import { useEffect } from 'react'
import Router from 'next/router'
import { useQuery } from '@apollo/client'
// import { parseCookies } from 'nookies';
// import { IS_ME } from '@/app/graphql/graphqlQueries'
import { IS_ME } from '@/graphql/graphqlQueries'

export default function useUser({
    redirectTo = '',
    redirectIfFound = false,
} = {}) {


    const { data } = useQuery(IS_ME)

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        const user = data?.isMe
        console.log('got user data for auth: ', data)

        if (!redirectTo || !user) return
        if (
            // If redirectTo is set, redirect if the user was not found.
            // (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectTo && !redirectIfFound && !user.isLoggedIn) ||

            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            // Router.push(redirectTo)
            // Router.push(redirectTo)
            console.log('redirecting to: ', redirectTo)
        }
    }, [data, redirectIfFound, redirectTo])

    return { user: data?.isMe }
}