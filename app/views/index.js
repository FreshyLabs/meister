/* @flow */
import React    from 'react';
import autobind from 'autobind-decorator';
import shallowCompare from 'react-addons-shallow-compare';
import isEqual from 'lodash/isEqual';

import Api       from '../lib/api';
import config    from '../config';
//import Header    from './header';
//import Footer    from './footer';
//import '../styles/index.css';


const _actions: tActions = {

  // mountains

  fetchMountains() {
    return Api.get( '/mountains' );
  },

  // users

  fetchUser() {
    return Api.get( '/user/current' );
  }

};

class Index extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      mountains: [],
      user: null
    };
  }

  componentDidMount() {
    _actions.fetchMountains().then( mountains => {
      this.setState( { mountains } );
    } );

    _actions.fetchUser().then( user => {
      this.setState( { user } );
      this.initConnection( user.container );
    } );
  }

  shouldComponentUpdate( ...args: Array<any> ) {
    return shallowCompare( this, ...args );
  }

  //<Header { ...props } user={ this.state.user } />
  //<Footer />

  render () {
    const {
      props: { children, ...props },
    } = this;

    return (
      <div>
        { React.cloneElement( children, {
          ...props,
          ...this.state,
          actions: _actions
        } ) }
      </div>
    );
  }
}

export default Index;
