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

  fetchMountain( name ) {
    return Api.get( '/mountains/' + name );
  },

  updateMountain( name, data ){
    return Api.put( '/mountains/' + name, data );
  },

  
  testScraper( data ){
    return Api.post( '/mountains/scraper', data );
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
      user: null,
      searchTerm: '',
      dirty: false
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
    _actions.fetchMountain( name )
      .then( mtn => {
        this.setState( { 
          selectedMtn: mtn,  
          testResult: null
        } );
      });
  }

  @autobind
  updateMtn( name, model ) {
    this.setState( { dirty: true })
    _actions.updateMountain( name, model )
      .then( () => this.setState( { dirty: false }) );
  }

  @autobind
  testScraper( url, func ) {
    _actions.testScraper( { url, func } ).then( testResult => {
      this.setState( { testResult })
    });
  }

  @autobind
  search( e ) {
    this.setState( { searchTerm: e.target.value } );
  }

  render () {
    const {
      props: { children, ...props },
    } = this;

    const { selectedMtn, testResult, searchTerm, dirty } = this.state;

    return (
      <div>
        <Header { ...props } user={ this.state.user } />
        <MountainList { ...props } term={ searchTerm } search={ this.search } mountain={ selectedMtn } mountains={ this.state.mountains } change={ this.changeMountain }/>
        { selectedMtn && <MountainDeets { ...props } dirty={ dirty } save={this.updateMtn } testResult={ testResult } mountain={ selectedMtn } save={ this.updateMtn } testScraper={ this.testScraper } /> }
      </div>
    );
  }
}

export default Index;
