import cookie from 'cookie';

export default (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const accessToken = cookies.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Now you can use the access token to make authenticated requests to GitHub
    // Example: fetching user data from GitHub
    fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            res.setHeader('Set-Cookie', cookie.serialize('username', data, {
                httpOnly: true, // Not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 60 * 60 * 24, // 1 day
                path: '/', // Cookie is available across the entire site
            }));
            res.status(200).json(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Failed to fetch user data' });
        });
};
