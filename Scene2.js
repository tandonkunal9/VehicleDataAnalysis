let url = window.location.href;
let params = (new URL(url)).searchParams;

var selectedBrand = params.get('selectedBrand');



async function init(selectedBrand,eventType){
	
	//const chartData = await d3.csv('https://tandonkunal9.github.io/VehicleDataAnalysis/cars2017.csv');
	const chartData = await d3.csv('https://tandonkunal9.github.io/VehicleDataAnalysis/Cars2021V1.csv');
	opts = [{
      	  "captions": [{ "Acura": "Acura", "BMW": "BMW" }],
        	"color": [{ 'Acura' : '#BEBD7F','Alfa Romeo' : '#C2B078','Aston Martin' : '#C6A664','Audi' : '#E5BE01','Bentley' : '#CDA434','BMW' : '#A98307','Buick' : '#E4A010','Cadillac' : '#DC9D00','Chevrolet' : '#8A6642','Chrysler' : '#C7B446','Dodge' : '#EAE6CA','Ferrari' : '#E1CC4F','Fiat' : '#E6D690','Ford' : '#EDFF21','Genesis' : '#F5D033','GMC' : '#F8F32B','Honda' : '#9E9764','Hyundai' : '#999950','Infiniti' : '#F3DA0B','Jaguar' : '#FAD201','Jeep' : '#AEA04B','Kia' : '#FFFF00','Lamborghini' : '#9D9101','Land Rover' : '#F4A900','Lexus' : '#D6AE01','Lincoln' : '#F3A505','Lotus' : '#EFA94A','Maserati' : '#6A5D4D','Mazda' : '#705335','McLaren Automotive' : '#F39F18','Mercedes-Benz' : '#ED760E','MINI' : '#C93C20','Mitsubishi' : '#CB2821','Nissan' : '#FF7514','Porsche' : '#F44611','Ram' : '#FF2301','Rolls-Royce' : '#FFA420','Roush Performance' : '#F75E25','smart' : '#F54021','Subaru' : '#D84B20','Tesla' : '#EC7C26','Toyota' : '#E55137','Volkswagen' : '#C35831','Volvo' : '#AF2B1E' }],
        	"xaxis": "Make",
        	"yaxis": "Number",
		"engineCylOptions":[0,2,4,6,12]
		
    	}]
	if(eventType == "OnLoad"){
		GetBrandSpecificData(chartData,selectedBrand,opts);
		GetRatedHorsePowerDetails(chartData,selectedBrand,document.getElementById("myRange").value);
	}
	if(eventType == "OnSlide"){
		GetRatedHorsePowerDetails(chartData,selectedBrand,document.getElementById("myRange").value);
	}
}

function GetRatedHorsePowerDetails(chartData,selectedBrand,ratedHp){
	var finalResultHP = [];var resultGasoline = [];var resultDiesel = [];var resultElectricity = [];
	var noOfRatedHPGasCars = 0;var noOfRatedHPDieselCars = 0;var noOfRatedHPElectricCars = 0;
		for(k=0;k<chartData.length;k++)
		{
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Gasoline" )
			{				 
				 resultGasoline.push(chartData[k]);			
		      	}
				
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Diesel" )
			{
				 
				 resultDiesel.push(chartData[k]);			
		      	}
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Electricity" )
			{
				 
				 resultElectricity.push(chartData[k]);			
		      	}
		}
		for(var i=0;i<resultGasoline.length;i++)
		{
			if(Number(resultGasoline[i]["Rated Horsepower"]) <= Number(ratedHp)){
				noOfRatedHPGasCars = noOfRatedHPGasCars + 1;			
			} 
		}
		for(var i=0;i<resultDiesel.length;i++)
		{
			if(Number(resultDiesel[i]["Rated Horsepower"]) <= Number(ratedHp)){
				noOfRatedHPDieselCars = noOfRatedHPDieselCars + 1;				
			} 
		}
		for(var i=0;i<resultElectricity.length;i++)
		{
			if(Number(resultElectricity[i]["Rated Horsepower"]) <= Number(ratedHp)){
				noOfRatedHPElectricCars = noOfRatedHPElectricCars + 1;				
			} 
		}
		var item = {};item["group"] = "Gasoline";item["value"] = noOfRatedHPGasCars;finalResultHP.push(item);
		item = {};item["group"] = "Diesel";item["value"] = noOfRatedHPDieselCars;finalResultHP.push(item);
		item = {};item["group"] = "Electric";item["value"] = noOfRatedHPElectricCars;finalResultHP.push(item);
		console.log(finalResultHP);
		//BrandSpecificBarChart(finalResultHP,"subGraphHP");
		ratedHpGraph(finalResultHP,"subGraphHP");
}



