async function init(event,data,filterType){
	
	const chartData = await d3.csv('https://tandonkunal9.github.io/VehicleDataAnalysis/Cars2021V1.csv');
	opts = [{
      	  "captions": [{ "Acura": "Acura", "BMW": "BMW" }],
        	"color": [{ 'Acura' : '#BEBD7F','Alfa Romeo' : '#C2B078','Aston Martin' : '#C6A664','Audi' : '#E5BE01','Bentley' : '#CDA434','BMW' : '#A98307','Buick' : '#E4A010','Cadillac' : '#DC9D00','Chevrolet' : '#8A6642','Chrysler' : '#C7B446','Dodge' : '#EAE6CA','Ferrari' : '#E1CC4F','Fiat' : '#E6D690','Ford' : '#EDFF21','Genesis' : '#F5D033','GMC' : '#F8F32B','Honda' : '#9E9764','Hyundai' : '#999950','Infiniti' : '#F3DA0B','Jaguar' : '#FAD201','Jeep' : '#AEA04B','Kia' : '#FFFF00','Lamborghini' : '#9D9101','Land Rover' : '#F4A900','Lexus' : '#D6AE01','Lincoln' : '#F3A505','Lotus' : '#EFA94A','Maserati' : '#6A5D4D','Mazda' : '#705335','McLaren Automotive' : '#F39F18','Mercedes-Benz' : '#ED760E','MINI' : '#C93C20','Mitsubishi' : '#CB2821','Nissan' : '#FF7514','Porsche' : '#F44611','Ram' : '#FF2301','Rolls-Royce' : '#FFA420','Roush Performance' : '#F75E25','smart' : '#F54021','Subaru' : '#D84B20','Tesla' : '#EC7C26','Toyota' : '#E55137','Volkswagen' : '#C35831','Volvo' : '#AF2B1E' }],
        	"xaxis": "Make",
        	"yaxis": "Number",
		"engineCylOptions":[0,2,4,6,12]
		
    	}]
	
	if(event == "OnLoad" || event == "onFilterClick")
		TransformChartData(chartData, opts);
	if(event == "onBarClick")
		GetBrandSpecificData(chartData,data,opts);
}

function filterRecords(type){
	init("onFilterClick","",type);
}



function TransformChartData(chartData, opts) {
        var result = [];
        var hasMatch;
        var xVarName;
        var yVarName = opts[0].yaxis;
	
        xVarName = opts[0].xaxis;
	
        for (var i in chartData) {
            hasMatch = false;
	
	    if(chartData[i]['Fuel'] == document.getElementById('fuelType').value)
	{
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];     
                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = Number(result[index][yVarName]) + Number(1);		
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
		item = 1;
                ditem[xVarName] = chartData[i][xVarName];
		ditem["Number"] = item;
		ditem["noOf0CylCars"] = 0;
		ditem["noOf2CylCars"] = 0;
		ditem["noOf3CylCars"] = 0;
		ditem["noOf4CylCars"] = 0;
		ditem["noOf6CylCars"] = 0;
		ditem["noOf8CylCars"] = 0;
		ditem["noOf10CylCars"] = 0;
		ditem["noOf12CylCars"] = 0;
		ditem["color"] = opts[0].color[0][chartData[i][xVarName]];
                result.push(ditem);
		
               
            }
	 }
        }      
	for(var i=0;i<result.length;i++){
		for(k=0;k<chartData.length;k++){
			if(result[i].Make == chartData[k].Make && chartData[k]['Fuel'] == document.getElementById('fuelType').value)	{
				if(chartData[k]["EngineCylinders"] == 0){
							result[i]["noOf0CylCars"] = result[i]["noOf0CylCars"] + Number(1);
							//result[i]["noOf0CylCars"] = Number(result[i]["noOf0CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 2){
							result[i]["noOf2CylCars"] = result[i]["noOf2CylCars"] + Number(1);
							//result[i]["noOf2CylCars"] = Number(result[i]["noOf2CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 3){
							result[i]["noOf3CylCars"] = result[i]["noOf3CylCars"] + Number(1);
							//result[i]["noOf3CylCars"] = Number(result[i]["noOf3CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 4){
							result[i]["noOf4CylCars"] = Number(result[i]["noOf4CylCars"]) + Number(1);
							//result[i]["noOf4CylCars"] = Number(result[i]["noOf4CylCars"]) * Number(10);
				}if(chartData[k]["EngineCylinders"] == 6){
							result[i]["noOf6CylCars"] = result[i]["noOf6CylCars"] + Number(1);
							//result[i]["noOf6CylCars"] = Number(result[i]["noOf6CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 8){
							result[i]["noOf8CylCars"] = result[i]["noOf8CylCars"] + Number(1);
							//result[i]["noOf8CylCars"] = Number(result[i]["noOf8CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 10){
							result[i]["noOf10CylCars"] = result[i]["noOf10CylCars"] + Number(1);
							//result[i]["noOf10CylCars"] = Number(result[i]["noOf10CylCars"]) * 10;
				}if(chartData[k]["EngineCylinders"] == 12){
							result[i]["noOf12CylCars"] = result[i]["noOf12CylCars"] + Number(1);
							//result[i]["noOf12CylCars"] = Number(result[i]["noOf12CylCars"]) * 10;
				}
			    }
}				
			}
	/*for(var i=0;i<result.length;i++){
		result[i]["noOf0CylCars"] = Number(result[i]["noOf0CylCars"]) * 10;
		result[i]["noOf2CylCars"] = Number(result[i]["noOf2CylCars"]) * 10;
		result[i]["noOf3CylCars"] = Number(result[i]["noOf3CylCars"]) * 10;
		result[i]["noOf4CylCars"] = Number(result[i]["noOf4CylCars"]) * 10;
		result[i]["noOf6CylCars"] = Number(result[i]["noOf6CylCars"]) * 10;
		result[i]["noOf8CylCars"] = Number(result[i]["noOf8CylCars"]) * 10;
		result[i]["noOf10CylCars"] = Number(result[i]["noOf10CylCars"]) * 10;
		result[i]["noOf12CylCars"] = Number(result[i]["noOf12CylCars"]) * 10;
	}*/
	
	barChart(result);	
	
        return;	
    }


    function mouseover(){
        div.style('display', 'inline');
    }
    function mousemove(data){
        var d = d3.select(this).data()[0];
        div
            .html("Total Number of " +document.getElementById('fuelType').value+ " Cars by " + d.Make + ' - ' + d.Number + '<hr/>' + "0 Cylinder Cars" + ' - ' + d.noOf0CylCars + '<br/>' + "2 Cylinder Cars" + ' - ' + d.noOf2CylCars+ '<br/>' + "3 Cylinder Cars" + ' - ' + d.noOf3CylCars+ '<br/>' + "4 Cylinder Cars" + ' - ' + d.noOf4CylCars+ '<br/>' + "6 Cylinder Cars" + ' - ' + d.noOf6CylCars+ '<br/>' + "8 Cylinder Cars" + ' - ' + d.noOf8CylCars+ '<br/>' + "10 Cylinder Cars" + ' - ' + d.noOf10CylCars+ '<br/>' + "12 Cylinder Cars" + ' - ' + d.noOf12CylCars)
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
    }
    function mouseout(){
        div.style('display', 'none');
    }
    function mouseClick(data){
	 var d = d3.select(this).data()[0];
	 location.href = "Scene2.html?selectedBrand="+data.Make;
	}


