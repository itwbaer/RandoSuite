import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
import {ProgressiveTrackerItemComponent} from './ProgressiveTrackerItemComponent';

export class ObtainableTrackerComponent extends Component{
	render() {
    return(
      <div className="container-fluid tracker-container">
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_slingshot"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_slingshot"], ctrl)}
        	/>
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_strength"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_strength"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bombs"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_bombs"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bombchus"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_bombchus"], ctrl)}
        	/>
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_scale"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_scale"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_boomerang"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_boomerang"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bow"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_bow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_hammer"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_hammer"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_hook"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_hook"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_mirror_shield"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_mirror_shield"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_iron_boots"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_iron_boots"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_hover_boots"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_hover_boots"], ctrl)}
        	/>
        </div>
        <div className="row">       	  	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_dins"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_dins"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_farores"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_farores"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_magic"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_magic"], ctrl)}
        	/>     
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_fire_arrows"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_fire_arrows"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_light_arrows"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_light_arrows"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_lens"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_lens"], ctrl)}
        	/>
        </div>
        <div className="row">
  			<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_gerudo_card"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_gerudo_card"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_tunic_goron"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_tunic_goron"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_tunic_zora"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_tunic_zora"], ctrl)}
        	/>       	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bottle"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_bottle"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_kokiri_sword"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_kokiri_sword"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_goron_sword"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_goron_sword"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_claim"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_claim"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_stone"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["item_stone"], ctrl)}
        	/>       	
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_mask"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_mask"], ctrl)}
          />
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_wallet"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_wallet"], ctrl)}
          />
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_skulltua"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_item_skulltua"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_scarecrow"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_scarecrow"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_zelda"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_zelda"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_epona"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_epona"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_saria"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_saria"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_sun"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_sun"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_time"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_time"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_storm"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_storm"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_forest"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_forest"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_fire"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_fire"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_water"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_water"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_spirit"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_spirit"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_shadow"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_shadow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_light"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["song_light"], ctrl)}
        	/>
        </div>
        <div className="row">       
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_forest"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_forest"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_fire"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_fire"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_water"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_water"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_spirit"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_spirit"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_shadow"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_shadow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_light"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["medallion_light"], ctrl)}
        	/>
        	
        </div>
        <div className="row">       
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_forest"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_forest"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_fire"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_fire"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_water"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_water"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_spirit"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_spirit"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_shadow"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_shadow"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_light"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_light"], ctrl)}
        	/>
        	
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_emerald"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["stone_emerald"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_ruby"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["stone_ruby"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_sapphire"]]}
        		onClick={(ctrl) => this.props.onClick(this.props.obtainablesMap["stone_sapphire"], ctrl)}
        	/>
        </div> 
        <div className="row">       
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_deku"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_deku"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_dodongo"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_dodongo"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_jabu"]]}
            progressiveOnClick={(ctrl) => this.props.progressiveOnClick(this.props.progressivesMap["progressive_dungeon_jabu"], ctrl)}
        	/>
        	       	
        </div>
      </div>
        
    );
  }
}