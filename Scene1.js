async function init(event,data,filterType,year){
	
	const chartData = await d3.csv('https://tandonkunal9.github.io/VehicleDataAnalysis/Cars2021V1.csv');
	opts = [{
      	  "captions": [{ "Acura": "Acura", "BMW": "BMW" }],
        	"color": [{ 'Acura' : '#BEBD7F','Alfa Romeo' : '#C2B078','Aston Martin' : '#C6A664','Audi' : '#E5BE01','Bentley' : '#CDA434','BMW' : '#A98307','Buick' : '#E4A010','Cadillac' : '#DC9D00','Chevrolet' : '#8A6642','Chrysler' : '#C7B446','Dodge' : '#EAE6CA','Ferrari' : '#E1CC4F','Fiat' : '#E6D690','Ford' : '#EDFF21','Genesis' : '#F5D033','GMC' : '#F8F32B','Honda' : '#9E9764','Hyundai' : '#999950','Infiniti' : '#F3DA0B','Jaguar' : '#FAD201','Jeep' : '#AEA04B','Kia' : '#FFFF00','Lamborghini' : '#9D9101','Land Rover' : '#F4A900','Lexus' : '#D6AE01','Lincoln' : '#F3A505','Lotus' : '#EFA94A','Maserati' : '#6A5D4D','Mazda' : '#705335','McLaren Automotive' : '#F39F18','Mercedes-Benz' : '#ED760E','MINI' : '#C93C20','Mitsubishi' : '#CB2821','Nissan' : '#FF7514','Porsche' : '#F44611','Ram' : '#FF2301','Rolls-Royce' : '#FFA420','Roush Performance' : '#F75E25','smart' : '#F54021','Subaru' : '#D84B20','Tesla' : '#EC7C26','Toyota' : '#E55137','Volkswagen' : '#C35831','Volvo' : '#AF2B1E' }],
        	"xaxis": "Make",
        	"yaxis": "Number",
		"engineCylOptions":[0,2,4,6,12]
		
    	}]
	
	if(event == "OnLoad" || event == "onFilterClick"){
	TransformChartData(chartData,opts,filterType,year);
	getBrandDetails(chartData,"");
	}
    
}
function filterRecords(type){
	init("onFilterClick","",type);
}


