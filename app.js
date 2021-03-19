//  Read in samples.json
d3.json("samples.json").then((data) => {
    console.log(data);
});

// Build Charts
function buildCharts(sample) {

    // Data Samples
    d3.json("samples.json").then((data) => {
        var sampleInfo = data.samples;
        console.log(sampleInfo)

        // Filter object by id
        var results = sampleInfo.filter(sampleObj => sampleObj.id == sample)[0];
        console.log(results)

        // Set variables 
        var sampleValues = results.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var otuIDs = results.otu_ids;
        console.log(otuIDs);

        var otuLabels = results.otu_labels.slice(0, 10).reverse();
        console.log(otuLabels);

        var yticks = otuIDs.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();
        
        // Bar chart
        var barData = [{
            x: sampleValues,
            y: yticks,
            text: otuLabels,
            type: "bar",
            orientation: "h"

        }];

        //Plot
        Plotly.newPlot("bar", barData);

        // Bubble Chart
        d3.json("samples.json").then((data) => {
            var sampleInfo = data.samples;
            var results = sampleInfo.filter(sampleObj => sampleObj.id == sample)[0];
            
            var bubbleData =  [{
                x: results.otu_ids,
                y: results.sample_values,
                mode: "markers",
                text: results.otu_labels,
                marker: {
                    size: results.sample_values,
                    color: results.otu_ids
                 }
            }]; 
        
            //Plot
            Plotly.newPlot("bubble", bubbleData);
        });
    });
}


// Drop down menu
function init() {
    var dropDown = d3.selectAll("#selDataset");

    // Add sample names to a variable
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            dropDown
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);

    });
}

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();

