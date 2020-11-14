import React from 'react'

class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_edit_ongoing: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this); 
    this.handleEditClick = this.handleEditClick.bind(this); 
    this.handleUndoEdit = this.handleUndoEdit.bind(this);
  }

  handleDeleteClick(item_id) {
    console.log('Items.handleDeleteClick', item_id);
    this.props.handleDelete(item_id);
  }

  handleEditClick(e) {
    console.log('Items.handleEditClick', e);

    if (this.state.is_edit_ongoing) {
      var id = this.props.item.id;
      var name = this.refs.name.value;
      var description = this.refs.description.value;  
      var v_item = {id: id , name: name , description: description}; 
         
      console.log('Items.handleEditClick', this.state.is_edit_ongoing, v_item)
      this.props.handleEdit(v_item);
      
    }
    
    this.setState({is_edit_ongoing: !this.state.is_edit_ongoing});
  } 

  handleUndoEdit(e) {
    console.log('Items.handleUndoEdit', e);

    this.setState({is_edit_ongoing: !this.state.is_edit_ongoing});
  } 

  render(props){
    var item = this.props.item
    
    var tag_name = this.state.is_edit_ongoing?
      <input type='text' ref='name' defaultValue={this.props.item.name} />
      :
      <em>{item.name} - </em> 
    var tag_description = this.state.is_edit_ongoing?
      <input type='text' ref='description' defaultValue={this.props.item.description} />
      :
      <em>{item.description}</em>       
    
    var edit_submit_toggle = this.state.is_edit_ongoing? 'Submit' : 'Edit'
      
    return (
        <div key={item.id}> 
          {tag_name}
          {tag_description}
          {
            this.state.is_edit_ongoing?
              (<button className="btn btn-basic" onClick={this.handleUndoEdit.bind(this)}>Cancel</button>)       
              : (' ')         
          }

          <button className="btn btn-primary" onClick={this.handleEditClick.bind(this)}>{edit_submit_toggle}</button>
          <button className="btn btn-danger" onClick={this.handleDeleteClick.bind(this, item.id)}>Delete</button>
        </div>  
    )
  }
}

export default Items
        