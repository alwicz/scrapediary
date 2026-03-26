---
title: "Part 2 - Finding All Companies In The UK With 250+ Staff"
slug: "part-2-finding-all-companies-in-the-uk-with-250-staff"
date: "2026-03-26T00:00:00.000Z"
author: "Bryce Davies"
updatedDate: "2020-07-22T14:07:40.000Z"
---

In Part 1, we explored the UK Gov’s Gender Pay Gap Service and broke down what a scraper might look like for extracting over 12 thousand businesses results from the site. We finished off Part 1 by diving into the Chrome Developer tools to find the HTML tags our scraper would need to access the overview information on each company. 

In this Part 2, we’ll find the HTML tags our scraper will need to extract data from each individual pay gap report and finish up by building a scraper to extract all 12 thousand results using Apify. In case you missed in, [jump back to Part 1](/project-finding-all-companies-in-the-uk-with-250-staff/) for a full recap.

### Extracting Information from the Pay Gap Report

As we did with the overview page, we’ll need to dive back into the Chrome Developer tools to find the HTML tags for our scraper. This data is structured slightly differently, as we now no longer have a list of items to deal with but a single page. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-21-at-3.15.01-pm.png" alt="" loading="lazy"></figure>

On this page all the information we’re looking for lives under a tag called “employer-report-metadata” which gives our scraper a sign to look out for. For the page design, three <div> tags seperate the Snapshot Date, Employer Size and Person Responsible information, with classes “metadata-text-label” and “metadata-text-value” denoting the Label and the Result. 

    <dl class="metadata employer-report-metadata">
    	<div>
    		<dt class="metadata-text-label">Snapshot date</dt>
            <dd class="metadata-text-value">5 April 2019</dd>
       	</div>
        <div>
        	<dt class="metadata-text-label">Employer size</dt>
            <dd class="metadata-text-value">
                        250 to 499 employees
            </dd>
        </div>
        <div>
        	<dt class="metadata-text-label">Person responsible</dt>
            <dd class="metadata-text-value">
            	<span>Ian Hardcastle</span>
                <br>
                <span>(Chief Operating Officer)</span>
            </dd>
       </div>

On the third <div> down we see the “metadata-text-value” includes two <span> tags which separate the contact's name from their title. This is helpful as it allows us to split the name and title out into seperate columns. 

This gives us most of what we need, but there is one more useful bit of information left over on this page. Given the company data we’re getting here is based on the company's registered business name, we’ll want some way to link their to their trading name or website. On some of these listings, the listed business has provided a link to their website to explain the results in the report. Capturing this link is extremely helpful as we can visit it later to extract direct contact details. 

    <div style="margin: 10px auto;">
    	...
    </div>
    
    <div style="margin: 10px auto;">
    	...
    </div>
    
    <div style="margin: 10px auto;">
    	<a href="https://reallifeoptions.org/" ...</a>
    </div>

Just below the Snapshot, Employer Size and Person Responsible elements, there are three <span> tags that seperate the links in this section. For those companies that wish to provide a link to their website, this is found in the third <div> down. Note that these divs have a style attribute which we can use to seperate these from other <div> tags on the page.

With our HTML tags all mapped out, the only thing left to do is build our scrapers.

### Web Scraping with Apify

For those not familiar, Apify is a web scraping platform that allows you to build powerful web scrapers. Apify allows you to control a Headless Chrome Browser that will visit your target website and extract the information on the page. Using a Headless Chrome Browser provides a lot of power here as we can extract all the information that is displayed on a website, even dynamic data that you could only get by clicking a button, submitting a form, or waiting on a page. Apify provides a web scraper template to get started with that gives us all the functionality we need right out of the box. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/chrome-capture--1-.gif" alt="" loading="lazy"></figure>

If you recall from Part 1, we proposed to build two scrapers. One scraper would click through the list of businesses, extracting the overview details and getting the links to the individual pay gap reports. A second scraper would then visit each of these individual pay gap reports and pull out the information using the tags we mapped out above. Scraper 1 which we'll call the "Overview Scraper" would need the ability to click the “Next” button on each page to get a new page of results to add to the list. Scraper 2 or the "Report Scraper" would then visit each of these and pull out the information, before closing the page.

### Building the Overview Scraper in Apify

For our first scraper we’ll want to start it at page one of the results page and we’ll want it to click “Next” through each subsequent page. Apify gives us a Link Selector option where we can tell it which links to click to add pages to the scraping queue. This option takes a CSS selector, which is a bit of code that tells Apify exactly which link to collect. Remember, the scraper can’t see the screen, it can only see the HTML and CSS we found in the developer tools.

