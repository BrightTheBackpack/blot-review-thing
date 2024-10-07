import fetch from 'node-fetch';

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
    res.status(200).json({ token: tokenData.access_token });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get access token' });
}
};