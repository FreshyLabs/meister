import React from 'react';
import classnames from 'classnames';

function item( props, mtn, key ) {
  const cStatus =  mtn.feature.properties.current_status;
  const classes = classnames( 'mtn-name', {
    'selected': props.mountain && props.mountain.name === mtn.name,
    'open': cStatus === 'open',
    'closed': cStatus === 'closed'
  });

  const errors = mtn.errors;

  if ( props.term === '' || mtn.name.toLowerCase().match( props.term.toLowerCase() ) ) {
    return <li
      key={key}
      className={ classes }
      onClick={ () => props.change( mtn.name ) }>
        {mtn.name} 
        <span className={'stats'}>{mtn.feature.properties.current_new}/{mtn.feature.properties.current_base}{ errors && errors.length ? 'error': ''}</span>
    </li>
  }
}

function MountainList( props ) {

  return (
    <div className="col-xs-4 col-sm-4 col-lg-4 mtn-list">
      <input
        name='search'
        onChange={ props.search }
        type="text"
        value={ props.term }
        placeHolder={ 'Search...' }
      />
      <ul>
        { props.mountains.map( ( mtn, i ) => {
            return item( props, mtn, i )
          })
        }
      </ul>
    </div>
  );

}

export default MountainList;
