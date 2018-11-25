import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
import {ProgressiveTrackerItemComponent} from './ProgressiveTrackerItemComponent';

export class TrackerComponent extends Component{
	render() {
    return(
      <div className="container-fluid tracker-container">
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_slingshot"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_slingshot"], ctrl)}
        	/>
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_strength"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_strength"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bombs"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_bombs"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bombchus"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_bombchus"], ctrl)}
        	/>
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_scale"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_scale"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_boomerang"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_boomerang"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bow"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_bow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_hammer"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_hammer"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_hook"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_hook"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_mirror_shield"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_mirror_shield"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_iron_boots"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_iron_boots"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_hover_boots"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_hover_boots"], ctrl)}
        	/>
        </div>
        <div className="row">       	  	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_dins"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_dins"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_farores"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_farores"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_magic"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_magic"], ctrl)}
        	/>     
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_fire_arrows"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_fire_arrows"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_light_arrows"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_light_arrows"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_lens"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_lens"], ctrl)}
        	/>
        </div>
        <div className="row">
  			<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_gerudo_card"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_gerudo_card"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_tunic_goron"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_tunic_goron"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_tunic_zora"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_tunic_zora"], ctrl)}
        	/>       	
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_bottle"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_bottle"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_kokiri_sword"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_kokiri_sword"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_goron_sword"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_goron_sword"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_claim"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_claim"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["item_stone"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["item_stone"], ctrl)}
        	/>       	
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_mask"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_mask"], ctrl)}
          />
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_wallet"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_wallet"], ctrl)}
          />
          <ProgressiveTrackerItemComponent
            obtainables={this.props.obtainables}
            obtainablesMap={this.props.obtainablesMap}
            progressive={this.props.progressives[this.props.progressivesMap["progressive_item_skulltua"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_item_skulltua"], ctrl)}
          />
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_scarecrow"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_scarecrow"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_zelda"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_zelda"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_epona"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_epona"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_saria"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_saria"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_sun"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_sun"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_time"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_time"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_storm"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_storm"], ctrl)}
        	/>
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_forest"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_forest"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_fire"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_fire"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_water"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_water"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_spirit"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_spirit"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_shadow"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_shadow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["song_light"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["song_light"], ctrl)}
        	/>
        </div>
        <div className="row">       
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_forest"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_forest"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_fire"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_fire"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_water"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_water"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_spirit"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_spirit"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_shadow"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_shadow"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["medallion_light"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["medallion_light"], ctrl)}
        	/>
        	
        </div>
        <div className="row">       
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_forest"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_forest"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_fire"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_fire"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_water"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_water"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_spirit"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_spirit"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_shadow"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_shadow"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_light"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_light"], ctrl)}
        	/>
        	
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_emerald"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["stone_emerald"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_ruby"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["stone_ruby"], ctrl)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[this.props.obtainablesMap["stone_sapphire"]]}
        		obtainablesOnClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap["stone_sapphire"], ctrl)}
        	/>
        </div> 
        <div className="row">       
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_deku"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_deku"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_dodongo"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_dodongo"], ctrl)}
        	/>
        	<ProgressiveTrackerItemComponent
        		progressive={this.props.progressives[this.props.progressivesMap["progressive_dungeon_jabu"]]}
            progressivesOnClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap["progressive_dungeon_jabu"], ctrl)}
        	/>
        	       	
        </div>
      </div>
        
    );
  }
}