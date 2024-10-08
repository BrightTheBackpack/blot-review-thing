import fetch from 'node-fetch';
import cookie from 'cookie'
export default async (req, res) => {
const { code } = req.query;

if (!code) {
    return res.status(400).json({ error: 'Code not provided' });
}

const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;

try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
    }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
    return res.status(500).json({ error: tokenData.error });
    }

    // Token received, you can now use it to make authenticated requests to GitHub API
    res.setHeader('Set-Cookie', cookie.serialize('access_token', tokenData, {
        httpOnly: true, // Not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 60 * 60 * 24, // 1 day
        path: '/', // Cookie is available across the entire site
    }));
    

    // Redirect or respond with a success message
    res.status(200).json({ message: 'Token stored in cookie' });
    window.location.href = ''

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get access token' });
}
};