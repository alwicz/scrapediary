---
title: "Tripadvisor's Anti-Crawler Tactics and How to Generate Business Leads"
slug: "tripadvisors-anti-crawler-tactics-and-how-to-generate-business-leads"
date: "2020-09-01T15:42:00.000Z"
author: "Bryce Davies"
updatedDate: "2024-04-18T12:18:16.000Z"
tags: ["Lead Generation"]
---

For a business selling into a particular industry or niche, the ultimate question is - where can I find a list of potential customers? Finding a place online where your potential customers are listed is a great first step to targeting them. If the site is publicly available and has contact details listed as well, this can turn in to a goldmine, leading to thousands of dollars in revenue.

Of course rather than finding a publicly available site, you could decide to use a lead generation businesses to generate lists for you, but they can often be expensive, and the quality can vary widely depending on the vendor. Owning the lead generation process from start to finish, from the top of the funnel all the way to the bottom is the best way to ensure you get high quality leads that actually convert.

For a business selling into the hospitality industry, Tripadvisor is an absolute goldmine of information, complete with business name, address, comments and ratings and critically, email and telephone information. Given how rich the site is with contact information, it's no surprise Tripadvisor has taken steps to make their website hard to scrape to protect against spammers. In this post we'll build a scraper that works around these protections and generates contact details we can use to run marketing campaigns.

## Building our own Tripadvisor Web Scraper

Our original hope for this post was to use an out of the box web scraper, such as the [Tripadvisor prebuilt scraper](https://apify.com/maxcopell/tripadvisor) on the Apify Store, but given how often Tripadvisor has been making changes on their website to throw off would-be scrapers, I wanted to go deeper and show what they have done to make it harder, and how we can work around it.

For this project, we're going to be using [Apify's generic web scraper](https://apify.com/apify/web-scraper)  from their store as a base, which you can copy directly into your account.

Using the generic web scraper, we'll be writing our own code to extract the data we need. If you're looking for the finished code, this is now available in the [Code Library](https://scrapediary.com/tripadvisor-crawler-code/). Bear in mind Tripadvisor can change their website layout at any time, so read on below for how to keep up with those changes.

## How Tripadvisor Designs Their Site To Frustrate Scrapers

In this post, we'll be attempting to build a web scraper that extracts restaurant listing from the website. As an example, to find restaurants listed in New York, simply head to Tripadvisor, select Restaurants and the Location to search in and you will find hundreds or thousands of results.

Clicking in to an individual result will show key information about the business including their reviews, menu and contact information.

In our scraper, at the very minimum we want to be able to extract the address, website, email and telephone number along with the business name to get complete contact details for the restaurant. However, when we dive into the website code, you'll notice something strange about the way they're writing their HTML.

Inspecting the Location and Details tab using the Chrome Developer tools gives us the following code.

As you can see from above, each element has a class name with random letters and numbers. Ordinarily when we're scraping a website, using the class name is by far the easiest way to select information on the website. Tripadvisor now appears to be generating random classes for the elements on the page which could change at any time. This could frustration our ability to select the details we need if this changed in the future or between individual pages.  

Not only that, each element in this section is nested under multiple other tags. For instance, the code "Website" link looks like so;

To get to the <a> tag where the website link is listed, we need to go down through 2 sets of <div> and a <span>, with subtle changes made between pages. In order to crawl Tripadvisor to generate business leads, we're going to need to try a slightly different approach.

## Designing a Scraper to Crawl Tripadvisor

As we saw before, we can't use the tactics we would normally use to scrape this website, as the class names we would normally search for may change across the side, as well as subtle formatting changes. We will need to find elements on this page that don't change and find the information we need from there.

### Finding the Website, Email and Telephone

If we look back at the website, we'll notice there are some things that don't change when we look at the listing, namely the icons next to each of the bits of information we want;

Better yet, each of these icons has a class name that stays the same on each page. As you can see from the HTML below, the laptop icon is wrapped in a class called "laptop".

We know that Tripadvisor will want to show this laptop icon on each page where they show the website link. Even better, if Tripadvisor does not have a website on file for that restaurant, they won't show it or the icon, meaning we can know for sure when it isn't listed on the page. If we can write a line of code that finds the *nearest *link, or <a> tag to that icon, that is very likely to be the link to the restaurants website.

### Finding the Restaurant Address and Other Information

Looking at the Tripadvisor website, they load a number of scripts in the <head> section of their website. A lot of these are used to provide information to search engines and other sources, and one actually provides much of the information we're looking for from this site.

As you can see when inspecting the script towards the bottom, the address is broken down into parts such street address, city and post code, which make it much nicer to work with than the address on the page. Better yet, because this script is loaded on each page, we don't need to worry about the format changing like it does with other elements. Converting this code into a format we can use means we can get the address, as well as the restaurant name in a nicely structured way.

## Putting It All Together

Like most list websites we want to scrape, there are essentially two types of pages we'll be visiting. The first page is one that lists the restaurants in the city we're searching in, and allows us to click through each page of the listing. The second is the individual restaurant listings themselves. To build a scraper that can handle both of these pages in one, we simply check the website we're on and act accordingly

➡️

[Listing Page ](https://www.tripadvisor.co.uk/Restaurants-g60763-New_York_City_New_York.html)

➡️

[Individual Link Page ](https://www.tripadvisor.co.uk/Restaurant_Review-g60763-d4363835-Reviews-Piccola_Cucina_Osteria-New_York_City_New_York.html)

As you can see from the links above, listing pages have the format **Restaurant-** then the name of the location for the listing. Individual pages will have the form **Restaurant_Review- **then name of the individual restaurant. Using this format means we can check whether the website we're visiting has "Restaurant_Review" in the link and run the extraction for contact details, otherwise we'll be adding individual restaurants from the list to the queue to scrape.

As it turns out, each restaurant listed on the listing page is wrapped in a <div> with an attribute "data-test" set to the listing number plus "list_item". If we step through each <div> with a data-test attribute containing "list_item" and find the link in each one, we can ensure we add each of these restaurants to the queue to scrape their individual details.  

## Key Takeaways

Tripadvisor is an excellent source of business contact details for Restaurants, Hotels and Tourist attractions, so it's no wonder that Tripadvisor designs their website to make it harder for sales and marketing teams to crawl it. [Using the code in the Code Library](https://scrapediary.com/tripadvisor-crawler-code/), you can begin scraping it right away by following the instructions, but a word of warning - Tripadvisor can change their site format at any time without notice.

Learning how to maintain and update scrapers as the website changes is critical if you're running campaigns over a long period of time. Using some of the techniques in this article you can maintain your scrapers and hopefully produce less work fixing them in the long run. While the website stays the same, the code above will pull out detailed restaurant contact details like below.
