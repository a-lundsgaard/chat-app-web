import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { IncomingMessage, ServerResponse } from 'http'

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
// const API_URL = process.env.API_URL

const API_URL = process.env.NEXT_PUBLIC_API_URL // graphql endpoint


const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	},
}

type ProxyRequest = Request & IncomingMessage
type ProxyResponse = Response & ServerResponse<IncomingMessage>

export default (req: ProxyRequest, res: ProxyResponse) => {

	return new Promise<void>((resolve, reject) => {
		const pathname = url.parse(req.url).pathname
		const isLogin = pathname === '/api/proxy/login'

		const cookies = new Cookies(req, res)
		const authToken = cookies.get('auth-token')
		req.url = API_URL! // rewrite url

		// rewrite host name/ip
		const domainName = (API_URL!).match(/(?<=\/\/)[^/]+/)?.[0];
		req.headers.host = domainName || req.headers.host;

		// Don't forward cookies to API
		req.headers.cookie = ''

		// Set auth-token header from cookie
		if (authToken) {
			req.headers['auth-token'] = authToken
		}

		proxy
			.once('proxyRes', (proxyRes, req, res) => {
				if (isLogin) {
					let responseBody = ''
					proxyRes.on('data', (chunk) => {
						responseBody += chunk
					})

					proxyRes.on('end', () => {
						try {
							// const { authToken } = JSON.parse(responseBody)
							console.log('got response', responseBody)
							const data = JSON.parse(responseBody)

							const token = data.data?.login?.token
							console.log('got token', token)

							const cookies = new Cookies(req, res)
							cookies.set('auth-token', token, {
								httpOnly: true,
								// sameSite: 'lax', // CSRF protection
							})

							// get data from graphql
							console.log('got graphql data!', data.data)
							res.statusCode = 200
							res.setHeader('Content-Type', 'application/json')
							res.end(JSON.stringify(data))
							resolve()
						} catch (err) {
							reject(err)
						}
					})
				} else {
					resolve()
				}
			})
			.once('error', reject)
			.web(req, res, {
				target: API_URL,
				autoRewrite: false,
				selfHandleResponse: isLogin,
			})
	})
}
