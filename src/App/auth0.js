import auth0 from 'auth0-js';

const { protocol, host, port } = {
  development: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
  },
  production: {
    protocol: 'https',
    host: 'questions.entire.life',
  }
}[process.env.NODE_ENV]

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'entirelife.eu.auth0.com',
    clientID: 'v64MkJj8YX8ByB7ERZy3dbkmO0Wv1G9N',
    redirectUri: `${protocol}://${host}${port ? `:${port}` : ''}/signing-in`,
    audience: 'https://entire-life.herokuapp.com',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  authorize = () => this.auth0.authorize();

  parseAuthenticationData = cb => {
    this.auth0.parseHash(cb);
  }
}

const authorizor = new Auth();

export default authorizor;

export const login = e => {
  e.preventDefault();
  authorizor.authorize();
};

export const parseAuthenticationData = cb =>
  authorizor.parseAuthenticationData(cb);

