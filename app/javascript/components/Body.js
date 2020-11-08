import React from "react"
import axios from 'axios'
import AllItems from './Items/AllItems'
import NewItem from './Items/NewItem'

class Body extends React.Component {

  constructor(props) {
    super(props);
    //console.log('Body.constructor', props)
    this.state = {
      items: []
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  
  componentDidMount() {
    console.log("Body component mounted, fetching items..");    
    axios.get('/api/v1/items.json')
      .then ( resp => {
          console.log(resp) 
          //var newState = this.state.items.concat(item)
          this.setState({items: resp.data})
            console.log("..done");           
          })//setAirlines (resp.data.data) )
      .catch( resp => console.log('Something went wrong..', resp) )    

    
//    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
    
  }

  handleSubmit(item) {
    console.log('Body.handleSubmit', item);
    
    event.preventDefault();
    
    console.log('Starting POST request..')

    axios.post('/api/v1/items.json', item) 
      .then(resp => {
          console.log('Body.handleSubmit after post', resp);
          var newState = this.state.items.concat(resp.data);   
          //console.log('Body.handleSubmit newState', newState);       
          this.setState({items: newState});
        })
      .catch(resp => {console.log(resp)})
    console.log('..done!')
        
    //var newState = this.state.items.concat(item);
    //this.setState({ items: newState })
  }
  
  render () {
    return (
      <div className="Body">
        <h2>Hello, World from Body Component!</h2>
        <NewItem onSubmitNewItem={this.handleSubmit}/>        
        <AllItems items={this.state.items}/>
      </div>
    );
  }
};

export default Body