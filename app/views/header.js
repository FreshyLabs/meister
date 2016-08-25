/* @flow */
import React from 'react';
import config from '../config';

function Header( props ) {
  const { user } = props;
  const logInOrOut = user ?
    <a href={ `${config.protocol}${config.host}/logout` }><small>Log Out</small></a>
    :
    <a href={ `${config.protocol}${config.host}` }><small>Log In</small></a>;

  return (
    <header>
      <div className="boundary">
        <div className="pull-right">
          { logInOrOut }
          { user &&
            <span className="avatar"><img src={ user.profile.photos[0].value } /></span>
          }
        </div>
        <div className="logo">
          <img src="/img/freshy-logo.png" />
        </div>
      </div>
    </header>
  );
}

export default Header;
