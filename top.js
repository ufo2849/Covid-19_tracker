//Global Variable to keep the class
var Covid_Class = null;

function covidAPI(api_data){

	//Creates the Covid Class Use this to call for data
	var api_class = new Covid(api_data);
	Covid_Class = api_class;
	//console.log(api_class.topCountries);
}

function NumberSelection(number){
	var numberSelected = number.options[number.selectedIndex].value;

	Covid_Class.topCountriesConfirmed().then(data =>{
		$("#tableTop tr#temp").remove()
		for(var i = 0; i<parseInt(numberSelected); i++){
			console.log(data)
			var markup = "<tr id = 'temp'> <th>"+ (i+1) +"</th><th>" + data[i]["Country"] + "</th><th>" + data[i]["TotalConfirmed"] + "</th><th>" + data[i]["TotalDeaths"] + "</th><th>" + data[i]["TotalRecovered"] +"</th></tr>";
			$("#tableTop").append(markup);
		}
	})
}

function NumberSelection2(number){
	var numberSelected = number.options[number.selectedIndex].value;

	Covid_Class.topCountriesDeaths().then(data =>{
		$("#tableTop tr#temp").remove()
		for(var i = 0; i<parseInt(numberSelected); i++){
			console.log(data)
			var markup = "<tr id = 'temp'> <th>"+ (i+1) +"</th><th>" + data[i]["Country"] + "</th><th>" + data[i]["TotalConfirmed"] + "</th><th>" + data[i]["TotalDeaths"] + "</th><th>" + data[i]["TotalRecovered"] +"</th></tr>";
			$("#tableTop").append(markup);
		}
	})
}

function NumberSelection3(number){
	var numberSelected = number.options[number.selectedIndex].value;

	Covid_Class.topCountriesRecovered().then(data =>{
		$("#tableTop tr#temp").remove()
		for(var i = 0; i<parseInt(numberSelected); i++){
			console.log(data)
			var markup = "<tr id = 'temp'> <th>"+ (i+1) +"</th><th>" + data[i]["Country"] + "</th><th>" + data[i]["TotalConfirmed"] + "</th><th>" + data[i]["TotalDeaths"] + "</th><th>" + data[i]["TotalRecovered"] +"</th></tr>";
			$("#tableTop").append(markup);
		}
	})
}

$(() => {
	fetch("https://api.covid19api.com/").then((data)=>{
		data.json().then((json)=>{
 			covidAPI(json);
		});		
	});
	

});
