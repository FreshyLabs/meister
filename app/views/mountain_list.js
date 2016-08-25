import React from 'react';

function MountainList( props ) {

  return (
    <div className="col-xs-4 col-sm-4 col-lg-2 mtn-list">
      <ul>
        { props.mountains.map( ( mtn, i ) => {
            return <li 
              key={i} 
              className={ props.mountain && props.mountain.name === mtn.name ? 'selected' : '' }
              onClick={ () => props.change( mtn.name ) }>
                {mtn.name}
              </li>;
          })
        }
      </ul>
    </div>
  );

}

export default MountainList;
