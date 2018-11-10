import React, { Component } from 'react';

export class MiniMapComponent extends Component{

  handleClick = (event) => {

      this.props.onClick();
      
  }


	render() {
    return(
      <div className="container-fluid"><img
          className="img-fluid"        
          src={this.props.mapImg}
          alt=""
          onClick={this.handleClick}
        /><br /><span>{this.props.map.code}</span></div>
    );
  }
}