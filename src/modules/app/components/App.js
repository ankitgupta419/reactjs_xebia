import React from 'react';
import { Link, withRouter } from 'react-router';

export default withRouter(React.createClass({

  componentWillMount(){
   if(!this.props.children){
      this.props.router.replace('/login');
   } 
  },
  render(){
    var self=this;
     
    if(this.props.children){
      var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child)
      })
      return (
        <div className="App">
          
          <section>
            {children}
          </section>
        </div> 
      ) 
    }else{
      return <div>xebia</div>
    }
    
  }
 
}));