function GetBrandSpecificData(chartData,selectedBrand,opts){
	
	var resultGasoline = [];var resultDiesel = [];var resultElectricity = [];
	var finalResultGasoline = [];var finalResultDiesel = [];var finalResultElectricity = [];
	var finalResultHP = [];
		for(k=0;k<chartData.length;k++)
		{
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Gasoline" )
			{				 
				 resultGasoline.push(chartData[k]);			
		      	}
				
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Diesel" )
			{
				 
				 resultDiesel.push(chartData[k]);			
		      	}
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Electricity" )
			{
				 
				 resultElectricity.push(chartData[k]);			
		      	}
		}

	var noOf0CylCars = 0;var noOf2CylCars = 0;var noOf3CylCars = 0;var noOf4CylCars = 0;var noOf6CylCars = 0;var noOf8CylCars = 0;var noOf10CylCars = 0; noOf12CylCars = 0;
	var Cyl0AvgInCity = 0;var Cyl2AvgInCity = 0;var Cyl3AvgInCity = 0;var Cyl4AvgInCity = 0;var Cyl6AvgInCity = 0;var Cyl8AvgInCity = 0;var Cyl10AvgInCity = 0;var Cyl12AvgInCity = 0;
	var Cyl0AvgInHwy = 0;var Cyl2AvgInHwy = 0;var Cyl3AvgInHwy = 0;var Cyl4AvgInHwy = 0;var Cyl6AvgInHwy = 0;var Cyl8AvgInHwy = 0;var Cyl10AvgInHwy = 0;var Cyl12AvgInHwy = 0;
	var noOfRatedHPGasCars = 0;var noOfRatedHPDieselCars = 0;var noOfRatedHPElectricCars = 0;
	for(var i=0;i<resultGasoline.length;i++)
		{			
			if(resultGasoline[i].EngineCylinders == "0"){
				noOf0CylCars = noOf0CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl0AvgInHwy = Cyl0AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "2"){
				noOf2CylCars = noOf2CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl2AvgInHwy = Cyl2AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "3"){
				noOf3CylCars = noOf3CylCars + 1;
				Cyl3AvgInCity = Cyl3AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl3AvgInHwy = Cyl3AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "4"){
				noOf4CylCars = noOf4CylCars + 1;
				Cyl4AvgInCity = Cyl4AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl4AvgInHwy = Cyl4AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "6"){
				noOf6CylCars = noOf6CylCars + 1;
				Cyl6AvgInCity = Cyl6AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl6AvgInHwy = Cyl6AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "8"){
				noOf8CylCars = noOf8CylCars + 1;
				Cyl8AvgInCity = Cyl8AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl8AvgInHwy = Cyl8AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
			if(resultGasoline[i].EngineCylinders == "12"){
				noOf12CylCars = noOf12CylCars + 1;
				Cyl12AvgInCity = Cyl12AvgInCity + Number(resultGasoline[i].AverageCityMPG);
				Cyl12AvgInHwy = Cyl12AvgInHwy + Number(resultGasoline[i].AverageHighwayMPG);
			}
		}  
			Cyl0AvgInCity = Cyl0AvgInCity > 0 ? (Cyl0AvgInCity / noOf0CylCars):0;
			Cyl2AvgInCity = Cyl2AvgInCity > 0 ? (Cyl2AvgInCity / noOf2CylCars):0;
			Cyl3AvgInCity = Cyl3AvgInCity > 0 ? (Cyl3AvgInCity / noOf3CylCars):0;
			Cyl4AvgInCity = Cyl4AvgInCity > 0 ? (Cyl4AvgInCity / noOf4CylCars):0;
			Cyl6AvgInCity = Cyl6AvgInCity > 0 ? (Cyl6AvgInCity / noOf6CylCars):0;
			Cyl8AvgInCity = Cyl8AvgInCity > 0 ? (Cyl8AvgInCity / noOf8CylCars):0;
			Cyl12AvgInCity = Cyl12AvgInCity > 0 ? (Cyl12AvgInCity / noOf12CylCars):0;
			
			Cyl0AvgInHwy = Cyl0AvgInHwy > 0 ? (Cyl0AvgInHwy / noOf0CylCars):0;
			Cyl2AvgInHwy = Cyl2AvgInHwy > 0 ? (Cyl2AvgInHwy / noOf2CylCars):0;
			Cyl3AvgInHwy = Cyl3AvgInHwy > 0 ? (Cyl3AvgInHwy / noOf3CylCars):0;
			Cyl4AvgInHwy = Cyl4AvgInHwy > 0 ? (Cyl4AvgInHwy / noOf4CylCars):0;
			Cyl6AvgInHwy = Cyl6AvgInHwy > 0 ? (Cyl6AvgInHwy / noOf6CylCars):0;
			Cyl8AvgInHwy = Cyl8AvgInHwy > 0 ? (Cyl8AvgInHwy / noOf8CylCars):0;
			Cyl12AvgInHwy = Cyl12AvgInHwy > 0 ? (Cyl12AvgInHwy / noOf12CylCars):0;
			var item = {};item["group"] = 0;item["AverageCityMPG"] = Cyl0AvgInCity;item["AverageHighwayMPG"] = Cyl0AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 2;item["AverageCityMPG"] = Cyl2AvgInCity;item["AverageHighwayMPG"] = Cyl2AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 3;item["AverageCityMPG"] = Cyl3AvgInCity;item["AverageHighwayMPG"] = Cyl3AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 4;item["AverageCityMPG"] = Cyl4AvgInCity;item["AverageHighwayMPG"] = Cyl4AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 6;item["AverageCityMPG"] = Cyl6AvgInCity;item["AverageHighwayMPG"] = Cyl6AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 8;item["AverageCityMPG"] = Cyl8AvgInCity;item["AverageHighwayMPG"] = Cyl8AvgInHwy;finalResultGasoline.push(item);
			item = {};item["group"] = 12;item["AverageCityMPG"] = Cyl12AvgInCity;item["AverageHighwayMPG"] = Cyl12AvgInHwy;finalResultGasoline.push(item);
			
			
	
	var noOf0CylCars = 0;var noOf2CylCars = 0;var noOf3CylCars = 0;var noOf4CylCars = 0;var noOf6CylCars = 0;var noOf8CylCars = 0;var noOf10CylCars = 0; noOf12CylCars = 0;
	var Cyl0AvgInCity = 0;var Cyl2AvgInCity = 0;var Cyl3AvgInCity = 0;var Cyl4AvgInCity = 0;var Cyl6AvgInCity = 0;var Cyl8AvgInCity = 0;var Cyl10AvgInCity = 0;var Cyl12AvgInCity = 0;
	var Cyl0AvgInHwy = 0;var Cyl2AvgInHwy = 0;var Cyl3AvgInHwy = 0;var Cyl4AvgInHwy = 0;var Cyl6AvgInHwy = 0;var Cyl8AvgInHwy = 0;var Cyl10AvgInHwy = 0;var Cyl12AvgInHwy = 0;
	for(var i=0;i<resultDiesel.length;i++)
		{			
			if(resultDiesel[i].EngineCylinders == "0"){
				noOf0CylCars = noOf0CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl0AvgInHwy = Cyl0AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "2"){
				noOf2CylCars = noOf2CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl2AvgInHwy = Cyl2AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "3"){
				noOf3CylCars = noOf3CylCars + 1;
				Cyl3AvgInCity = Cyl3AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl3AvgInHwy = Cyl3AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "4"){
				noOf4CylCars = noOf4CylCars + 1;
				Cyl4AvgInCity = Cyl4AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl4AvgInHwy = Cyl4AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "6"){
				noOf6CylCars = noOf6CylCars + 1;
				Cyl6AvgInCity = Cyl6AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl6AvgInHwy = Cyl6AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "8"){
				noOf8CylCars = noOf8CylCars + 1;
				Cyl8AvgInCity = Cyl8AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl8AvgInHwy = Cyl8AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			if(resultDiesel[i].EngineCylinders == "12"){
				noOf12CylCars = noOf12CylCars + 1;
				Cyl12AvgInCity = Cyl12AvgInCity + Number(resultDiesel[i].AverageCityMPG);
				Cyl12AvgInHwy = Cyl12AvgInHwy + Number(resultDiesel[i].AverageHighwayMPG);
			}
			
		}  
			Cyl0AvgInCity = Cyl0AvgInCity > 0 ? (Cyl0AvgInCity / noOf0CylCars):0;
			Cyl2AvgInCity = Cyl2AvgInCity > 0 ? (Cyl2AvgInCity / noOf2CylCars):0;
			Cyl3AvgInCity = Cyl3AvgInCity > 0 ? (Cyl3AvgInCity / noOf3CylCars):0;
			Cyl4AvgInCity = Cyl4AvgInCity > 0 ? (Cyl4AvgInCity / noOf4CylCars):0;
			Cyl6AvgInCity = Cyl6AvgInCity > 0 ? (Cyl6AvgInCity / noOf6CylCars):0;
			Cyl8AvgInCity = Cyl8AvgInCity > 0 ? (Cyl8AvgInCity / noOf8CylCars):0;
			Cyl12AvgInCity = Cyl12AvgInCity > 0 ? (Cyl12AvgInCity / noOf12CylCars):0;
			
			Cyl0AvgInHwy = Cyl0AvgInHwy > 0 ? (Cyl0AvgInHwy / noOf0CylCars):0;
			Cyl2AvgInHwy = Cyl2AvgInHwy > 0 ? (Cyl2AvgInHwy / noOf2CylCars):0;
			Cyl3AvgInHwy = Cyl3AvgInHwy > 0 ? (Cyl3AvgInHwy / noOf3CylCars):0;
			Cyl4AvgInHwy = Cyl4AvgInHwy > 0 ? (Cyl4AvgInHwy / noOf4CylCars):0;
			Cyl6AvgInHwy = Cyl6AvgInHwy > 0 ? (Cyl6AvgInHwy / noOf6CylCars):0;
			Cyl8AvgInHwy = Cyl8AvgInHwy > 0 ? (Cyl8AvgInHwy / noOf8CylCars):0;
			Cyl12AvgInHwy = Cyl12AvgInHwy > 0 ? (Cyl12AvgInHwy / noOf12CylCars):0;
			var item = {};item["group"] = 0;item["AverageCityMPG"] = Cyl0AvgInCity;item["AverageHighwayMPG"] = Cyl0AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 2;item["AverageCityMPG"] = Cyl2AvgInCity;item["AverageHighwayMPG"] = Cyl2AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 3;item["AverageCityMPG"] = Cyl3AvgInCity;item["AverageHighwayMPG"] = Cyl3AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 4;item["AverageCityMPG"] = Cyl4AvgInCity;item["AverageHighwayMPG"] = Cyl4AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 6;item["AverageCityMPG"] = Cyl6AvgInCity;item["AverageHighwayMPG"] = Cyl6AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 8;item["AverageCityMPG"] = Cyl8AvgInCity;item["AverageHighwayMPG"] = Cyl8AvgInHwy;finalResultDiesel.push(item);
			item = {};item["group"] = 12;item["AverageCityMPG"] = Cyl12AvgInCity;item["AverageHighwayMPG"] = Cyl12AvgInHwy;finalResultDiesel.push(item);
			
			
			
	var noOf0CylCars = 0;var noOf2CylCars = 0;var noOf3CylCars = 0;var noOf4CylCars = 0;var noOf6CylCars = 0;var noOf8CylCars = 0;var noOf10CylCars = 0; noOf12CylCars = 0;
	var Cyl0AvgInCity = 0;var Cyl2AvgInCity = 0;var Cyl3AvgInCity = 0;var Cyl4AvgInCity = 0;var Cyl6AvgInCity = 0;var Cyl8AvgInCity = 0;var Cyl10AvgInCity = 0;var Cyl12AvgInCity = 0;
	var Cyl0AvgInHwy = 0;var Cyl2AvgInHwy = 0;var Cyl3AvgInHwy = 0;var Cyl4AvgInHwy = 0;var Cyl6AvgInHwy = 0;var Cyl8AvgInHwy = 0;var Cyl10AvgInHwy = 0;var Cyl12AvgInHwy = 0;
	for(var i=0;i<resultElectricity.length;i++)
		{			
			if(resultElectricity[i].EngineCylinders == "0"){
				noOf0CylCars = noOf0CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl0AvgInHwy = Cyl0AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "2"){
				noOf2CylCars = noOf2CylCars + 1;
				Cyl0AvgInCity = Cyl0AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl2AvgInHwy = Cyl2AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "3"){
				noOf3CylCars = noOf3CylCars + 1;
				Cyl3AvgInCity = Cyl3AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl3AvgInHwy = Cyl3AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "4"){
				noOf4CylCars = noOf4CylCars + 1;
				Cyl4AvgInCity = Cyl4AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl4AvgInHwy = Cyl4AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "6"){
				noOf6CylCars = noOf6CylCars + 1;
				Cyl6AvgInCity = Cyl6AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl6AvgInHwy = Cyl6AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "8"){
				noOf8CylCars = noOf8CylCars + 1;
				Cyl8AvgInCity = Cyl8AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl8AvgInHwy = Cyl8AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			if(resultElectricity[i].EngineCylinders == "12"){
				noOf12CylCars = noOf12CylCars + 1;
				Cyl12AvgInCity = Cyl12AvgInCity + Number(resultElectricity[i].AverageCityMPG);
				Cyl12AvgInHwy = Cyl12AvgInHwy + Number(resultElectricity[i].AverageHighwayMPG);
			}
			
		}  
			Cyl0AvgInCity = Cyl0AvgInCity > 0 ? (Cyl0AvgInCity / noOf0CylCars):0;
			Cyl2AvgInCity = Cyl2AvgInCity > 0 ? (Cyl2AvgInCity / noOf2CylCars):0;
			Cyl3AvgInCity = Cyl3AvgInCity > 0 ? (Cyl3AvgInCity / noOf3CylCars):0;
			Cyl4AvgInCity = Cyl4AvgInCity > 0 ? (Cyl4AvgInCity / noOf4CylCars):0;
			Cyl6AvgInCity = Cyl6AvgInCity > 0 ? (Cyl6AvgInCity / noOf6CylCars):0;
			Cyl8AvgInCity = Cyl8AvgInCity > 0 ? (Cyl8AvgInCity / noOf8CylCars):0;
			Cyl12AvgInCity = Cyl12AvgInCity > 0 ? (Cyl12AvgInCity / noOf12CylCars):0;
			
			Cyl0AvgInHwy = Cyl0AvgInHwy > 0 ? (Cyl0AvgInHwy / noOf0CylCars):0;
			Cyl2AvgInHwy = Cyl2AvgInHwy > 0 ? (Cyl2AvgInHwy / noOf2CylCars):0;
			Cyl3AvgInHwy = Cyl3AvgInHwy > 0 ? (Cyl3AvgInHwy / noOf3CylCars):0;
			Cyl4AvgInHwy = Cyl4AvgInHwy > 0 ? (Cyl4AvgInHwy / noOf4CylCars):0;
			Cyl6AvgInHwy = Cyl6AvgInHwy > 0 ? (Cyl6AvgInHwy / noOf6CylCars):0;
			Cyl8AvgInHwy = Cyl8AvgInHwy > 0 ? (Cyl8AvgInHwy / noOf8CylCars):0;
			Cyl12AvgInHwy = Cyl12AvgInHwy > 0 ? (Cyl12AvgInHwy / noOf12CylCars):0;
			var item = {};item["group"] = 0;item["AverageCityMPG"] = Cyl0AvgInCity;item["AverageHighwayMPG"] = Cyl0AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 2;item["AverageCityMPG"] = Cyl2AvgInCity;item["AverageHighwayMPG"] = Cyl2AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 3;item["AverageCityMPG"] = Cyl3AvgInCity;item["AverageHighwayMPG"] = Cyl3AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 4;item["AverageCityMPG"] = Cyl4AvgInCity;item["AverageHighwayMPG"] = Cyl4AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 6;item["AverageCityMPG"] = Cyl6AvgInCity;item["AverageHighwayMPG"] = Cyl6AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 8;item["AverageCityMPG"] = Cyl8AvgInCity;item["AverageHighwayMPG"] = Cyl8AvgInHwy;finalResultElectricity.push(item);
			item = {};item["group"] = 12;item["AverageCityMPG"] = Cyl12AvgInCity;item["AverageHighwayMPG"] = Cyl12AvgInHwy;finalResultElectricity.push(item);
			
			
	BrandSpecificBarChart(finalResultGasoline,"subGraphGasoline");
	BrandSpecificBarChart(finalResultDiesel,"subGraphDiesel");
	BrandSpecificBarChart(finalResultElectricity,"subGraphElectricity");
	
	
	
} 

function mouseover()
	{
        div.style('display', 'inline');
    }
function mousemove(data)
	{
        var d = d3.select(this).data()[0];
        div
            .html(d.value)
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');	
	}
function mouseout()
	{
	div.style('display', 'none');
	}

 
function ratedHpGraph(data,svgId){
	var id = "#"+svgId;
	d3.selectAll("rect.hp").remove() // remove existing rectangles & refresh with new ones
	var domain = 500;
	var xAxisLbl = "No of Cars";
	var yAxisLbl = "Fuel";
	var graphLabel = "";
    var margin = {top: 10, right: 30, bottom: 70, left: 50},
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var svg = d3.select(id)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.group; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
 
  var y = d3.scaleLinear()
    .domain([0, domain])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

	 svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
	  .on('mouseover', mouseover)
	  .on('mousemove', mousemove)
	  .on('mouseout', mouseout)
      .attr("width", x.bandwidth())
	  .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "lightblue")
	  .attr('class','hp')
	 
      
     if(data.length == 0)
	 {
		svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-30)")
    		.attr("y", 150)
    		.attr("x", 150)
    		.text("Data not Available")
	 }
  svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-90)")
    		.attr("y", -margin.left+20)
    		.attr("x", -70)
    		.text(xAxisLbl)
 svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("y", 0)
    		.attr("x", 150)
    		.text(graphLabel)
  svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("x", width - 120)
    		.attr("y", height + 45)
    		.text(yAxisLbl);
	
}

