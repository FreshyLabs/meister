import React from 'react';
import autobind from 'autobind-decorator';

import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/lib/codemirror.css');

@autobind
class MountainDeets extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      scraperUrl: '',
      scraperFunc: '',
      webcams: [],
      currentNew: 0,
      currentBase: 0,
      currentStatus: ''
    }
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.mountain ) {
      const { properties: data } = newProps.mountain.feature;
      this.setState({
        scraperUrl: newProps.mountain.scraperUrl,
        scraperFunc: newProps.mountain.scraperFunc,
        webcams: data.webcams,
        currentNew: data.current_new,
        currentBase: data.current_base,
        currentStatus: data.current_status
      });
    }
  }

  addCam() {
    this.setState( { webcams: this.state.webcams.concat(['']) } );
  }

  updateCams( event, i ) {
    const webcams = [ ...this.state.webcams ];
    webcams[ i ] = event.target.value
    this.setState( { webcams } );
  }
  
  updateUrl( event ) {
    this.setState( { scraperUrl: event.target.value } );
  }


  updateCode( newCode ) {
    this.setState({ scraperFunc: newCode });
  }

  test() {
    console.log( this.state.scraperUrl );
  }

  save() {
    const mtn = { 
      ...this.props.mountain,
      scraperUrl: this.state.scraperUrl,
      scraperFunc: this.state.scraperFunc,
      feature: { 
        ...this.props.mountain.feature,
        properties: { 
          ...this.props.mountain.feature.properties,
          current_new: this.state.currentNew,
          current_base: this.state.currentBase,
          currentStatus: this.state.currentStatus,
          webcams: this.state.webcams 
        }
      }
    };
    console.log('SAVE', this.props.mountain.name, mtn)
  }

  render() {
    return (
      <div className="col-xs-8 col-sm-8 col-lg-6 mtn-deets">
        <h2>{ this.props.mountain.name }</h2>
        <hr/>
        <h3>Webcams</h3>
        { this.state.webcams.map( ( cam, i) => {
            return <div key={i}>
              <input 
                name='cam' 
                onChange={ e => this.updateCams( e, i ) }
                type="text" 
                value={ cam } 
                key={i}/> 
            </div>
          }) 
        }
        <a className="btn btn-primary pull-right" href="#" onClick={ this.addCam }>Add</a>
        <h3>Scraper</h3>
        <label name='url'>Scraper URL</label>
        <input name='url' onChange={ this.updateUrl } type="text" value={ this.state.scraperUrl } />
        <Codemirror value={this.state.scraperFunc} onChange={this.updateCode} options={{mode: 'javascript'}} />
        <a className="btn btn-primary pull-right" href="#" onClick={ this.test }>Test</a>
        <a className="btn btn-primary pull-right" href="#" onClick={ this.save }>Save</a>
      </div>
    );
  }

}

export default MountainDeets;
