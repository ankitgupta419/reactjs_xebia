import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OnePlanetContent from './OnePlanetContent';
import SearchResultContent from './SearchResultContent';
// import { default as Input } from 'react-bootstrap';
import {default as If} from './If';
import * as jwt from 'jsonwebtoken'; 

class Homepage extends Component{
	constructor(props){
		super(props);
		this.state={
		 	allPlanets:[],
		 	searchValue:'',
		 	show:false,
		 	planetContent:[],
		 	nextApiCall:'',
		 	onePlanet:{},
		 	showOnePlanet:false,
			showSearchResult:false,
			noResult:false,
			loggedUser: {},
			searchLabel: '',
			searchDisable: false,
			popUpSearch:false
		}
		this.input = this.input.bind(this);
		this.callSearch = this.callSearch.bind(this);
		this.seeMore = this.seeMore.bind(this);
		this.addPlanets = this.addPlanets.bind(this); 
		this.showAllPlanetsResults = this.showAllPlanetsResults.bind(this); 
		this.allSearchResultMore = this.allSearchResultMore.bind(this); 
		this.allSearchRes = this.allSearchRes.bind(this); 
		this.closePopUp = this.closePopUp.bind(this); 
		
	}
	componentWillMount(){
		let loggedUser = jwt.decode(sessionStorage.getItem('loggedUser'));
		this.setState({loggedUser: loggedUser});
	}
	input(e){
      let self=this
      let searchValue=this.refs.searchInput.value;
      
      if(searchValue ==''){
      	this.setState({
        	show:false,
        	searchValue:searchValue,
        	allPlanets:[]
      	})
      }
      else{
      	this.setState({
        	show:true,
        	searchValue:searchValue,
        	allPlanets:[]
      	},function(){
      		this.callSearch(self.state.searchValue,self.state.allPlanets)
      	})
      }
      
    }
	callSearch(searchValue,allPlanets){
		var self=this
		axios.get('http://swapi.co/api/planets/?search='+searchValue)
		  	.then(function (response) {
			    // console.log("start",response)
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
		    		allPlanets.push(planetInfo)
			    }
		    	
		    	self.setState({
		    		allPlanets:allPlanets,
		    		nextApiCall:response.data.next
		    	})
		  	})
		  	.catch(function (error) {
	 	    	console.log(error);
			});
	}
	seeMore(){
		var self=this;
		var nextApiCall=self.state.nextApiCall
		if(nextApiCall!=null){
			
			var allPlanets=self.state.allPlanets
			axios.get(nextApiCall)
			  .then(function (response) {
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
			    	allPlanets.push(planetInfo)
			    }
			    self.setState({
			    	allPlanets:allPlanets,
			    	nextApiCall:response.data.next
			    },function(){
			    	self.seeMore();
			    }) 
			  })
			  .catch(function (error) {
			    console.log(error);
			});
		}
	}

	addPlanets(item){
		var self=this
		var onePlanet=this.state.onePlanet		
		this.setState({
			onePlanet:item,
			show:false,
			showOnePlanet:true,
			showSearchResult:false,
			noResult:false
		})
		
	}
	showAllPlanetsResults(event){
			// console.log(event.target.value)
		var SearchVal=event.target.value
		var self=this
		if(event.charCode==13){
			let searchHandler = JSON.parse(sessionStorage.getItem('searchHandler')),
				loggedUser = this.state.loggedUser, currentEpochTime = Math.floor(new Date() / 1000);
			if(searchHandler!=null && searchHandler.exp>currentEpochTime){
				if(searchHandler.count >= 15 && loggedUser.name != "Luke Skywalker"){
					this.setState({searchDisable: true,popUpSearch:true})
				}else{
					searchHandler.count = searchHandler.count+1;
					sessionStorage.setItem('searchHandler', JSON.stringify(searchHandler));
					this.setState({searchDisable: false});
				}
			}else{
				searchHandler = {
					count: 1, exp: Math.floor(Date.now() / 1000) + 60
				}
				sessionStorage.setItem('searchHandler', JSON.stringify(searchHandler));
				this.setState({searchDisable: false});
			}
			if(!this.state.searchDisable){
				this.setState({
					planetContent:[],
					show:false,
					showOnePlanet:false,
					showSearchResult:true,
					searchLabel: SearchVal
				},function(){
					self.allSearchRes(SearchVal,self.state.planetContent)
				})
	        }
	    }
        	
    }
   	allSearchRes(searchValue,planetContent){
		var self=this
		axios.get('http://swapi.co/api/planets/?search='+searchValue)
		  	.then(function (response) {
			    // console.log("start",response)
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
		    		planetContent.push(planetInfo)
			    }
		    	
		    	// console.log(response.data.count)
		    	if(response.data.count==0){
		    		self.setState({
		    			noResult:true
		    			
			    	})
		    	}
		    	else{
		    		
		    		self.setState({
		    			planetContent:planetContent,
		    			nextApiCall:response.data.next,
		    			noResult:false
			    	},function(){
			    		self.allSearchResultMore();
			    	})
		    	}
		    	
		  	})
		  	.catch(function (error) {
	 	    	console.log(error);
			});
	}
	allSearchResultMore(){
		var self=this;
		var nextApiCall=self.state.nextApiCall
		if(nextApiCall!=null){
			
			var planetContent=self.state.planetContent
			axios.get(nextApiCall)
			  .then(function (response) {
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
			    	planetContent.push(planetInfo)
			    }
			    self.setState({
			    	planetContent:planetContent,
			    	nextApiCall:response.data.next
			    },function(){
			    	self.allSearchResultMore();
			    }) 
			  })
			  .catch(function (error) {
			    console.log(error);
			});
		}
	}
	logOut(){
		sessionStorage.removeItem('loggedUser');
		sessionStorage.removeItem('searchHandler');
		browserHistory.push('/login');
	}
	
	closePopUp(){
		this.setState({
			popUpSearch:false
		})
	}
	render(){
		// console.log(this.state.searchValue)
		var self=this
		var allPlanets=JSON.parse(JSON.stringify(self.state.allPlanets))
		const searchRes=allPlanets.map(function(item,i){                 
            return( 
              <div className="searchResultLabel" onClick={self.addPlanets.bind(this,item)} key={i}>{item.name}</div>
            )
         })

		return(
			<div className="searchResultsData">
				<div className="loginProfile">
					<div className="userName">Hi {this.state.loggedUser.name}</div>
					
					<button type="button" className="btn btn-danger logoutButton" onClick={self.logOut}><Glyphicon glyph="log-out"/> Logout</button>
					{/*<div className="logoutOption"><Glyphicon glyph="log-out"/> logout </div>*/}
					<div className="clr"></div>
				</div>
		        <br/>
		        <div className="searchBoxLabel">
					<input className="searchBox" ref="searchInput" type="text" placeholder="Search planets" onChange={this.input} onKeyPress={this.showAllPlanetsResults} />
					<span className="searchIcon">
					    <Glyphicon glyph="search"/>
					 </span>
				 </div>
				<If test={self.state.show}>
 					<div className="searchResultContainer">
	 					<div >{searchRes}</div>
	 					<If test={self.state.nextApiCall != null}>
		                	<div className="searchResultLabelEnd" onClick={self.seeMore}>See All Results for {self.state.searchValue}</div>
		                </If>
		                <If test={self.state.nextApiCall == null}>
		                	<div className="searchResultLabelEnd">That's All Folks</div>
		                </If>	
 					</div>
	 			</If>
	 			<If test={self.state.popUpSearch}>
					<div className="popUp">
						<div className="popUpLabel">You can search only 15 times in 60 seconds</div>
						<button className="popUpButton" onClick={this.closePopUp}>Ok</button>
					</div>
				</If>		
				<br/>
				<br/> 
				<If test={self.state.showOnePlanet && self.state.searchDisable==false}>
					<OnePlanetContent onePlanet={this.state.onePlanet}/>
				</If>
				<If test={self.state.showSearchResult}>
					<SearchResultContent searchValue={this.state.searchLabel} planetContent={this.state.planetContent} noResult={self.state.noResult}/>
				</If>
				
				
				 
				
			</div>
		);
	}
}
export default Homepage;