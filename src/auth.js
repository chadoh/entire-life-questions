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

export const setAuth = ({accessToken, idToken, expiresIn, idTokenPayload}) => {
  const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('idToken', idToken);
  localStorage.setItem('expiresAt', expiresAt);
  localStorage.setItem('userData', JSON.stringify(idTokenPayload));
}

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('userData');
}

export const getUser = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) return null;


  const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
  const expired = new Date().getTime() >= expiresAt;
  if (expired) {
    logout();
    return false;
  }

  return JSON.parse(userData);
}

export const getToken = () => localStorage.getItem('accessToken')