function barChart(chartData){
	d3.selectAll("svg > *").remove();
	const svg = d3.select('#mainGraph').attr("height",900).attr("width",1200);
	const width = +svg.attr('width');
	const height = +svg.attr('height');
	const margin = {top:20,right:20,bottom:40,left:100};
	var innerWidth = width - margin.left - margin.right;
	var innerHeight =  height - margin.top - margin.bottom;
	var marketLeader = "";
	var chartData = chartData.sort(function(a,b){
		return d3.descending(a.Number,b.Number)
	})
	const xscale =  d3.scaleLinear()
			  .domain([0,d3.max(chartData,d => d.Number )])
			  .range([0,innerWidth-100])

	const yscale = d3.scaleBand()
			 .domain(chartData.map(d => d.Make))
			 .range([0,innerHeight])
			 .padding(0.5)
	const yAxis = d3.axisLeft(yscale)
	const xAxis = d3.axisBottom(xscale);
	
 
	var svgAnnot = d3.select('#svgAnnot').attr("height",100).attr("width",350).attr('transform',`translate(650,-600)`).append('div');
	
	const g = svg.append('g')
		  .attr('transform',`translate(${margin.left},${margin.top})`);
	

	g.append('g').call(d3.axisLeft(yscale));
	g.append('g').call(d3.axisBottom(xscale))
		      .attr('transform',`translate(0,${innerHeight})`);
	
	
	g.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-90)")
    		.attr("y", -margin.left+10)
    		.attr("x", -200)
    		.text("Make")
	g.append("text")
    		.attr("text-anchor", "end")
    		.attr("x", width/2)
    		.attr("y", 880)
    		.text("Number of Cars Sold");
	g.selectAll("rect").data(chartData)
			.enter().append("rect")
			.attr("fill", function(d) { return d.color; })		
			.attr("y",chartData => yscale(chartData.Make))
			.attr("width",function(d,i){
				if(i== 0) {
					lineWidth = xscale(d.Number);
					marketLeader = d.Make;
				}return xscale(d.Number)
				
				})
			.on('mouseover', mouseover)
        	.on('mousemove', mousemove)
        	.on('mouseout', mouseout)
			.on("click",mouseClick)
			.transition()
  			.duration(800)
			.attr("height",yscale.bandwidth())
	
	 var anonotation = "We can clearly see that "+marketLeader+ " is the market leader";
	 annotDiv.html("We can clearly see that "+marketLeader+ " is the market leader with highest number of car sold so far in 2021, dedicated team from EPA department must review the complaince and fuel economy data by clicking on the bar for detail information on<ul><li><p>Average Mileage in City / Highway</p><li><p>CO,CO2,NOx Emission Details</p></li><li><p>Vehicle and Transmission type distributions</p></li></ul>")
			  .style('left', '750px')
              .style('top', '460px')
	 /*g.append("text")
    		.attr("text-anchor", "end")
    		.attr("x", innerWidth-200)
    		.attr("y", innerHeight/5)
			.attr('class', 'annotationClass')
    		.text(anonotation);*/
	 var Gen = d3.line();
        var points = [
            [lineWidth-10, 12],
            [lineWidth/1.1,200]
             
        ];
  
        var pathOfLine = Gen(points);
  
        d3.select('path')
            .attr('d', pathOfLine);
			
}
			