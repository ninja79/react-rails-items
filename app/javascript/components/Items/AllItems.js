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
          <Item item={item}
             handleDelete={this.handleDelete.bind(this, item.id)}
             handleEdit={this.handleEdit}
          />  
      )
    });

    return (
      <table className='table table-sm table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {div_items}
        </tbody>
      </table>
    );
  }
};

export default AllItems
