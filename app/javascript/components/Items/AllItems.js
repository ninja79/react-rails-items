import React from "react"

class AllItems extends React.Component {

/*
  constructor(props) {
    super(props);
    //console.log('AllItems.constructor', props)
    this.state = {
      items: props.items
    };
  }
*/

  render(props) {
    console.log('AllItems.render', this.props)
    var div_items=this.props.items.map( (item) => {
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
