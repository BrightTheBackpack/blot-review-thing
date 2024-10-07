
// auth.js
export default (req, res) => {
    const clientId = process.env.client_id; // Replace with your actual client_id
    const redirectUri = "https://blot-review-thing.vercel.app/"; // Replace with your redirect URI
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    res.redirect(githubAuthUrl);
  };
  
