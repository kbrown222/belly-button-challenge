let data = d3.json("samples.json");
console.log(data);


//function that initializes the dashboard

//function that updates the dashboard

//function that populates the meta data
function demoInfo(sample)
{
    //console.log(sample);

    //use d3.json inorder to get the data
    d3.json("samples.json").then((data) => {
        //grab all of the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        //filter based on the value of the sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        //clear the metadata
        d3.select("#sample-metadata").html(""); //clears the HTML

        //use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            //add to the sample data / demographics
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });

    });
}
//function that builds the graphs
function buildBarChart(sample)
{
    //console.log(sample);
    //let data = d3.json("samples.json")   
    //console.log(data);

    d3.json("samples.json").then((data) => {
        //grab all of the samples
        let sampleData = data.samples;
        //console.log(sampleData);

        //filter based on the value of the sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        //get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        //build the bar chart
        //get the yTicks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textlabels = otu_labels.slice(0, 10);
        //console.log(xValues);
        //console.log(textlabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textlabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);

        /*
        //clear the metadata
        d3.select("#sample-metadata").html(""); //clears the HTML

        //use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            //add to the sample data / demographics
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
        */
    });
}

//function that builds the bubble chart
function buildBubbleChart(sample){
    //console.log(sample);
    //let data = d3.json("samples.json")   
    //console.log(data);

    d3.json("samples.json").then((data) => {
        //grab all of the samples
        let sampleData = data.samples;
        //console.log(sampleData);

        
        //filter based on the value of the sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        //get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        //build the bubble chart
        
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Culture Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);

        /*
        //clear the metadata
        d3.select("#sample-metadata").html(""); //clears the HTML

        //use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            //add to the sample data / demographics
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
        */
    });
}


//function that initializes the dashboard
function initialize()
{
    //let data = d3.json("samples.json")   
    //console.log(data);
    //access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    //use d3.json in order to get the data
    d3.json("samples.json").then((data) => { 

        let sampleNames = data.names; //made an array of just the  name
        //console.log(sampleNames);

        //use foreach sample to create an option
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        //when initilized pass in the information for the first sample
        let sample1 = sampleNames[0];
        //call the function to build the metadata
        demoInfo(sample1);
        //call funtion to build the bar chart
        buildBarChart(sample1);
        //call function to build the bubble chart
        buildBubbleChart(sample1);
    });
  
}

//function that updates the dashboard
function optionChanged(item)
{
    demoInfo(item);
    //console.log(item);
    //call funtion to build the bar chart
    buildBarChart(item);
    //call function to build the bubble chart
    buildBubbleChart(item);
}

//call the initialize function
initialize();

