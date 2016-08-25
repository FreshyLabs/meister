/* @flow */
import React    from 'react';
import autobind from 'autobind-decorator';
import shallowCompare from 'react-addons-shallow-compare';
import isEqual from 'lodash/isEqual';

import Api       from '../lib/api';
import config    from '../config';

import Header    from './header';
import Footer    from './footer';
import MountainList  from './mountain_list';
import MountainDeets from './mountain_deets';

import '../styles/index.css';

const _actions = {

  // mountains
  fetchMountains() {
    return Api.get( '/mountains' );
  },

  updateMountain( name, data ){
    return Api.put( '/mountains/' + name, data );
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
      selectedMtn: null,
      user: null
    };
  }

  componentDidMount() {
    _actions.fetchMountains().then( mountains => {
      this.setState( { mountains } );
    } );

    _actions.fetchUser().then( user => {
      this.setState( { user } );
    } );
  }

  shouldComponentUpdate( ...args: Array<any> ) {
    return shallowCompare( this, ...args );
  }

  @autobind
  changeMountain( name ) {
    this.setState( { 
      selectedMtn: this.state.mountains.find( mtn => mtn.name === name ) 
    } );
  }

  updateMtn( name, model ) {
    _actions.updateMountain( name, model );
  }

  render () {
    const {
      props: { children, ...props },
    } = this;

    const { selectedMtn } = this.state;

    return (
      <div>
        <Header { ...props } user={ this.state.user } />
        <MountainList { ...props } mountain={ selectedMtn } mountains={ this.state.mountains } change={ this.changeMountain }/>
        { selectedMtn && <MountainDeets { ...props } mountain={ selectedMtn } save={ this.updateMtn } /> }
      </div>
    );
  }
}

export default Index;
