import axios from 'axios'
import { GetServerSidePropsContext } from 'next';
import Cookies from 'cookies'
import { UserResponsObject } from '@/graphql/__generated__/graphql'

const API_URL = process.env.NEXT_PUBLIC_DEFAULT_GATEWAY;

export default async function verifyUser({
    req,
    res,
    redirectTo = '',
    redirectIfFound = false,
    isSubscribe = false,
}: {
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
    redirectTo?: string
    redirectIfFound?: boolean,
    isSubscribe?: boolean
}) {
    const cookies = new Cookies(req, res)
    const authToken = cookies.get('auth-token') || ''

    if (!authToken) {
        console.log('no auth token found')
        res.setHeader('Location', '/auth/signin');
        res.statusCode = 302;
        res.end();
    } else {

        try {
            const { data } = await axios.post(API_URL!, {
                query: `
            query IsMe {
              isMe {
                id
                username
                email
                isLoggedIn
              }
            }
          `,
            }, {
                headers: {
                    'auth-token': authToken
                }
            }) as {
                data: {
                    data: {
                        isMe: UserResponsObject,
                    }
                }
            }

            const user = data?.data?.isMe

            if (!user?.isLoggedIn) {
                console.log('user not logged in')
                res.setHeader('Location', '/auth/signin');
                res.statusCode = 302;
                res.end();
            }

            if (isSubscribe) {
                // return auth token as well if subscription
                return { ...data.data.isMe, authToken }
            }

            return data.data.isMe
        } catch (error) {
            console.error('error getting user data for auth: ', (error as Error).message)
        }

    }
    return null
}