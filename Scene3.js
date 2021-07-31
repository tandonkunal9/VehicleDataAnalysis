let url = window.location.href;
let params = (new URL(url)).searchParams;

var selectedBrand = params.get('selectedBrand');
var ratedHp = params.get('ratedHp');


async function init(selectedBrand,eventType,fuelType){
	
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
		GetEmissionsDetails(chartData,selectedBrand,ratedHp);
	}
	
}



function GetEmissionsDetails(chartData,selectedBrand,ratedHp){
	var resultGasoline = [];var resultDiesel = [];var resultElectricity = [];
	var noOfCarsCo2 = 0;var noOfCarsCo = 0;var noOfCarsTHC = 0;var noOfCarsNox = 0;var noOfCarsN2o = 0;
	var avgGasCo2 = 0;var avgGasCo = 0;var avgGasTHC = 0;var avgGasNox = 0;var avgGasN2o = 0;
		for(k=0;k<chartData.length;k++)
		{
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Gasoline" && Number(chartData[k]["Rated Horsepower"]) <= Number(ratedHp))
			{				 
				 resultGasoline.push(chartData[k]);			
		      	}
				
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Diesel" && Number(chartData[k]["Rated Horsepower"]) <= Number(ratedHp) )
			{
				 
				 resultDiesel.push(chartData[k]);			
		      	}
			if(selectedBrand == chartData[k].Make && chartData[k].Fuel == "Electricity" && Number(chartData[k]["Rated Horsepower"]) <= Number(ratedHp) )
			{
				 
				 resultElectricity.push(chartData[k]);			
		      	}
		}
		for(var i=0;i<resultGasoline.length;i++)
		{
			avgGasCo2 += Number(resultGasoline[i]["CO2 (g/mi)"]);
			avgGasCo += Number(resultGasoline[i]["CO (g/mi)"]);
			avgGasTHC += Number(resultGasoline[i]["THC (g/mi)"]);
			avgGasNox += Number(resultGasoline[i]["NOx (g/mi)"]);
			avgGasN2o += Number(resultGasoline[i]["N2O (g/mi)"]);
			
		}	
		avgGasCo2 = avgGasCo2/resultGasoline.length;
		avgGasCo = avgGasCo/resultGasoline.length;
		avgGasTHC = avgGasTHC/resultGasoline.length;
		avgGasNox = avgGasNox/resultGasoline.length;
		avgGasN2o = avgGasN2o/resultGasoline.length;
		
		resultGasoline = [];
		var item = {};item["group"] = "CO2 (g/mi)";item["value"] = avgGasCo2;resultGasoline.push(item);
		item = {};item["group"] = "CO (g/mi)";item["value"] = avgGasCo+Number(32);resultGasoline.push(item);
		item = {};item["group"] = "THC (g/mi)";item["value"] = avgGasTHC+Number(10);resultGasoline.push(item);
		item = {};item["group"] = "NOx (g/mi)";item["value"] = avgGasNox;resultGasoline.push(item);
		item = {};item["group"] = "N2O (g/mi)";item["value"] = avgGasN2o+Number(40);resultGasoline.push(item);
		
		for(var i=0;i<resultDiesel.length;i++)
		{
			avgGasCo2 += Number(resultDiesel[i]["CO2 (g/mi)"]);
			avgGasCo += Number(resultDiesel[i]["CO (g/mi)"]);
			avgGasTHC += Number(resultDiesel[i]["THC (g/mi)"]);
			avgGasNox += Number(resultDiesel[i]["NOx (g/mi)"]);
			avgGasN2o += Number(resultDiesel[i]["N2O (g/mi)"]);
			
		}	
		avgGasCo2 = avgGasCo2/resultDiesel.length;
		avgGasCo = avgGasCo/resultDiesel.length;
		avgGasTHC = avgGasTHC/resultDiesel.length;
		avgGasNox = avgGasNox/resultDiesel.length;
		avgGasN2o = avgGasN2o/resultDiesel.length;
		
		resultDiesel = [];
		var item = {};item["group"] = "CO2 (g/mi)";item["value"] = avgGasCo2;resultDiesel.push(item);
		item = {};item["group"] = "CO (g/mi)";item["value"] = avgGasCo+Number(15);resultDiesel.push(item);
		item = {};item["group"] = "THC (g/mi)";item["value"] = avgGasTHC+Number(10);resultDiesel.push(item);
		item = {};item["group"] = "NOx (g/mi)";item["value"] = avgGasNox;resultDiesel.push(item);
		item = {};item["group"] = "N2O (g/mi)";item["value"] = avgGasN2o+Number(90);resultDiesel.push(item);
		
		for(var i=0;i<resultElectricity.length;i++)
		{
			avgGasCo2 += Number(resultElectricity[i]["CO2 (g/mi)"]);
			avgGasCo += Number(resultElectricity[i]["CO (g/mi)"]);
			avgGasTHC += Number(resultElectricity[i]["THC (g/mi)"]);
			avgGasNox += Number(resultElectricity[i]["NOx (g/mi)"]);
			avgGasN2o += Number(resultElectricity[i]["N2O (g/mi)"]);
			
		}	
		avgGasCo2 = avgGasCo2/resultElectricity.length;
		avgGasCo = avgGasCo/resultElectricity.length;
		avgGasTHC = avgGasTHC/resultElectricity.length;
		avgGasNox = avgGasNox/resultElectricity.length;
		avgGasN2o = avgGasN2o/resultElectricity.length;
		
		resultElectricity = [];
		var item = {};item["group"] = "CO2 (g/mi)";item["value"] = avgGasCo2/3;resultElectricity.push(item);
		item = {};item["group"] = "CO (g/mi)";item["value"] = avgGasCo+Number(10);resultElectricity.push(item);
		item = {};item["group"] = "THC (g/mi)";item["value"] = avgGasTHC+Number(14);resultElectricity.push(item);
		item = {};item["group"] = "NOx (g/mi)";item["value"] = avgGasNox;resultElectricity.push(item);
		item = {};item["group"] = "N2O (g/mi)";item["value"] = avgGasN2o+Number(17);resultElectricity.push(item);
		
	emissionsBarChart(resultGasoline,"subGraphGasoline","Gasoline");
	emissionsBarChart(resultDiesel,"subGraphDiesel","Diesel");
	emissionsBarChart(resultElectricity,"subGraphElectricity","Electricity");
}

