import React, { Component } from 'react';

export class OptionsComponent extends Component{

  getOptions(){
    let options = [];
    for(let i = 0; i < this.props.options.length; i++){
      let option = this.props.options[i];
      let view = this.props.views[option];
      options.push(
                    <button
                      key={"option-"+ view}
                      type="button"
                      className={"btn " + (this.props.activeView === view ? "btn-success" : "btn-light")}
                      onClick={() => this.props.onClick(view)}>
                      {option}
                    </button>
                    );

      if(i < this.props.options.length - 1){
        options.push(<span key={"space-"+ view} className="space"></span>);
      }
      
    }

    return options;
  }


	render() {
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          {this.getOptions()}
        </div>
        
      </div>
    );
  }
}