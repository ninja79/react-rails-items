import React from "react"
import axios from 'axios'

class AllItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  
  componentDidMount() {
    console.log("Component mounted, fetching items..");    
    axios.get('/api/v1/items.json')
      .then ( resp => {
          console.log(resp) 
          this.setState({items: resp.data})
            console.log("..done");           
          })//setAirlines (resp.data.data) )
      .catch( resp => console.log(resp) )    

    
//    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
    
  }

  render() {
    var div_items=this.state.items.map( (item) => {
      return(
        <div key={item.id}> 
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>      
      )
    });
    
    return (
      <div>
        <h1>All items component</h1>
        {div_items}
      </div>
    );
  }
};

export default AllItems
