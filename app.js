//  Read in samples.json
d3.json("samples.json").then((data) => {
    console.log(data);
});

// Charts
function buildCharts(sample) {

    // Sample data
    d3.json("samples.json").then((data) => {
        var sampleData = data.samples;
        console.log(sampleData)

        // Filter object by id
        var object = sampleData.filter(sampleObject => sampleObject.id == sample)[0];
        console.log(object)

        // Set variables
        var sampleValues = object.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var otuIds = object.otu_ids;
        console.log(otuIds);

        var otuLabels = object.otu_labels.slice(0, 10).reverse();
        console.log(otuLabels);

        var yaxis = otuIds.map(sampleObject => "OTU" + sampleObject).slice(0,10).reverse();

        // Bar chart
        var barChart = [{
            x: sampleValues,
            y: yaxis,
            text: otuLabels,
            type: "bar",
            orientation: "h"

        }];

        Plotly.newPlot("bar", barChart);

        // Bubble Chart
        d3.json("samples.json").then((data) => {
            var sampleData = data.samples;
            var object = sampleData.filter(sampleObject => sampleObject.id == sample)[0];
            
            var bubbleData =  [{
                x: object.otu_ids,
                y: object.sample_values,
                mode: "markers",
                text: object.otu_labels,
                marker: {
                    size: object.sample_values,
                    color: object.otu_ids
                 }
            }]; 
        

            Plotly.newPlot("bubble", bubbleData);
        });
    

    });
}    