function BrandSpecificBarChart(data,svgId){
	var id = "#"+svgId;
	var subgroups = ["AverageCityMPG","AverageHighwayMPG"];
	var domain = 40;
	var colorRange = ['#e41a1c','#377eb8'];
	var xAxisLbl = "Miles per Gallon";
	var yAxisLbl = "Engine Cylinders";
	if(svgId == "subGraphGasoline" ){
		 var graphLabel = "Gasoline";
	}else if( svgId == "subGraphDiesel"){
		var graphLabel = "Diesel";
	}else if(svgId == "subGraphElectricity"){
		 var graphLabel = "Electricity";
	}
	if(svgId == "subGraphHP"){
		d3.selectAll("rect.hp").remove() // remove existing rectangles
		var subgroups = ["noOfRatedHPGasCars","noOfRatedHPDieselCars","noOfRatedHPElectricCars"];
		var domain = 500;
		var colorRange = ['#e41a1c','black','yellow'];
		var xAxisLbl = "No of Cars";
		var yAxisLbl = "Fuel";
		
	}
    var margin = {top: 10, right: 30, bottom: 70, left: 50},
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var svg = d3.select(id)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


  var groups = d3.map(data, function(d){return(d.group)}).keys()

  var x = d3.scaleBand()
            .domain(groups)
            .range([0, width-10])
            .padding([0.2])
  
   svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
 
  var y = d3.scaleLinear()
            .domain([0,domain])
            .range([ height, 0 ]);
  
    svg.append("g")
        .call(d3.axisLeft(y));

  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorRange)


  svg.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
     .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
		  div.style('display', 'inline');
      })
	  .on("mousemove",function(d){
		    var d = d3.select(this).data()[0];
			console.log(d);
			if(d.key == "AverageCityMPG")
				var lbl = " MPG in City";
				else
				var lbl = " MPG in Highway";
        div
            .html(Math.round(d.value)+lbl)
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
		  
	  })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.key));
      })
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
	  .attr('class', function(d){if(svgId == "subGraphHP") return "hpxxx"; else return "cylinder";})
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { if(y(d.value))return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); })
      
     if(data.length == 0)
	 {
		svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-30)")
    		.attr("y", 150)
    		.attr("x", 150)
    		.text("Data not Available")
	 }
  svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-90)")
    		.attr("y", -margin.left+20)
    		.attr("x", -50)
    		.text(xAxisLbl)
 svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("y", 0)
    		.attr("x", 150)
    		.text(graphLabel)
  svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("x", width - 100)
    		.attr("y", height + 40)
    		.text(yAxisLbl);	
    
	margin = {top: 0, right: 30, bottom: 70, left: 10}
	var legends = d3.select("#legends").attr("width", 450)
            		.attr("height",50)
            		.append("g")
            		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
					
	
	legends.append("g").append("rect")
	.attr("x", 80)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", function(d) { return "#e41a1c" });

  	legends.append("g").append("text")
	.attr("x", 225)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) {return "AverageCityMPG"; });

   	legends.append("g").append("rect")
	.attr("x", 240)
	.attr("y", 0)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", function(d) { return "#377eb8" });

  	legends.append("g").append("text")
	.attr("x", 400)
	.attr("y",10)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) {return "AverageHighwayMPG"; });
  		
}