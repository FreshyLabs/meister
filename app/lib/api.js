/* @flow */
import 'isomorphic-fetch';

type tOptions = {
  headers?: Object
};
type tDefaults = { credentials: string } & tOptions;
type tResults = { response: any, code: number };

const isIE10 = typeof window !== 'undefined' && 'onpropertychange' in document && !!window.matchMedia;

function _mergeOptions( defaults: tDefaults, options: tOptions ): Object {
  return {
    ...defaults,
    headers: { ...defaults.headers, ...( options.headers || {} ) },
    ...options
  };
}

function _handleResponse( response ) {

  if ( response.status === 403 ) {
    window.location = '/';
  } else if ( response.status > 400 ) {
    // if we get an error, try to jsonify and return response. if there is
    // an error when doing jsonification, just send text.
    return response.json()
      .then( ( json: Object | Array<any> ) => ( { response: json, code: response.status }  ) )
      .catch( () => ( { response: response.statusText, code: response.status } ) )
      .then( ( results: tResults ) => Promise.reject( results ) );
  } else {
    const contentType = response.headers.get( 'content-type' );
    return contentType && ~contentType.indexOf( 'application/json' ) ?
      response.json() :
      response.text();
  }
}

function _fetch( defaults: Object ) {
  return ( url, options = {} ) => (
    fetch( url, _mergeOptions( defaults, options ) )
      .then( response => _handleResponse( response ) )
    );
}

function makeUrl( url ) {
  const PATH = '/api';
  if ( isIE10 ) {
    /* eslint-disable no-param-reassign */
    url += ( ~url.indexOf( '?' ) ? '&cache=' : '?' ) + String( Date.now() );
  }
  return `${PATH}${url}`;
}

function init( cookie?: string ) {

  const defaults = { credentials: 'same-origin', headers: {} };

  if ( cookie ) {
    defaults.headers = { 'Cookie': cookie };
  }

  const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const goFetch = _fetch( defaults );

  const Api = {

    delete( url: string, params?: Object ): Promise<any> {
      const body = JSON.stringify( params || {} );
      return goFetch( makeUrl( url ), { method: 'DELETE', body, headers: jsonHeaders } );
    },

    download( url: string ): void {
      window.location = makeUrl( url );
    },

    _get( url: string, options: Object = {} ): Promise<any> {
      return goFetch( url, options );
    },

    get( url: string, options?: Object ): Promise<any> {
      return goFetch( makeUrl( url ), options );
    },

    _post( url: string, params: Object ): Promise<any> {
      const body = JSON.stringify( params );
      return goFetch( url, { method: 'POST', body, headers: jsonHeaders } );
    },

    post( url: string, params: Object ): Promise<any> {
      return Api._post( makeUrl( url ), params );
    },

    put( url: string, params: Object ): Promise<any> {
      const body = JSON.stringify( params );
      return goFetch( makeUrl( url ), { method: 'PUT', body, headers: jsonHeaders } );
    },

    upload( url: string, files: Array<string> ): Promise<any> {
      const formData = new FormData();

      for ( let i = 0, len = files.length; i < len; i++ ) {
        formData.append( 'file', files[i] );
      }
      return goFetch( makeUrl( url ), {
        method: 'POST',
        body: formData
      } );
    }
  };

  return Api;
}

export default init();
