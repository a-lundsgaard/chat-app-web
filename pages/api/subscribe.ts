/**
 * pages/api/login.js
 *
 * A demo API endpoint for logging in.
 */

import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'


const API_URL = 'ws://localhost:4000/subscriptions'


export default (req, socket, head) => {

	console.log('proxying æææ', socket, head, 'to', API_URL)
	// if (req.body.email === 'admin@example.com') {
	// 	res.status(200).json({ authToken: '123' })
	// } else {
	// 	res.status(400).json({ error: 'Invalid credentials' })
	// }
}
