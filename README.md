# Belly-button-challenge
In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity dataset provided, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

I used the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json 

I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that sample.

I created a bubble chart that displays each sample.

The page displays the sample metadata and each key-value pair from the metadata JSON object and all plots are updated when a new sample is selected.

# References

Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/