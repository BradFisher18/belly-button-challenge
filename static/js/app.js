// Save URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
    console.log(data);

    function init(){
        //SELECT DROPDOWN MENU IN HTML
        let dropdownMenu = d3.select("#selDataset");

        //SAVE LIST OF NAMES
        let names = data.names;
        //console.log(names);

        //LOOP THROUGH NAMES AND DISPLAY IN DROPDOWN MENU
        for (let i = 0; i < names.length; i++){
            dropdownMenu.append("option").text(names[i]).property("value", names[i]);
        }
        
        //ASSIGN FIRST NAME AND RUN IN showData FUNCTION
        let initName = names[0];
        //console.log("first name", initName);
        showData(initName);
    }

    //ASSIGN NEW NAME WHEN TEST SUBJECT SELECTED FROM DROPDOWN AND PLOT THROUGH showData FUNCTION
    function newName(Name){
        let dropdownMenu = d3.select("#selDataset");
        let newName = dropdownMenu.property("value");
        showData(newName)
    }

    //ASSIGN EVENT TO newName FUNCTION
    d3.select('#selDataset').on("change", newName);

    function showData(Name){

        // CREATE VARIABLE FOR SAMPLES DATA AND CONVERT TO ARRAY FOR SPECIFIED NAME
        let samples = data.samples.filter(object => object.id === Name);
        //console.log(samples);
        let samplesArray = samples[0];
        //console.log(samplesArray);

        //SAVE SAMPLE VALUES
        let sample_values = samplesArray.sample_values;
        //console.log(sample_values);
        
        //SAVE OTU IDS 
        let otu_ids = samplesArray.otu_ids;
        //console.log("otu id's", otu_ids);

        //SAVE OTU LABELS
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
        //Save metadata values, filtering by Name
        let metadata = data.metadata.filter(object => object.id == Name);
        //console.log(metadata);
        let metadataArray = metadata[0];
        //console.log("meta array", metadataArray);

        //Save metadata info
        let id_meta = metadataArray.id;
        let ethnicity = metadataArray.ethnicity;
        let gender = metadataArray.gender;
        let age = metadataArray.age;
        let location = metadataArray.location;
        let bbtype = metadataArray.bbtype;
        let wfreq = metadataArray.wfreq;

        // Select HTML table and append with metadata
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