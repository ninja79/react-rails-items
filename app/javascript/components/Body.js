import React from "react"
import axios from 'axios'
import AllItems from './Items/AllItems'
import NewItem from './Items/NewItem'
import Toast from './Toast'

class Body extends React.Component {

  constructor(props) {
    super(props);
    //console.log('Body.constructor', props)
    this.state = {
      items: [],
      toasts: []
    };
    //{id:9090, header:'Toast from Body', msg:'Toast creato dalla pagina Body'}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.handleToastDelete = this.handleToastDelete.bind(this);

  }  
  
  componentDidMount() {
    console.log("Body component mounted, fetching items..");    
    axios.get('/api/v1/items.json')
      .then ( resp => {
          console.log(resp) 
          //var newState = this.state.items.concat(item)
          this.setState({items: resp.data})
            console.log("..done"); //, 'this.state', this.state);           
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

    this.show_toast({header:'New item', msg:'New item added succesfully'});
        
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

    this.show_toast({header:'Deleted item', msg:'Item has been deleted'});    
  }

 
  handleEdit(item) {
    console.log('Body.handleEdit', item);
    var item_data = item
    //removing ID from data as not allowed in controller update
    var item_id = item.id
    delete item_data['id']
    //console.log('item_data', item_data)
    
    console.log('this.state.items in handleEdit', this.state)
    
    axios.patch(`/api/v1/items/${item_id}`, item_data) 
      .then(resp => {
          console.log('Body.handleEdit after patch..', resp);
          
          var updated_item = resp.data;
          
          //var i = this.state.items.indexOf(item)  
         
          //var newState = Object.assign({}, this.state);
          var newState = {...this.state}          
          
          //console.log('newState before update', newState)
          //console.log('this.state.items before update', this.state.items)

          for (var i in newState.items) {
            if (newState.items[i].id == updated_item.id) {
              console.log('for loop, i=', i); 
              newState.items[i] = updated_item
            }
          }
 
          //console.log('newState after update', newState)
          //console.log('this.state.items after update', this.state.items)
/*    
          //Replace using with filter+push.. Item is moved down the list
          //var newState = this.state.items.filter((item) => {
          //  return item.id != updated_item.id;
          //});
          //newState.push(updated_item);
          
          //console.log('Body.handleSubmit newState', newState);                 
*/
          
          //Perform a state update to refresh content 
          this.setState({items: newState.items});
        })
      .catch(resp => {console.log(resp)})
    console.log('..update done!')      
    
    this.show_toast({header:'Modified item', msg:'Item has been updated'});    

  };

  handleToastDelete(toast_id) {
    console.log('Body.handleToastDelete', toast_id);  
    
    var newToasts = this.state.toasts.filter((t) => {
            return t.id != toast_id;
          });
    this.setState({toasts: newToasts});
  }

  render () {
    return (
      <div className="Body">
        <Toast toasts={this.state.toasts} 
               handleDelete={this.handleToastDelete} 
        />      
        <NewItem onSubmitNewItem={this.handleSubmit}/>        
        <AllItems items={this.state.items} 
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
        />
      </div>
    );
  };

  //SERVICE FUNCTIONS
  show_toast(toast) {
    var newState = {...this.state};

    //generate a unique id
    const d = new Date();
    toast['id'] =` toast_${d.getTime()}`;
    console.log('show_toast->newState', newState, 'toast:', toast);

    //add the new toast to the current state
    var newToasts = newState.toasts.concat(toast);
    this.setState({toasts: newToasts});
    console.log('show_toast->newToasts 2', newToasts);    

    //setting timer to autodelete toast (if managed via State it cannot fade on its own)
    console.log('set toast delete timer..', toast['id']); 
    setTimeout(function(){ this.handleToastDelete(toast['id']); }, 3000);
  };


};

export default Body