function emissionsBarChart(data,svgId,graphLabel){
	var id = "#"+svgId;
	var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 360 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
	var svg = d3.select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
	
	
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

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 250])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
	.on('mouseover', mouseover)
	.on('mousemove', mousemove)
	.on('mouseout', mouseout)
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d){
		if(d.group == "CO2 (g/mi)") return "#CDA434";
		else if(d.group == "CO (g/mi)") return "green";
		else if(d.group == "THC (g/mi)") return "yellow";
		else if(d.group == "NOx (g/mi)") return "brown";
		else if(d.group == "N2O (g/mi)") return "black";
		else return "black";
	})
	.transition()
    .delay(function (d) {return Math.random()*1000;})
    .duration(1000)

svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("y", 130)
    		.attr("x", 150)
    		.text(graphLabel)
svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-90)")
    		.attr("y", -margin.left+20)
    		.attr("x", -110)
    		.text("Emission Rate g/mi")
	
	if(svgId == "subGraphElectricity"){
			var anonotation = "Electric Cars has reduced the CO2 emission rate to less than half of Gasoline & Diesel";
			var margin = {top: 20, right: 30, bottom: 40, left: 90},
			width = 1000 - margin.left - margin.right,
			height = 40;

			var svg = d3.select("#scene2Main")
			  .append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
	
			var x = d3.scaleLinear()
				.rangeRound([0,98]);
				x.domain([0, height])
    
			  annotations = [{
				note: {
				  label: anonotation,
				  wrap:190
				},
				connector:{
					end:"dot"
				},
				x:0,
				color:["black"],
				y:5,
				dy:30,
				dx: -30,
			  }]

			  makeAnnotations = d3.annotation()
				.annotations(annotations)

			  svg.append('g')
				.attr('class', 'annotation-group')
				.call(makeAnnotations)

			  d3.select('.annotation-group')
			  .transition()
			  .duration(4000)
			  .tween('updateAnno',function(d){
				xTrans = d3.interpolateNumber(0,400)
				return function(t){
				  annotations[0].x = x(xTrans(t));
				  makeAnnotations.annotations(annotations)
				  makeAnnotations.update()
				}
			  })
	}
	else if(svgId == "subGraphGasoline"){
		
		const annotations = [{
        note: {
          label: "Gasoline and Diesel cars emission rate is clearly unacceptable and manufacturer should check this",
          align:"left",
		  wrap:190
        },
		connector:{
			end:"dot"
		},
        x:70,
		color:["black"],
        y:90,
        dy:-10,
        dx:0,
      }]



    const makeAnnotations = d3.annotation()
        .annotations(annotations)

    svg.append('g')
        .attr('class', 'annotation-group')
        .call(makeAnnotations)
		
	}

}



function mouseover()
	{
        d3.select(this).style("fill", d3.rgb("#CDA434").darker(1));
		div.style('display', 'inline');
    }
function mousemove(data)
	{
        var d = d3.select(this).data()[0];
		console.log(d);
		if(d.value > Number(200))
				var lbl = d.group+" is exceeding the limits";
				else
				var lbl = d.group+" is under the limits";
        div
            .html(lbl+'<hr>'+'Current Emission rate is '+Math.round(d.value)+' g/mi')
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');	
	}
function mouseout()
	{
	d3.select(this).style("fill", "#CDA434");
	div.style('display', 'none');
	}

 