function getBrandDetails(chartData,selectedData){
	var resultGasoline = [];
	var resultDiesel = [];
	var resultElectricity = [];
	var carsByFuelResult = [];
	var testingByFuelResult = [];
		for(k=0;k<chartData.length;k++)
		{
			if(chartData[k].Fuel == "Gasoline" )
			{				 
				 resultGasoline.push(chartData[k]);	
		      	}
			if(chartData[k].Fuel == "Diesel" )
			{
				 resultDiesel.push(chartData[k]);			
		      }
			if(chartData[k].Fuel == "Electricity" )
			{
				 resultElectricity.push(chartData[k]);			
		      	}
		}
	var noSemiAuto = 0;var noOfManual = 0;var noOfAutomatic = 0;var noOfOther = 0;
	var noCD = 0;var noOfFTP = 0;var noOfHWY = 0;var noOfSC03 = 0;var noOfUS06 = 0;
	for(var i=0;i<resultGasoline.length;i++)
		{			
			if(resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic"){
				noSemiAuto = noSemiAuto + 1;
			}
			if(resultGasoline[i]["Tested Transmission Type"] == "Manual"){
				noOfManual = noOfManual + 1;
			}
			if(resultGasoline[i]["Tested Transmission Type"] == "Automatic"){
				noOfAutomatic = noOfAutomatic + 1;
			}
			if(resultGasoline[i]["Tested Transmission Type"] == "Other"){
				noOfOther = noOfOther + 1;
			}
			
			if(resultGasoline[i]["Test Category"] == "CD" && (resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Manual" || resultGasoline[i]["Tested Transmission Type"] == "Other")){
				noCD = noCD + 1;
			}
			if(resultGasoline[i]["Test Category"] == "FTP" && (resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Manual" || resultGasoline[i]["Tested Transmission Type"] == "Other")){
				noOfFTP = noOfFTP + 1;
			}
			if(resultGasoline[i]["Test Category"] == "HWY" && (resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Manual" || resultGasoline[i]["Tested Transmission Type"] == "Other")){
				noOfHWY = noOfHWY + 1;
			}
			if(resultGasoline[i]["Test Category"] == "SC03" && (resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Manual" || resultGasoline[i]["Tested Transmission Type"] == "Other")){
				noOfSC03 = noOfSC03 + 1;
			}
			if(resultGasoline[i]["Test Category"] == "US06" && (resultGasoline[i]["Tested Transmission Type"] == "Semi-Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Automatic" || resultGasoline[i]["Tested Transmission Type"] == "Manual" || resultGasoline[i]["Tested Transmission Type"] == "Other")){
				noOfUS06 = noOfUS06 + 1;
			}
		}
	item = {};
	item["group"] = "Gasoline";
	item["noSemiAuto"] = noSemiAuto;
	item["noOfManual"] = noOfManual;
	item["noOfAutomatic"] = noOfAutomatic;
	item["noOfOther"] = noOfOther;
	item["cumTotal"] = noSemiAuto+noOfManual+noOfAutomatic+noOfOther;
	carsByFuelResult.push(item);
	
	item = {};
	item["group"] = "Gasoline";
	item["noCD"] = noCD;
	item["noOfFTP"] = noOfFTP;
	item["noOfHWY"] = noOfHWY;
	item["noOfSC03"] = noOfSC03;
	item["noOfUS06"] = noOfUS06;
	item["cumTotal"] = noCD+noOfFTP+noOfHWY+noOfSC03+noOfUS06;
	testingByFuelResult.push(item);
	for(var i=0;i<resultDiesel.length;i++)
		{			
			if(resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic"){
				noSemiAuto = noSemiAuto + 1;
			}
			if(resultDiesel[i]["Tested Transmission Type"] == "Manual"){
				noOfManual = noOfManual + 1;
			}
			if(resultDiesel[i]["Tested Transmission Type"] == "Automatic"){
				noOfAutomatic = noOfAutomatic + 1;
			}
			if(resultDiesel[i]["Tested Transmission Type"] == "Other"){
				noOfOther = noOfOther + 1;
			}
			
			if(resultDiesel[i]["Test Category"] == "CD" && (resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Manual" || resultDiesel[i]["Tested Transmission Type"] == "Other")){
				noCD = noCD + 1;
			}
			if(resultDiesel[i]["Test Category"] == "FTP" && (resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Manual" || resultDiesel[i]["Tested Transmission Type"] == "Other")){
				noOfFTP = noOfFTP + 1;
			}
			if(resultDiesel[i]["Test Category"] == "HWY" && (resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Manual" || resultDiesel[i]["Tested Transmission Type"] == "Other")){
				noOfHWY = noOfHWY + 1;
			}
			if(resultDiesel[i]["Test Category"] == "SC03" && (resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Manual" || resultDiesel[i]["Tested Transmission Type"] == "Other")){
				noOfSC03 = noOfSC03 + 1;
			}
			if(resultDiesel[i]["Test Category"] == "US06" && (resultDiesel[i]["Tested Transmission Type"] == "Semi-Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Automatic" || resultDiesel[i]["Tested Transmission Type"] == "Manual" || resultDiesel[i]["Tested Transmission Type"] == "Other")){
				noOfUS06 = noOfUS06 + 1;
			}
		}
	item = {};
	item["group"] = "Diesel";
	item["noSemiAuto"] = noSemiAuto;
	item["noOfManual"] = noOfManual;
	item["noOfAutomatic"] = noOfAutomatic;
	item["noOfOther"] = noOfOther;
	item["cumTotal"] = noSemiAuto+noOfManual+noOfAutomatic+noOfOther;
	carsByFuelResult.push(item);
	item = {};
	item["group"] = "Diesel";
	item["noCD"] = noCD;
	item["noOfFTP"] = noOfFTP;
	item["noOfHWY"] = noOfHWY;
	item["noOfSC03"] = noOfSC03;
	item["noOfUS06"] = noOfUS06;
	item["cumTotal"] = noCD+noOfFTP+noOfHWY+noOfSC03+noOfUS06;
	testingByFuelResult.push(item);
	for(var i=0;i<resultElectricity.length;i++)
		{			
			if(resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic"){
				noSemiAuto = noSemiAuto + 1;
			}
			if(resultElectricity[i]["Tested Transmission Type"] == "Manual"){
				noOfManual = noOfManual + 1;
			}
			if(resultElectricity[i]["Tested Transmission Type"] == "Automatic"){
				noOfAutomatic = noOfAutomatic + 1;
			}
			if(resultElectricity[i]["Tested Transmission Type"] == "Other"){
				noOfOther = noOfOther + 1;
			}
			
			if(resultElectricity[i]["Test Category"] == "CD"  && (resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Manual" || resultElectricity[i]["Tested Transmission Type"] == "Other")){
				noCD = noCD + 1;
			}
			if(resultElectricity[i]["Test Category"] == "FTP"  && (resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Manual" || resultElectricity[i]["Tested Transmission Type"] == "Other")){
				noOfFTP = noOfFTP + 1;
			}
			if(resultElectricity[i]["Test Category"] == "HWY"  && (resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Manual" || resultElectricity[i]["Tested Transmission Type"] == "Other")){
				noOfHWY = noOfHWY + 1;
			}
			if(resultElectricity[i]["Test Category"] == "SC03"  && (resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Manual" || resultElectricity[i]["Tested Transmission Type"] == "Other")){
				noOfSC03 = noOfSC03 + 1;
			}
			if(resultElectricity[i]["Test Category"] == "US06"  && (resultElectricity[i]["Tested Transmission Type"] == "Semi-Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Automatic" || resultElectricity[i]["Tested Transmission Type"] == "Manual" || resultElectricity[i]["Tested Transmission Type"] == "Other")){
				noOfUS06 = noOfUS06 + 1;
			}
		}
		item = {};
		item["group"] = "Electricity";
		item["noSemiAuto"] = noSemiAuto;
		item["noOfManual"] = noOfManual;
		item["noOfAutomatic"] = noOfAutomatic;
		item["noOfOther"] = noOfOther;
		item["cumTotal"] = noSemiAuto+noOfManual+noOfAutomatic+noOfOther;
		carsByFuelResult.push(item);
		
		item = {};
		item["group"] = "Electricity";
		item["noCD"] = noCD;
		item["noOfFTP"] = noOfFTP;
		item["noOfHWY"] = noOfHWY;
		item["noOfSC03"] = noOfSC03;
		item["noOfUS06"] = noOfUS06;
		item["cumTotal"] = noCD+noOfFTP+noOfHWY+noOfSC03+noOfUS06;
		testingByFuelResult.push(item);
		
		BrandSpecificBarChart(carsByFuelResult,"vehicleDistributionByFuel","vehicleDistributionByFuelLegend");	
		BrandSpecificBarChart(testingByFuelResult,"testingByFuel","testingByFuelLegend");
		
	
}

function BrandSpecificBarChart(data,svgId,legendId){
	var cumSumGas = 0;var cumSumDies = 0;var cumSumElectric = 0;
	for(var i=0;i<data.length;i++){
		if(data[i]["group"] == "Gasoline")
			cumSumGas = data[i]["cumTotal"];
		if(data[i]["group"] == "Diesel")
			cumSumDies = data[i]["cumTotal"]
		if(data[i]["group"] == "Electricity")
			cumSumElectric = data[i]["cumTotal"]
		
	}
	var id = "#"+svgId;
	var legendId = "#"+legendId;
	var domainHeight = 3000;
	var subgroups = ["noSemiAuto","noOfManual","noOfAutomatic","noOfOther"];
	var colorRange = ['#BEBD7F','#CDA434','blue','#E4A010']
	
	if(svgId == "testingByFuel"){
		domainHeight = 3000;
		subgroups = ["noCD","noOfFTP","noOfHWY","noOfSC03","noOfUS06"];
		var colorRange = ['pink','green','lightblue','brown',"black"]
	}
	
    var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
            .domain([0,domainHeight])
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
        div
            .html("No of Cars <hr>"+d.value)
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
		  
	  })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.key));
		  div.style('display', 'none');
      })
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value);   })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
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
    		.attr("y", 120)
    		.attr("x", 65)
    		.text(cumSumGas)
		 svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("y", 120)
    		.attr("x", 200)
    		.text(cumSumDies)
		 svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("y", 120)
    		.attr("x", 360)
    		.text(cumSumElectric)
	  svg.append("text")
				.attr("text-anchor", "end")
				.attr("transform", "rotate(-90)")
				.attr("y", -margin.left+10)
				.attr("x", -130)
				.text("Number of Cars")
	  svg.append("text")
				.attr("text-anchor", "end")
				.attr("x", width/2)
				.attr("y", height+30)
				.text("");
	const annotations = [{
        note: {
          label: "These Total Should match for Cars' manufactured and Cars' Tested",
          align:"left",
		  wrap:150
        },
		connector:{
			end:"dot"
		},
        x:250,
		color:["black"],
        y:100,
        dy:-40,
        dx:0,
      }]



    const makeAnnotations = d3.annotation()
        .annotations(annotations)

    svg.append('g')
        .attr('class', 'annotation-group')
        .call(makeAnnotations)
	
    if(legendId == "#vehicleDistributionByFuelLegend"){
		var legends = d3.select(legendId).attr("width", width + margin.left + margin.right)
						.attr("height",100)
						.append("g")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
		
		legends.append("g").append("rect")
		.attr("x",50)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "#BEBD7F" });

		legends.append("g").append("text")
		.attr("x", 175)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "Semi-Automatic"; });

		legends.append("g").append("rect")
		.attr("x", 180)
		.attr("y", 0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "#CDA434" });

		legends.append("g").append("text")
		.attr("x", 255)
		.attr("y",9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "Manual"; });

		legends.append("g").append("rect")
		.attr("x",50)
		.attr("y",25)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "blue" });

		legends.append("g").append("text")
		.attr("x", 175)
		.attr("y", 35)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "Automatic"; });

		legends.append("g").append("rect")
		.attr("x", 180)
		.attr("y", 25)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "#E4A010" });

		legends.append("g").append("text")
		.attr("x", 255)
		.attr("y",35)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "Other"; });
	}	
	
	 if(legendId == "#testingByFuelLegend"){
		var legends = d3.select(legendId).attr("width", width + margin.left + margin.right)
						.attr("height",100)
						.append("g")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
		
		legends.append("g").append("rect")
		.attr("x",0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "pink" });

		legends.append("g").append("text")
		.attr("x", 40)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "CD"; });

		legends.append("g").append("rect")
		.attr("x", 60)
		.attr("y", 0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "green" });

		legends.append("g").append("text")
		.attr("x", 105)
		.attr("y",9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "FTP"; });

		legends.append("g").append("rect")
		.attr("x",120)
		.attr("y",0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "lightblue" });

		legends.append("g").append("text")
		.attr("x", 175)
		.attr("y", 14)
		.style("text-anchor", "end")
		.text(function(d) {return "HWY"; });

		legends.append("g").append("rect")
		.attr("x", 190)
		.attr("y", 0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "brown" });

		legends.append("g").append("text")
		.attr("x", 245)
		.attr("y",9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return "SC03"; });
		
		legends.append("g").append("rect")
		.attr("x", 255)
		.attr("y", 0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return "black" });

		legends.append("g").append("text")
		.attr("x", 310)
		.attr("y",13)
		.style("text-anchor", "end")
		.text(function(d) {return "US06"; });
	}	
}

