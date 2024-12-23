// Build the metadata panel
function buildMetadata(targetSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let allMetadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let myMetadata = allMetadata.filter(x => (x.id == targetSample))[0];
    console.log('myMetadata', myMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let printingPanel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    printingPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    let ul = printingPanel.append('ul');
    
    for (var key in myMetadata) {
      ul.append('li').text(`key + ":" + myMetadata[key] + " ")}
    });
}
  

// function to build both charts
function buildCharts(targetSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    //https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json
    let samples = data.samples;
    // Filter the samples for the object with the desired sample number
    let mySample = samples.filter(x => (x.id == targetSample))[0];
    console.log('mySample', mySample);
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = mySample.otu_ids;
    let otu_labels = mySample.otu_labels;
    let sample_values = mySample.sample_values;

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };

    let bubbleData = [bubbleTrace];

    var bubbleLayout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 600
    };
   
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID => 'OTU ${otuID} ');

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var data = [{
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      orientation: 'h'
    }];

    // Render the Bar Chart
    Plotly.newPlot('bar', data);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of #selDataset
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for(let ii = 0; ii<names.length; ii++) {
      // add an Option to the dropdown
      let myName = names[ii];
      dropdown.append('option').text(myName);
    }

    // Get the first sample from the list
    let firstName = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstName)
    buildCharts(firstName)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();



