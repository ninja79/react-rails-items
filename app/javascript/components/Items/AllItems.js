import React from "react"
import Item from "./Item"


class AllItems extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this); 
    this.handleEdit = this.handleEdit.bind(this); 
  }

  handleDelete(item_id) {
    console.log('AllItems.handleDelete', item_id);
    this.props.handleDelete(item_id);
  }

  handleEdit(item) {
    console.log('AllItems.handleEdit', item);
    this.props.handleEdit(item);
  }  

  render(props) {
    console.log('AllItems.render', this.props)
    var div_items=this.props.items.map( (item) => {
      return(
        <div key={item.id}> 
          <Item item={item}
             handleDelete={this.handleDelete.bind(this, item.id)}
             handleEdit={this.handleEdit}
          />
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