function TransformChartData(chartData,opts,filterType,year) {
        var result = [];
        var hasMatch;
        var xVarName;
        var yVarName = opts[0].yaxis;
        xVarName = opts[0].xaxis;
			for (var i in chartData) 
			{
				hasMatch = false;
			if(chartData[i]['Fuel'] == document.getElementById('fuelType').value && chartData[i]['Model Year'] == document.getElementById('yearFilter').value )
			{
				for (var index = 0; index < result.length; ++index) {
					var data = result[index];     
					if (data[xVarName] == chartData[i][xVarName]) {
						result[index][yVarName] = Number(result[index][yVarName]) + Number(1);		
						hasMatch = true;
						break;
					}
				}
				if (hasMatch == false)
				{
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
	if(result.length == 0){
			 barChart("");
			 var svg = d3.select("#mainGraph")
            .attr("width", 900)
            .attr("height", 1200)
            .append("g")
            .attr("transform","translate(50,100)");
			 svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-30)")
    		.attr("y", 450)
    		.attr("x", 350)
			.attr("font-size",50)
    		.text("Data not Available")
	}
	else
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
	 //init("onHover",d,"","");
	 location.href = "Scene2.html?selectedBrand="+data.Make;
	}


function barChart(chartData){
	if(chartData.length > 0)
	{
		d3.selectAll("svg > *").remove();
		const svg = d3.select('#mainGraph');
		const width = +svg.attr('width');
		const height = +svg.attr('height');
		const margin = {top:20,right:20,bottom:40,left:100};
		var innerWidth = width - margin.left - margin.right;
		var innerHeight =  height - margin.top - margin.bottom;
		var marketLeader = "";
		var lineWidth = "";
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
		
		const g = svg.append('g')
			  .attr('transform',`translate(${margin.left},${margin.top})`);
		

		g.append('g').call(d3.axisLeft(yscale));
		g.append('g').call(d3.axisBottom(xscale))
				  .attr('transform',`translate(0,${innerHeight})`);
		
		
		g.append("text")
				.attr("text-anchor", "end")
				.attr("transform", "rotate(-90)")
				.attr("y", -margin.left+15)
				.attr("x", -200)
				.attr('class', 'xAxis')
				.text("Manufacturer")
		g.append("text")
				.attr("text-anchor", "end")
				.attr("x", width/2)
				.attr("y", 880)
				.attr('class', 'yAxis')
				.text("Number of Cars Manufactured");
		g.selectAll("rect").data(chartData)
				.enter().append("rect")
				.attr("fill", function(d,i) {if(i==0)return "lightblue"; else return ""; })		
				.attr("y",chartData => yscale(chartData.Make))
				.attr("width",function(d,i){
					if(i== 0) {
						lineWidth = xscale(d.Number);
						marketLeader = d.Make;
						document.getElementById("tempMarketLeader").value = marketLeader;
					}return xscale(d.Number)
					
					})
				.on('mouseover', mouseover)
				.on('mousemove', mousemove)
				.on('mouseout', mouseout)
				.on("click",mouseClick)
				.transition()
				.duration(800)
				.attr("height",yscale.bandwidth())
		
			 var anonotation = "is the market leader with maximum number of car manufactured so far in "+document.getElementById('yearFilter').value;
			
			var x = d3.scaleLinear()
				.rangeRound([0, 900]);
				x.domain([0, height])
    
      annotations = [{
        note: {
          label: anonotation,
          title: marketLeader
        },
		connector:{
			end:"dot"
		},
        x:0,
		color:["black"],
        y:35,
        dy:180,
        dx: 0,
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
        xTrans = d3.interpolateNumber(0,lineWidth+30)
        return function(t){
          annotations[0].x = x(xTrans(t));
          makeAnnotations.annotations(annotations)
          makeAnnotations.update()
        }
      })	
		 
	}	
	else{
		d3.selectAll("rect").remove();
		annotDiv.html("");
		div.html("");
	}
}
			