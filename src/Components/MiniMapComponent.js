import React, { Component } from 'react';

export class MiniMapComponent extends Component{

  handleClick = (event) => {

      this.props.onClick();
      
  }


	render() {
    return(
      <div className="container-fluid noselect"><img
          className="img-fluid noselect"        
          src={this.props.map.image.src}
          alt=""
          onClick={this.handleClick}
        /><br /><span className="noselect">{this.props.map.name}{"count" in this.props.map ? `(${this.props.map.count})` : ""}</span></div>
    );
  }
}