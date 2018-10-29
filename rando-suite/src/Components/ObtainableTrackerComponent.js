import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
export class ObtainableTrackerComponent extends Component{
	render() {
    return(
      <div className="container-fluid tracker-container">
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_slingshot"]]}
        		onClick={() => this.props.onClick(this.props.map["item_slingshot"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_bracelet"]]}
        		onClick={() => this.props.onClick(this.props.map["item_bracelet"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_bombs"]]}
        		onClick={() => this.props.onClick(this.props.map["item_bombs"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_bombchus"]]}
        		onClick={() => this.props.onClick(this.props.map["item_bombchus"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_silver_scale"]]}
        		onClick={() => this.props.onClick(this.props.map["item_silver_scale"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_boomerang"]]}
        		onClick={() => this.props.onClick(this.props.map["item_boomerang"])}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_bow"]]}
        		onClick={() => this.props.onClick(this.props.map["item_bow"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_hammer"]]}
        		onClick={() => this.props.onClick(this.props.map["item_hammer"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_hookshot"]]}
        		onClick={() => this.props.onClick(this.props.map["item_hookshot"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_mirror_shield"]]}
        		onClick={() => this.props.onClick(this.props.map["item_mirror_shield"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_iron_boots"]]}
        		onClick={() => this.props.onClick(this.props.map["item_iron_boots"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_hover_boots"]]}
        		onClick={() => this.props.onClick(this.props.map["item_hover_boots"])}
        	/>
        </div>
        <div className="row">       	  	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_dins"]]}
        		onClick={() => this.props.onClick(this.props.map["item_dins"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_farores"]]}
        		onClick={() => this.props.onClick(this.props.map["item_farores"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_magic"]]}
        		onClick={() => this.props.onClick(this.props.map["item_magic"])}
        	/>     
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_fire_arrows"]]}
        		onClick={() => this.props.onClick(this.props.map["item_fire_arrows"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_light_arrows"]]}
        		onClick={() => this.props.onClick(this.props.map["item_light_arrows"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_lens"]]}
        		onClick={() => this.props.onClick(this.props.map["item_lens"])}
        	/>
        </div>
        <div className="row">
  	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_tunic_goron"]]}
        		onClick={() => this.props.onClick(this.props.map["item_tunic_goron"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_tunic_zora"]]}
        		onClick={() => this.props.onClick(this.props.map["item_tunic_zora"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_letter"]]}
        		onClick={() => this.props.onClick(this.props.map["item_letter"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_bottle"]]}
        		onClick={() => this.props.onClick(this.props.map["item_bottle"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_kokiri_sword"]]}
        		onClick={() => this.props.onClick(this.props.map["item_kokiri_sword"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_goron_sword"]]}
        		onClick={() => this.props.onClick(this.props.map["item_goron_sword"])}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_claim"]]}
        		onClick={() => this.props.onClick(this.props.map["item_claim"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_stone"]]}
        		onClick={() => this.props.onClick(this.props.map["item_stone"])}
        	/>       	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_keaton_mask"]]}
        		onClick={() => this.props.onClick(this.props.map["item_keaton_mask"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_adult_wallet"]]}
        		onClick={() => this.props.onClick(this.props.map["item_adult_wallet"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["item_skulls"]]}
        		onClick={() => this.props.onClick(this.props.map["item_skulls"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_scarecrow"]]}
        		onClick={() => this.props.onClick(this.props.map["song_scarecrow"])}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_zelda"]]}
        		onClick={() => this.props.onClick(this.props.map["song_zelda"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_epona"]]}
        		onClick={() => this.props.onClick(this.props.map["song_epona"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_saria"]]}
        		onClick={() => this.props.onClick(this.props.map["song_saria"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_sun"]]}
        		onClick={() => this.props.onClick(this.props.map["song_sun"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_time"]]}
        		onClick={() => this.props.onClick(this.props.map["song_time"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_storm"]]}
        		onClick={() => this.props.onClick(this.props.map["song_storm"])}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_forest"]]}
        		onClick={() => this.props.onClick(this.props.map["song_forest"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_fire"]]}
        		onClick={() => this.props.onClick(this.props.map["song_fire"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_water"]]}
        		onClick={() => this.props.onClick(this.props.map["song_water"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_spirit"]]}
        		onClick={() => this.props.onClick(this.props.map["song_spirit"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_shadow"]]}
        		onClick={() => this.props.onClick(this.props.map["song_shadow"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["song_light"]]}
        		onClick={() => this.props.onClick(this.props.map["song_light"])}
        	/>
        </div>
        <div className="row">       
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_forest"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_forest"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_fire"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_fire"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_water"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_water"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_spirit"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_spirit"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_shadow"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_shadow"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["medallion_light"]]}
        		onClick={() => this.props.onClick(this.props.map["medallion_light"])}
        	/>
        	
        </div>
        <div className="row">       
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["stone_emerald"]]}
        		onClick={() => this.props.onClick(this.props.map["stone_emerald"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["stone_ruby"]]}
        		onClick={() => this.props.onClick(this.props.map["stone_ruby"])}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.map["stone_sapphire"]]}
        		onClick={() => this.props.onClick(this.props.map["stone_sapphire"])}
        	/>
        </div> 
        <div className="row">       
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	<div className="col">
        		???
        	</div>
        	       	
        </div>
      </div>
        
    );
  }
}