We’ve decided to use the CSS selector *.pagination-next >* a which tells Apify to click on the <a> tag which is a “child” or nested underneath the element with class “pagination-next” which we found in Part 1 was the class of the Next button. Adding this into the link selector will ensure Apify can step through each page of results in order to run our code over all 12 thousand businesses. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-22-at-3.01.05-pm.png" alt="" loading="lazy"></figure>

Now that we have Apify stepping through each page, we need to tell it what information we want to extract. From Part 1, we determined each individual businesses information was held in a list item with class “document” and inside that list item, each one held the information in a div with class “comparison-employer-container”.

One of the most powerful parts of an Apify web scraper is the "Page Function" section, which allows us to write our own code which the scraper will execute on each page is visits. On our Page Function we've written some javascript code that selects the elements we want and formats them for output;

    $(".comparison-employer-container").each(function() {
                results.push({
                    name: $(this).find('h2').text().trim(),
                    link: base_url.concat($(this).find('a').attr('href')),
                    address: $(this).find('address').text().trim(),
                    industry: $(this).find(".metadata-text-value").text().trim()
    
                });     
        });

Overview Scraper Code
In the code above $(".comparison-employer-container") is JQuery code which selects the information for each business in the list. The following "each" function steps through each business result and returns the information we want.

On each result, we're looking for four bits of information, the business name, the link to the individual report, the address and the industry. We use the find() function to select the HTML tags, for instance find('h2') finds the <h2> tag and find('a') finds the <a> link. Using the text() and trim() functions, we convert the information in these tags to text and trim any spacing around the result. Finally we store the result in our "results" array for output. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-21-at-3.49.59-pm.png" alt="" loading="lazy"></figure>

Now that we’re done building, we can start the scrape, with Apify providing logging and access to the results in real time. In a few minutes, we get a list of all 12K+ businesses and most importantly, a link to their individual page we can use to find the pay gap report. As mentioned in Part 1, we can add /2018 to each link in order to find the individual report for the 2018 reporting year. These links will be the input we give to the individual report scraper. 

### Building the Individual Report Scraper

Now that we have a list of links to the individual reports for each business, we can give this to our "Individual Report Scraper", which will visit each link and pull out the information we need. For these pages, we don’t need to click any links or navigate around the page, we just need to extract the information displayed. This means scraping these pages will be much simpler.

    results.push({
            company_name: $('#OrganisationName').text().trim(),
            report_date: $('.employer-report-metadata').find('.metadata-text-value').eq(0).text().trim(),
            employer_size: $('.employer-report-metadata').find('.metadata-text-value').eq(1).text().trim(),
            contact_name: $('.employer-report-metadata').find('.metadata-text-value').eq(2).find('span').eq(0).text().trim(), //.find('span').eq(0).text().trim()
            contact_title: $('.employer-report-metadata').find('.metadata-text-value').eq(2).find('span').eq(1).text().trim(),
            website: $('.employer-report-metadata').find('a').eq(2).attr('href')
        });

Individual Report Scraper Code
Our  Page Function for these pages will simply use JQuery to select the elements we need and return these. As you can see we continue to use the find() function to grab the elements we want as well as text() and trim(). In this version, we also use the eq() function, which allows you to select an individual result from a list of results. For instance, find('span') in our case returns two results, the <span> tag that gave the contact's name and the <span> tag that gave the title. Using eq(0) we can select only the first item in that list - being the name, and eq(1) for the second item - the title. 

With our Page Function written, we're ready to start the scraper. For the report scraper however, we want it to visit multiple links, not just one. Luckily Apify lets us provide a file with a batch of links to visit and extract rather than just a single URL to start at. As there are over 12 thousand pages, the scraper will take some time to step through each page, but once complete you will be left with a CSV file of results ready to download.

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-21-at-3.56.35-pm.png" alt="" loading="lazy"></figure>

### Finishing Up

Now that we've completed our scrape, we ended up with details for approximately 12 thousand businesses in two files, one that gives the overview information and another that gives the individual report information. Stitching these together with in Google Sheets gives a complete list like the below;

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-21-at-4.06.22-pm.png" alt="" loading="lazy"></figure>

Using the techniques in this project, you will be able to scrape just about any website without a login screen or employing anti-web scraping, so get thinking about what websites you could build a scraper for with this template. With that, I'll leave this in your hands!

Happy Scraping

BD

Ps, I recorded two how-to videos for this project now available in the [Video Tutorials section](/p/cb34ec97-30d8-47b6-8e32-6cc155bb1288/blog.scrapediary.com/video-tutorials). If you would like a further walkthrough, I'd strongly recommend watching those. 
