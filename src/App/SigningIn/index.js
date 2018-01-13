import React from 'react';
import propTypes from 'prop-types';
import {parseAuthenticationData} from '../auth0';
import Loader from '../Loader'

export default class SigningIn extends React.Component {
  static propTypes = {
    setData: propTypes.func,
    history: propTypes.object,
  };

  componentDidMount() {
    const { setData, history } = this.props
    parseAuthenticationData((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setData(
          {auth: authResult},
          () => history.replace('/')
        )
        console.log('now save this data', authResult)
        // this.props.login(authResult, this.props.currentUser);
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
