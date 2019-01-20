import React, { Component } from 'react';

export class AboutComponent extends Component{


	render() {
		return(
		<p>To "right click", hold ctrl and left click.
         <br />This app is still in development. <a href="https://docs.google.com/forms/d/1b5XYgakDUHQm40OGakSqSVNj4KCCMO2mTimLtLgoTL0" target="_blank" rel="noopener noreferrer">Your feedback is important!</a>
         <br />*Can only guarantee this works in Google Chrome on Desktop/Laptop.*
         </p>
	   );
  }
}