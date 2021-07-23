let url = window.location.href;
let params = (new URL(url)).searchParams;

var data = params.get('selectedBrand');
async function init(data){
	
	const chartData = await d3.csv('https://tandonkunal9.github.io/VehicleDataAnalysis/cars2017.csv');
	opts = [{
      	  "captions": [{ "Acura": "Acura", "BMW": "BMW" }],
        	"color": [{ 'Acura' : '#BEBD7F','Alfa Romeo' : '#C2B078','Aston Martin' : '#C6A664','Audi' : '#E5BE01','Bentley' : '#CDA434','BMW' : '#A98307','Buick' : '#E4A010','Cadillac' : '#DC9D00','Chevrolet' : '#8A6642','Chrysler' : '#C7B446','Dodge' : '#EAE6CA','Ferrari' : '#E1CC4F','Fiat' : '#E6D690','Ford' : '#EDFF21','Genesis' : '#F5D033','GMC' : '#F8F32B','Honda' : '#9E9764','Hyundai' : '#999950','Infiniti' : '#F3DA0B','Jaguar' : '#FAD201','Jeep' : '#AEA04B','Kia' : '#FFFF00','Lamborghini' : '#9D9101','Land Rover' : '#F4A900','Lexus' : '#D6AE01','Lincoln' : '#F3A505','Lotus' : '#EFA94A','Maserati' : '#6A5D4D','Mazda' : '#705335','McLaren Automotive' : '#F39F18','Mercedes-Benz' : '#ED760E','MINI' : '#C93C20','Mitsubishi' : '#CB2821','Nissan' : '#FF7514','Porsche' : '#F44611','Ram' : '#FF2301','Rolls-Royce' : '#FFA420','Roush Performance' : '#F75E25','smart' : '#F54021','Subaru' : '#D84B20','Tesla' : '#EC7C26','Toyota' : '#E55137','Volkswagen' : '#C35831','Volvo' : '#AF2B1E' }],
        	"xaxis": "Make",
        	"yaxis": "Number",
		"engineCylOptions":[0,2,4,6,12]
		
    	}]
	GetBrandSpecificData(chartData,data,opts);
}

function GetBrandSpecificData(chartData,selectedBrand,opts){
	
	var resultGasoline = [];
	var resultDiesel = [];
	var resultElectricity = [];
	var finalResultGasoline = [];
	var finalResultDiesel = [];
	var finalResultElectricity = [];
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
			if(resultGasoline[i].EngineCylinders =="0" || resultGasoline[i].EngineCylinders =="2" || 
				resultGasoline[i].EngineCylinders =="3" || resultGasoline[i].EngineCylinders =="4" ||
				 resultGasoline[i].EngineCylinders =="6" || resultGasoline[i].EngineCylinders =="8" || resultGasoline[i].EngineCylinders =="12")
			{
				item = {};
				item["group"] = resultGasoline[i].EngineCylinders;
				item["AverageCityMPG"] = resultGasoline[i].AverageCityMPG;
				item["AverageHighwayMPG"] = resultGasoline[i].AverageHighwayMPG;
				finalResultGasoline.push(item);
			}
		}
	for(var i=0;i<resultDiesel.length;i++)
		{
			if(resultDiesel[i].EngineCylinders =="0" || resultDiesel[i].EngineCylinders =="2" || 
				resultDiesel[i].EngineCylinders =="3" ||resultDiesel[i].EngineCylinders =="4" ||
				 resultDiesel[i].EngineCylinders =="6" || resultDiesel[i].EngineCylinders =="8" || resultDiesel[i].EngineCylinders =="12")
			{
				item = {};
				item["group"] = resultDiesel[i].EngineCylinders;
				item["AverageCityMPG"] = resultDiesel[i].AverageCityMPG;
				item["AverageHighwayMPG"] = resultDiesel[i].AverageHighwayMPG;
				finalResultDiesel.push(item);
			}
		}
	for(var i=0;i<resultElectricity.length;i++)
		{
			if(resultElectricity[i].EngineCylinders =="0" || resultElectricity[i].EngineCylinders =="2" || 
				resultElectricity[i].EngineCylinders =="3" || resultElectricity[i].EngineCylinders =="4" ||
				 resultElectricity[i].EngineCylinders =="6" || resultElectricity[i].EngineCylinders =="8" || resultElectricity[i].EngineCylinders =="12")
			{
				item = {};
				item["group"] = resultElectricity[i].EngineCylinders;
				item["AverageCityMPG"] = resultElectricity[i].AverageCityMPG;
				item["AverageHighwayMPG"] = resultElectricity[i].AverageHighwayMPG;
				finalResultElectricity.push(item);
			}
		}
	BrandSpecificBarChart(finalResultGasoline,"subGraphGasoline");
	BrandSpecificBarChart(finalResultDiesel,"subGraphDiesel");
	BrandSpecificBarChart(finalResultElectricity,"subGraphElectricity");
}  

function BrandSpecificBarChart(data,svgId){
    var id = "#"+svgId;
    var margin = {top: 10, right: 30, bottom: 70, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var svg = d3.select(id)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


  var subgroups = ["AverageCityMPG","AverageHighwayMPG"];

  var groups = d3.map(data, function(d){return(d.group)}).keys()

  var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
  
   svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));
 
  var y = d3.scaleLinear()
            .domain([0, 40])
            .range([ height, 0 ]);
  
    svg.append("g")
        .call(d3.axisLeft(y));

  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8'])


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
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.key));
      })
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); })
      
     if(data.length == 0)
	 { console.log("if");
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
    		.text("Miles per Gallon")
  svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("x", width - 100)
    		.attr("y", height + 40)
    		.text("Engine Cylinders");	
  
	var legends = d3.select("#legends").attr("width", width + margin.left + margin.right)
            		.attr("height", height + margin.top + margin.bottom)
            		.append("g")
            		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	legends.append("g").append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", function(d) { return "#e41a1c" });

  	legends.append("g").append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) {return "AverageCityMPG"; });

   	legends.append("g").append("rect")
	.attr("x", width - 18)
	.attr("y", 30)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", function(d) { return "#377eb8" });

  	legends.append("g").append("text")
	.attr("x", width - 24)
	.attr("y",40)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) {return "AverageHighwayMPG"; });
  
  
  
			
}