var Covid_Class = null;

function covidAPI(api_data){

	//Creates the Covid Class Use this to call for data
	var api_class = new Covid(api_data);
    Covid_Class = api_class;

		var countries_list = api_class.countries;
		//Variabel contains the select html tag for this
		var countriesOptions = document.getElementById("selectCountries");
		//Since its a promise you need to use then
		countries_list.then((countries) =>{
			//sort the array
			countries.sort();
			//For each country in that list I create a new option
			countries.forEach((count)=>{
				var options = count[0];
				var selection = document.createElement("option");
				selection.textContent = options;
				selection.value = options;
				countriesOptions.appendChild(selection);
			});
		});


    //Displays the rate of Covid-19 infections around the world
	var sum_array=[];
	var summary= api_class.summary;
	summary.then((data) => {
		console.log(data);
		console.log(Object.keys(data["Countries"]).length);
		console.log(data["Countries"][0]);
		var newcon= data["Global"]["NewConfirmed"];
		var newdeath= data["Global"]["NewDeaths"];
		var newrecovered= data["Global"]["NewRecovered"];
		var TotalConfirmed= data["Global"]["TotalConfirmed"];
		var TotalDeaths= data["Global"]["TotalDeaths"];
		var TotalRecovered= data["Global"]["TotalRecovered"];

		sum_array.push(["NewConfirmed", newcon]);
		sum_array.push(["NewDeaths", newdeath]);
		sum_array.push(["NewRecovered", newrecovered]);
		sum_array.push(["TotalConfirmed", TotalConfirmed]);
		sum_array.push(["TotalDeaths", TotalDeaths]);
		sum_array.push(["TotalRecovered", TotalRecovered]);
		console.log(sum_array);

		sum_data=[];
		for (i=0; i<6; i++){
			sum_data.push({"rate of infections around world" : sum_array[i][0], "number" : sum_array[i][1]})
		}
		console.log(sum_data);

		summary_vis_spec= {
			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
			"description": "A simple bar chart with embedded data.",
			"width": 450,
			"height": 380,
			"data": {
				"values": sum_data
			},
			"mark": "bar",
			"encoding": {
				"x": {"field": "rate of infections around world", "type": "nominal"},
				"y": {"field": "number", "type": "quantitative"}
			}
		};
		vegaEmbed('#countryVis', summary_vis_spec, {actions:false});
	})

}

function CountryVegaSelection(country){
    country_name = country.options[country.selectedIndex].value;
    //country_array = country_name.split(" ");

    var sum_array=[];
	var summary= Covid_Class.summary;
	summary.then((data) => {
		for (i=0; i<Object.keys(data["Countries"]).length; i++){
			if ((country_name) == data["Countries"][i]["Country"]){
				var newcon= data["Countries"][i]["NewConfirmed"];
				var newdeath= data["Countries"][i]["NewDeaths"];
				var newrecovered= data["Countries"][i]["NewRecovered"];
				var TotalConfirmed= data["Countries"][i]["TotalConfirmed"];
				var TotalDeaths= data["Countries"][i]["TotalDeaths"];
				var TotalRecovered= data["Countries"][i]["TotalRecovered"];
			}
		}
		sum_array.push(["NewConfirmed", newcon]);
		sum_array.push(["NewDeaths", newdeath]);
		sum_array.push(["NewRecovered", newrecovered]);
		sum_array.push(["TotalConfirmed", TotalConfirmed]);
		sum_array.push(["TotalDeaths", TotalDeaths]);
		sum_array.push(["TotalRecovered", TotalRecovered]);
		console.log(sum_array);

		part_data=[];
		for (i=0; i<6; i++){
			part_data.push({"positive cases in a particular country" : sum_array[i][0], "number" : sum_array[i][1]})
		}
		console.log(part_data);
		summary_particularvis_spec= {
			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
			"description": "A simple bar chart with embedded data.",
			"width": 450,
			"height": 380,
			"data": {
				"values": part_data
			},
			"mark": "bar",
			"encoding": {
				"x": {"field": "positive cases in a particular country", "type": "nominal"},
				"y": {"field": "number", "type": "quantitative"}
			}
		};
		vegaEmbed('#particularcountryVis', summary_particularvis_spec, {actions:false});
    })

}





$(() => {
	fetch("https://api.covid19api.com/").then((data)=>{
		data.json().then((json)=>{
 			covidAPI(json);
		});
	});


});
