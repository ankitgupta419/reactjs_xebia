import React from 'react';
import {default as If} from './If';
export default function(props){
  		var max = -Infinity,key;
		props.planetContent.forEach(function (v, k) { 
		    if (max < +v.population) { 
		        max = +v.population; 
		        key = k; 
		    }
		});
		// console.log(key)
		const Planets=props.planetContent.map(function(item,i){                 
            if(i==key){
            	return( 
	              <div key={i} className="planetContent">
	              	<div className="planetName bigFont">Planet : {item.name}</div>
	                <div className="planetPopulation bigFont">Population : {item.population}</div>
	              </div>
	            )
            }
            else{
            	return( 
	              <div key={i} className="planetContent">
	              	<div className="planetName">Planet : {item.name}</div>
	                <div className="planetPopulation">Population : {item.population}</div>
	              </div>
	            )
            }
            
          })
          // console.log(props.noResult)
  	return (
			<div>
			<h2 className="text-center">Results for {props.searchValue}</h2>
			<br/>
			<div>{Planets}</div>
			<div className="clr"></div>
			<If test={props.noResult}>
					<h2>No Results Found</h2>
			</If> 
		</div>)
}


					