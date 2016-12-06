import React from 'react';
import autobind from 'autobind-decorator';
        
import Dropdown from 'react-dropdown'

import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/lib/codemirror.css');
require('react-dropdown/style.css');

@autobind
class MountainDeets extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      scraperUrl: '',
      scraperFunc: '',
      webcams: [''],
      currentNew: 0,
      currentBase: 0,
      currentStatus: '',
      dirty: false
    }
  }

  componentDidMount(){
    if ( this.props.mountain ) {
      this._update( this.props );
    }
  }
  

  componentWillReceiveProps( newProps ) {
    if ( newProps.mountain ) {
      this._update( newProps );
    }
  }

  _update( props ) {
    if ( !props.testResult ) {
      const { properties: data } = props.mountain.feature;
      this.setState({
        scraperUrl: props.mountain.scraperUrl,
        scraperFunc: props.mountain.scraperFunc,
        webcams: data.webcams,
        currentNew: data.current_new,
        currentBase: data.current_base,
        currentStatus: data.current_status,
        dirty: props.dirty
      });
    }
  }

  addCam( e ) {
    e.stopPropagation();
    this.setState( { webcams: this.state.webcams.concat(['']), dirty: true } );
  }

  updateCams( event, i ) {
    const webcams = [ ...this.state.webcams ];
    webcams[ i ] = event.target.value || '';
    this.setState( { webcams: [ ...webcams.filter( w => w !== '') ], dirty: true } );
  }
  
  updateUrl( event ) {
    this.setState( { scraperUrl: event.target.value, dirty: true } );
  }

  updateVal( name, value ) {
    this.setState( { [ name ]: value, dirty: true } );
  }

  updateCode( newCode ) {
    this.setState({ scraperFunc: newCode, dirty: true });
  }

  test( e ) {
    e.stopPropagation();
    const { scraperUrl, scraperFunc } = this.state;
    this.props.testScraper( this.props.mountain.name, scraperUrl, scraperFunc );
  }

  save( e ) {
    e.stopPropagation();
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
          current_status: this.state.currentStatus,
          webcams: this.state.webcams 
        }
      }
    };
    //console.log(mtn)
    this.props.save( this.props.mountain.name, mtn );
  }

  render() {
    const statusOpts = [ 'open', 'closed' ];

    const { testResult, mountain } = this.props;
    const { dirty, currentNew, currentBase, currentStatus } = this.state;

    console.log( mountain.feature.properties )
    
    return (
      <div className="col-xs-8 col-sm-8 col-lg-6 mtn-deets">
        <h2>{ mountain.name } <a className="btn btn-primary pull-right" href="#" onClick={ this.save }>{ dirty ? 'Save' : 'Saved' }</a></h2>

        <span style={{ fontSize: '10' }}>{'Updated at: ' + mountain.feature.properties.report_time }</span>        

        <div className="row">
          <div className="col-xs-3 col-sm-3 col-lg-3">
            <h3>New</h3>
            <input name='new' onChange={ (e) => this.updateVal('currentNew', e.target.value ) } type="text" value={ currentNew} />
          </div>
          <div className="col-xs-3 col-sm-3 col-lg-3">
            <h3>Base</h3>
            <input name='new' onChange={ (e) => this.updateVal('currentBase', e.target.value ) } type="text" value={ currentBase} />
          </div>
          <div className="col-xs-3 col-sm-3 col-lg-3">
            <h3>Status</h3>
            <Dropdown options={ statusOpts } onChange={ v => this.updateVal('currentStatus', v.value ) } value={ currentStatus } placeholder="Select an status" />
          </div>
        </div>

        <h3>Webcams</h3>
        { this.state.webcams.map( ( cam, i) => {
            return <div key={i}>
              <input
                name='cam'
                onChange={ e => this.updateCams( e, i ) }
                type="text"
                value={ cam || '' }
                key={i}
                style={{ width: '90%', 'float': 'left' }}/>
              <img src={ cam } width={ 50 } />
            </div>
          })
        }
        <a className="btn btn-primary pull-right" href="#" onClick={ this.addCam }>Add</a>

        <h3>Scraper</h3>
        <input name='url' onChange={ this.updateUrl } type="text" value={ this.state.scraperUrl } />
        <Codemirror value={this.state.scraperFunc} onChange={this.updateCode} options={{mode: 'javascript'}} style={{height: 300}} />
        { testResult && <div>{ typeof testResult === 'object' ? JSON.stringify( testResult ) : testResult }</div>} 
        <a className="btn btn-primary pull-right" href="#" onClick={ this.test }>Test</a>

        { mountain.error && mountain.error.length &&
          <div> 
            <h3>Errors</h3>
            { mountain.error.map( ( e, i )  => { 
                if ( e ) {
                  return <div key={i}>{ JSON.stringify( e ) }</div>
                }
              })
            }
          </div>  
        }
      </div>
    );
  }

}

export default MountainDeets;
