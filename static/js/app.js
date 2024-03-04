// Save URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
    console.log(data);
    
   
    function init() {

        //create variable for samples data
        let samples = data.samples[0];
        //console.log(samples);

        //save sample values
        let sample_values = samples.sample_values;
        //console.log(sample_values);

        let otu_ids = samples.otu_ids;
        //console.log("otu id's", otu_ids);

        let otu_labels = samples.otu_labels;
        //console.log(otu_labels);

        //BAR CHART
        let barchart = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(otu_id => "OTU" + otu_id).slice(0,10),
            text: otu_labels.slice(0,10),
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            height: 600,
            width: 800,
        };

        Plotly.newPlot("bar", barchart, layout);

        //BUBBLE CHART
        let bubblechart = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                sizeref: 1.2}
        }];
        let layout1 = {
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot('bubble', bubblechart, layout1);

        //DEMOGRAPHIC INFO
        let metadata = data.metadata[0];
        console.log("first metadata", metadata);

        let id_meta = metadata.id;
        let ethnicity = metadata.ethnicity;
        let gender = metadata.gender;
        let age = metadata.age;
        let location = metadata.location;
        let bbtype = metadata.bbtype;
        let wfreq = metadata.wfreq;


        let demInfo = d3.select("#sample-metadata");
        demInfo.append("ul").text(`ID: ${id_meta}`);
        demInfo.append("ul").text(`Ethnicity: ${ethnicity}`);
        demInfo.append("ul").text(`Gender: ${gender}`);
        demInfo.append("ul").text(`Age: ${age}`);
        demInfo.append("ul").text(`Location: ${location}`);
        demInfo.append("ul").text(`bbtype: ${bbtype}`);
        demInfo.append("ul").text(`wfreq: ${wfreq}`);
    
        //DROPDOWN MENU
        let dropdownMenu = d3.select("#selDataset");

        let names = data.names;
        //console.log(names);

        for (let i = 0; i < names.length; i++){
            dropdownMenu.append("option").text(names[i]).property("value", names[i]);
        }

        // let firstsamples = data.samples[0];
        // newName(firstsamples)
    };

    let dataset = d3.select('#selDataset');
    dataset.on("change", newName);

    function newName(){

        let dropdownMenu = d3.select("#selDataset");
        let Name = dropdownMenu.property("value");

        // create variable for samples data
        let samples = data.samples.filter(object => object.id === Name);
        console.log("test0", samples);
        let samplesArray = samples[0];
        console.log("test", samplesArray);

        //save sample values
        let sample_values = samplesArray.sample_values;
        console.log("test2", sample_values);

        let otu_ids = samplesArray.otu_ids;
        //console.log("otu id's", otu_ids);

        let otu_labels = samplesArray.otu_labels;
        //console.log(otu_labels);

        //BAR CHART
        let barchart = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(otu_id => "OTU" + otu_id).slice(0,10),
            text: otu_labels.slice(0,10),
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            height: 600,
            width: 800,
        };

        Plotly.newPlot("bar", barchart, layout);

        //BUBBLE CHART
        let bubblechart = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                sizeref: 1.2}
        }];
        let layout1 = {
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot('bubble', bubblechart, layout1);

        //DEMOGRAPHIC INFO
        let metadata = data.metadata.filter(object => object.id == Name);
        console.log(metadata);
        let metadataArray = metadata[0];
        console.log("meta array", metadataArray);

        let id_meta = metadataArray.id;
        let ethnicity = metadataArray.ethnicity;
        let gender = metadataArray.gender;
        let age = metadataArray.age;
        let location = metadataArray.location;
        let bbtype = metadataArray.bbtype;
        let wfreq = metadataArray.wfreq;


        let demInfo = d3.select("#sample-metadata");
        demInfo.html("");
        demInfo.append("ul").text(`ID: ${id_meta}`);
        demInfo.append("ul").text(`Ethnicity: ${ethnicity}`);
        demInfo.append("ul").text(`Gender: ${gender}`);
        demInfo.append("ul").text(`Age: ${age}`);
        demInfo.append("ul").text(`Location: ${location}`);
        demInfo.append("ul").text(`bbtype: ${bbtype}`);
        demInfo.append("ul").text(`wfreq: ${wfreq}`);
    }

init();

});