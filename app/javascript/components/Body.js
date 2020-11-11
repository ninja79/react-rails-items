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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
  
  handleDelete(item_id) {
    console.log('Body.handleDelete', item_id);  
    
    axios.delete(`/api/v1/items/${item_id}`) 
      .then(resp => {
          console.log('Body.handleDelete after post', resp);
          var newState = this.state.items.filter((item) => {
            return item.id != item_id;
          });
          //console.log('Body.handleSubmit newState', newState);       
          this.setState({items: newState});
        })
      .catch(resp => {console.log(resp)})
    console.log('..done!')    
  }

 
  handleEdit(item) {
    console.log('Body.handleEdit', item);
    var item_data = item
    //removing ID from data as not allowed in controller update
    var item_id = item.id
    delete item_data['id']
    //console.log('item_data', item_data)
    
    axios.patch(`/api/v1/items/${item_id}`, item_data) 
      .then(resp => {
          console.log('Body.handleEdit after patch..', resp);
          
          var updated_item = resp.data
          
          //var i = this.state.items.indexOf(item)  
          
          //var newState = {...this.state.items}
          var newState = this.state.items
          
          for (var i in newState) {
            if (newState[i].id == updated_item.id) {
              console.log('for loop, i=', i); 
              newState[i] = updated_item
            }
          }
 
          console.log('newState', newState)
      
          /* //Replace using with filter+push.. Item is moved down the list
          var newState = this.state.items.filter((item) => {
            return item.id != updated_item.id;
          });
          newState.push(updated_item);
          */
          //console.log('Body.handleSubmit newState', newState);       
          this.setState({items: newState});
        })
      .catch(resp => {console.log(resp)})
    console.log('..update done!')      
    
  }

  render () {
    return (
      <div className="Body">
        <h2>Hello, World from Body Component!</h2>
        <NewItem onSubmitNewItem={this.handleSubmit}/>        
        <AllItems items={this.state.items} 
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
        />
      </div>
    );
  }
};

export default Body
