class Covid {
	constructor(data_json){
		this.data = data_json;
		this.base_url = "https://api.covid19api.com"
	}

	get baseUrl(){
		return this.base_url;
	}

	get allData(){
		return this.data;
	}

	//returns a promise that contains an array of countries
	get countries(){
		return this.sendRequest(this.data["countriesRoute"]["Path"]).then(data => {
			console.log(data)
			return data.map(country =>{
				return [country["Country"],country["Slug"]];
			})
		})		
	}

	get summary(){
		var url= this.base_url+ "/summary"
		return fetch(url)
		.then(result => result.json())
		.then(data => {
			return data;
		})
	}

	//returns a promise of teh cases by date
	//Example: https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
	currentCases(country,from,to){
		console.log(country);
		var url = this.base_url + "/total/country/" + country + "/status/confirmed?from=" + from + "&to=" + to;
		console.log(url)

		return fetch(url)
			.then(result => result.json())
			.then(data =>{
				console.log(data)
				return data;
			})
	}

	topCountriesConfirmed(){
		return this.summary.then(data =>{
			return data["Countries"].sort(function(a,b){return b["TotalConfirmed"] - a["TotalConfirmed"]});
		})
	}

	topCountriesDeaths(){
		return this.summary.then(data =>{
			return data["Countries"].sort(function(a,b){return b["TotalDeaths"] - a["TotalDeaths"]});
		})
	}

	topCountriesRecovered(){
		return this.summary.then(data =>{
			return data["Countries"].sort(function(a,b){return b["TotalRecovered"] - a["TotalRecovered"]});
		})
	}


	//use this to send a request
	sendRequest(endpoint){
		var url = this.base_url+endpoint;
		return fetch(url)
			.then(result => result.json())
			.then(data =>{
				return data;
			})

	}






}