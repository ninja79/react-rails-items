import React from "react"

class Toast extends React.Component {

	constructor(props) {
		super(props);
		
		this.handleDelete = this.handleDelete.bind(this); 
	};

  handleDelete(toast_id) {
    console.log('Items.handleDeleteClick', toast_id);
    this.props.handleDelete(toast_id);
  }

	render(props) {

		//var p = {id: 123, header: 'New TOAST', time: '2 minutes ago', msg: 'Qualcosa è successo...', ...props}

    var toast_content=this.props.toasts.map( (t) => {
      return(
				<div id={t.id} className="toast fade show data-delay='4000'" /* style={{display:'block', opacity:1}} */
					role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
	        <div className="toast-header">
	        <strong className="mr-auto">{t.header}</strong>
	          <small>{t.time}</small>
	          <button type="button" className="ml-2 mb-1 close " data-dismiss="toast" aria-label="Close">
	            <span 
	            	aria-hidden="true"
	            	onClick={this.handleDelete.bind(this, t.id)}
	            >
	            	&times;
	            </span>
	          </button>
	        </div>
	        <div className="toast-body">
	          ${t.msg}
	        </div>
	      </div>
      )
    });

    return (
		  <div id="toast-container" style={{position: 'fixed', top: '10px', right: '10px', width: '400px'}}>
		  	{toast_content}
		  </div>
		);
	};
};

export default Toast

/*
    	
			<div aria-live="polite" aria-atomic="true" style={{position: 'relative', minHeight: '200px'}}>
			  // Position it 
			  <div style={{position: 'absolute', top: '10px', right: '10px'}}>

			    // Then put toasts within 
			    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
			      <div className="toast-header">
			        <img src="#" className="rounded mr-2" alt="X" />
			        <strong className="mr-auto">Bootstrap</strong>
			        <small className="text-muted">just now</small>
			        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="toast-body">
			        See? Just like this.
			      </div>
			    </div>

			    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
			      <div className="toast-header">
			        <img src="#" className="rounded mr-2" alt="X" />
			        <strong className="mr-auto">Bootstrap</strong>
			        <small className="text-muted">2 seconds ago</small>
			        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="toast-body">
			        Heads up, toasts will stack automatically
			      </div>
			    </div>
			  </div>
			</div>
*/