export const environment = {
  production: true,
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    audience: 'https://contacts-api',
    redirectUri: 'https://your-production-domain.com/callback'
  },
  apiUrl: 'https://your-production-domain.com/api'
};
