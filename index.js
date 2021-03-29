//Global Variable to keep the class
var Covid_Class = null;

function covidAPI(api_data){

	//Creates the Covid Class Use this to call for data
	var api_class = new Covid(api_data);
	Covid_Class = api_class;

	//Calls the method countries and returns a promise 
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


}

//2020-03-01T00:00:00Z how the date must look like
function CountrySelection(){

	var first_date_input = new Date($(`#startDate`).val() + "T00:00:00Z");
	//var first_day = first_date_input.toUTCString()

	var second_date_input = new Date($(`#endDate`).val() + "T00:00:00Z");
	//var second_day = second_date_input.toUTCString();

	var country_name = $(`#selectCountries`).find(":selected").text();

	
	var first = first_date_input.getUTCFullYear() + "-" + ("0" + (first_date_input.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + first_date_input.getUTCDate()).slice(-2) + "T00:00:00Z";
	var second = second_date_input.getUTCFullYear() + "-" + ("0" + (second_date_input.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + second_date_input.getUTCDate()).slice(-2) + "T00:00:00Z";
	
	
	
	var countries_list_link = Covid_Class.countries;
	var path = null;
	var path = countries_list_link.then((data) =>{
			
			for(var i = 0; i < data.length;i++){
				if(data[i][0] == country_name){
					return path = data[i][1];
				}
			}
		})
	
	var promise_Result = path.then((data)=>{
	 	return Covid_Class.currentCases(path,first,second);
	 })
	
	promise_Result.then((data)=>{
		$("#table tr#temp").remove();
		for(var i = 0; i < data.length;i++){

			var tempDate = new Date(data[i]["Date"]);
			var dateString = tempDate.getUTCFullYear() + "-" + ("0" + (tempDate.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + tempDate.getUTCDate()).slice(-2);
			
			var markup = "<tr id = 'temp'> <th>" + dateString + "</th><th>" + data[i]["Cases"] + "</th><th>";
			
			if(i == 0){
				markup += 0 + "</th>";
			}

			else{
				markup += (data[i]["Cases"] - data[i-1]["Cases"]) + "</th>";
			}
			$("table").append(markup);
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
