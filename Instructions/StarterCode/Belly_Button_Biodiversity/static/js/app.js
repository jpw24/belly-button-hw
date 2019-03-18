function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var dest=d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    d3.select('#sample-metadata').node().value="";
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    dest.selectAll("table").remove();
    dest.selectAll("tr").remove();
    dest.selectAll("td").remove();
    var hlp=dest.append("table");

    var test_sample=d3.json("/metadata/".concat(sample)).then(function(response){
      Object.entries(response).forEach(([key,value])=>{
        var tmp=hlp.append("tr");
        tmp.append("td").text(key);
        tmp.append("td").text(value);
      });
      
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  //d3.json(sample).then(function(data){
   /// var data=[data];
  //});
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    //var layout={height:400,width:500};
    //var trace1 = [{
     // values: data[0].sample_values,
      //labels: data[0].otu_ids,
      //type: 'pie'
    //}];
    //console.log(data[0].sample_values)
    //Plotly.newPlot('pie', trace1, layout);


    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
