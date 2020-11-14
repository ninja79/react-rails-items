import React from "react"
//import axios from 'axios'

class NewItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };  

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('event', event, 'name:', name, 'value:', value);
    this.setState({ ...this.state, [name]: value });
  };

  handleClick(event) {
    var name = this.refs.name.value;
    var description = this.refs.description.value;
    console.log('NewItem.handleClick, passing to onSubmitNewItem', {name}, {description});

    this.props.onSubmitNewItem({name, description});

    //Reset input fields
    this.setState({name: '', description: ''});

  }
 
  render() {
    return (
      <div>
          <input 
            ref='name' 
            name='name' 
            placeholder='Enter the name of the item' 
            value={this.state.name} 
            onChange={this.handleInputChange}
          />
          <input 
            ref='description' 
            name='description' 
            placeholder='Enter a description' 
            value={this.state.description} 
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleClick}>Submit</button>
        </div>
        );
   }
};

export default NewItem
