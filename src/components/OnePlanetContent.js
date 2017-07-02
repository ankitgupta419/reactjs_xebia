import React from 'react';
export default function(props){
    return (
      <div className="onePlanetContent">
          	<div className="onePlanetName">Planet : {props.onePlanet.name}</div>
            <div className="onePlanetPopulation">Population : {props.onePlanet.population}</div>
      	</div>   
    );
			
}