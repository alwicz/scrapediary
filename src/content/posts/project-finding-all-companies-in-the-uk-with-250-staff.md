---
title: "How To Find All Companies In The UK With 250+ staff (Part 1)"
slug: "project-finding-all-companies-in-the-uk-with-250-staff"
date: "2020-07-15T08:52:03.000Z"
author: "Bryce Davies"
updatedDate: "2020-07-15T08:52:03.000Z"
---

Over the past couple of years, governments have been thinking about ways to tackle inequities the the workplace, especially that of pay between men and women. As it turns out, it is particularly hard to get accurate data across the economy that links an individual's pay, their role and responsibilities at work and their demographic information.

To tackle this, governments around the world are increasing the reporting requirements on companies to disclose this information to the public. In the UK, the government publishes a searchable directory of these reports on their website. In doing so, a new window into many of the nation's largest companies has been opened. For those working top-of-funnel in the B2B space, this creates a massive opportunity to, for the first time, target companies based on their staff size with official validated data. 

At the time of writing Gov.uk maintains a list of over 12 thousand businesses who have or are expected to submit a gender pay gap report. For each business, their industry, staffing level and key personnel details are made public, as well each report submitted since reporting was made law in 2018. This treasure trove of data is truely massive, and if want to make use of it at scale we're going to need a tool to organise this data for us. 
![](https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-14-at-7.44.03-pm.png)
This is where web-scraping comes in. If we want a list of all companies in the UK with more than 250 staff, or we just want to filter it using our own filters, we're going to need to get this data into a CSV format or something similar. To do so, we're going to build a web scraper to visit each individual company page, extract the data and compile it into a format we can use. In building this tool, we'll cover the key concepts of evaluating a website, designing and finally building the scraper. 

### Evaluating a Website for Scrape-ability

Before we begin, we'll firstly check whether we there is anything built into the website making scraping difficult for us. For this site, data is made public under an open license and you don't need to register for an account to access it. This very fact eliminates most of the issues we could possibly encounter with scraping. If we had to handle logging in to this site, our scraper would be much more complicated, and the host site would have a lot more power to track us.

Finally, when browsing this particular website, there doesn't appear to be any data hidden behind buttons or loaded via an infinite scroll. When you scroll down on a website like Facebook or Twitter, Javascript is used to load that additional information as you go meaning for those sites we would need to build something to interact with the browser directly. 

With neither of these posing an issue for us, we can move forward with confidence of a good result.

### Designing the Scraper

Our web scraper is going to simulate a real user interacting with the website, so to design the scraper, we'll first step through the types of pages we want to visit and inspect them for the data we want.

The layout of the website is "paginated", which means rather than displaying all 12 thousand results on one single page, they display 20 results per page and provide "Next Page" and "Previous Page" buttons to help you navigate through them. For each business in the list, a summary is provided including their name, address and industry, but they withhold their company size and the person responsible for the report. 

In order to find the information we want, we would need to click on each business name and look at their individual listing. On the individual listing page we find a list of pay gap reports. Clicking on these reports gives us the information we're looking for, namely the employer size and the person responsible.
![](https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-15-at-9.38.55-am.png)
To sum up, this means we need any potential scraper to be able to do the following;

1. Search for all businesses and click "Next" through each page to collect all business summary information (including links to their individual pages) 
2. Visit these individual pages and find their pay gap reports
3. Visit their pay gap reports and find their staffing details

Ideally we would do this in as few steps as possible. To simplify this, we can take advantage of how the website has structured their pay gap links. As an example, the link for an individual page listing all reports is;

"[https://gender-pay-gap.service.gov.uk/Employer/VVXsrDQT](https://gender-pay-gap.service.gov.uk/Employer/VVXsrDQT/2019)"

and a link to the company's pay gap report for 2019 is;

"[https://gender-pay-gap.service.gov.uk/Employer/VVXsrDQT/**2019**](https://gender-pay-gap.service.gov.uk/Employer/VVXsrDQT/2019)"

You can see from inspecting the links above, to find the pay gap report for any particular year for an individual company, all we have to do is add the year at the end of the link following a forward slash. This means we can further simplify this into two steps;

1. Search for all businesses and find links to their individual employer pages
2. For a particular year we want to search, take the individual page link and add "/2018" at the end to view their 2018 report.

### Building the Scraper

To finalise part one of this project, we're going to begin to work out how a web scraper would find the information we want on this website. A web scraper works by navigating the site just like a real user would, but it won't be able to view it like we do on a screen. Instead, our scraper will be looking at the website's code - the HTML and CSS that makes up the site.
![](https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-09-at-5.05.53-pm.png)
Using the Developer Tools in our web browser, we can view this code alongside the website and work out how our scraper should sift through this information. For this particular site, we can see that the information we want is contained in a list that organises companies down the page. Each list item <li> has a class "document" it uses to style each item. This is extremely handy as we can tell our webscraper to look at each list item with the "document" class to find the details we need.  

Expanding just one of these list items lets us work out what information we need to collect on each individual company.
![](https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-09-at-5.14.03-pm.png)
For an individual company, we want to find the HTML tags that the scraper needs to look at to find the information we want. Breaking this down to its individual components gives us;

- The Company Name - This is given by the <a> element under the heading tag <h2>
- The Individual Page Link - This is given by the "href" attribute on our <a> element that contains the company name. The "href" is the link we want our scraper to visit to find the individual page
- The Address - This is given by the <address> tag 
- The Industry - This is given by the <dd> element with class "metadata-text-label" at the very bottom

Now that we know what elements on the page our web scraper needs to look out for we can begin building these in. In part two, we'll find the elements we need for the individual pay gap report and build a web scraper using [Apify](https://apify.com/) to tie all of this together.

Until next time,

BD
