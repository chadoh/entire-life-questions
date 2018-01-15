import React from 'react';
import propTypes from 'prop-types';
import {parseAuthenticationData, setAuth} from '../auth';
import Loader from '../Loader'

export default class SigningIn extends React.Component {
  static propTypes = {
    history: propTypes.object,
  };

  componentDidMount() {
    const { history } = this.props
    parseAuthenticationData((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setAuth(authResult)
        history.replace('/')
      } else if (err) {
        console.error(err);
        history.replace('/');
      } else {
        history.replace('/')
      }
    });
  }

  render() {
    return <Loader text="Signing in" />
  }
}
