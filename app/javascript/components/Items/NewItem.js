import React from "react"
import axios from 'axios'

class NewItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  
  handleSubmit(event) {
    var name = this.refs.name.value;
    var description = this.refs.description.value;
    
    console.log(`The name value is ${name}, the description value is ${description}`);
    event.preventDefault();
    
    console.log('Starting POST request..')
    axios.post('/api/v1/items.json', {name, description}) 
      .then(resp => {
          console.log(resp)
        })
      .catch(resp => {console.log(resp)})
    console.log('..done!')
    
  }  
  
  render() {
    return (
      <div>
          <input ref='name' placeholder='Enter the name of the item' />
          <input ref='description' placeholder='Enter a description' />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        );
   }
};

export default NewItem
