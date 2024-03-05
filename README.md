# belly-button-challenge
Module 14 Challenge
## Summary
In this challenge, a Javascript code is created to read in data showing belly button microbial species present in a sample of humans. This is represented in a HTML file showing a bargraph of the top ten OTU's present in each person, a bubble chart of OTU samples, and a table showing the persons demographic data.
## Data
The data provided in samples.json file holds three dictionaries; names, metadata, samples. The dataset contains a total of 153 names, in which the metadata and samples dictionaries refernce.\
The metadata dictionary contains demographic information of each person including:
* id (also the persons name)
* ethnicity
* gender
* age
* bbtype
* location
* wfreq

The samples dictionary contains bacteria information including:
* id (also persons name)
* otu id
* otu labels
* sample values

## Outputs
The output HTML file is named index.html, while the Javascript code is located in the static.js directory under the file name app.js. Opening the HTML will display the following visualistion:
* Test subject ID No. dropdown selection list
* Demographic information table, showing the values located in the metadata dictionary
* Horizontal bar graph of the top 10 sample values of each otu ids, with hover text showing bacteria name
* Bubble chart displaying OTU ID versus sample values, with the marker size relative to sample value, and marker value relative to otu id.

The information shown on the HTML is for the selected id, with the initial visualisations showing id 940. By selecting a different id from the drop down list, the page will refresh to display the corresponding data for that id.
## Running
This challenge is available at the following github page; https://bradfisher18.github.io/belly-button-challenge/ \
Alternatively, to access the index.html file, a web browser is required. To view the Javascript code, select inspect within the browser and select the Sources tab. If preferred, an easier editor is Visual Studio Code (link to install below)\
Visual Studio Code install: https://code.visualstudio.com/download
