---
title: "Find Prospects with Google Places API and Sheets"
slug: "find-local-leads-with-google-places-api-and-sheets"
date: "2026-03-26T00:00:00.000Z"
author: "Bryce Davies"
updatedDate: "2024-04-17T15:50:15.000Z"
---

No matter what business you're in, geography is almost always a factor when it comes to finding new customers. Depending on your target market, your customers may be grouped together more than you think, especially if you're selling B2B. Think of your local CBD, or industrial park. Whether you service multiple countries or just trade in a single city, being able to find potential customers on a map is a huge asset to building your business. 

If you're searching for leads in a local area, it helps to have a vast data source that matches target customers to their location on the map. Even better, one that provides contact details and other indicators to help you filter them. As a lead source, Google Maps is probably one of the most overlooked sources of business information for this purpose and given the sheer volume of data it holds, one that you should add to your toolbox today. 

One of the reasons Google Maps is often overlooked is it is not entirely straightforward how to extract data from it in a useful way. Like other tech giants, Google actively blocks web scraping platforms from access its products. Google does however provide an API - The Google Places API, which we can tap in to source this information. The only downside is that for most of us, API's can be difficult to understand and use. It's time to change that and build a nicer interface for the Places API. 

As accessible as a Google Sheets function...

### Making the Places API More Accessible

What we need is a system that makes the Places API data more accessible and allows us to deliver the information in a form that we're familiar with. As far as familiarity goes, Google Sheets and the ability it has to write custom functions serves as the perfect playground for the Places API, provided we can build a custom function to handle everything for us.  In this article, we'll step through how to get set up with a Google Places account and how to begin using these functions right away.

### What is the Places API For?

As a quick introduction to the Google Places API, Google provides this service for other software vendors that want to display nearby businesses in their software or app. It works just like Google Maps in your browser, in that you can search within a certain radius for businesses around any point on a map. Any business you can find as a result of running a search in Google Maps you can find using the Places API, so it's worth thinking of the Places API as the backend behind Google Maps, just minus the map interface. 

The Places API provides lots of useful tools, but we're focused on two of them;

1. Place Search
2. Place Details

As the name suggests, Place Search allows us to search for businesses in a given area, with Google providing a list of suggestions based on our search query. We can use a text search term, like “Harry’s Diner” or search using a telephone number. We're also able to filter our results using a Place Type, which is a set of business types such as *restaurant*, *hairdresser* or *gym*. If a Place Type is supported for the type of business we're targeting, we can ensure our search only returns leads in our target market. A full list of place types are available [here](https://developers.google.com/places/web-service/supported_types). 

When we make a Place Search, we get back a list of businesses with an overview of their details, such as name, location and their Place ID. If we want more information about the business such as their website, telephone number or opening hours, we'll need to use tool number 2 - Place Details.

Place Searches return Place ID's, which we use as input for a Place Details search. Using Place Details google can provide us further information about the business, like website, address, business hours, reviews, etc for a single business. This means for each result of our Place Search, we run one Place Detail request. Using the two together give us a powerful tool for extracting businesses in a local area that meet our search criteria. 

### Using the Google Places API in Google Sheets

In API form, the Places API can be inaccessible to anyone without a developer background. However, wrapping the API up in a Google Sheets function allows us to access the API directly with exactly the same functionality. To save you time, two functions are now available in the Code library - placeSearch() and placeDetails().

PlaceSearch takes the following inputs;

1. Keyword - the keyword you want to search by
2. Latitude - Latitude of the point at the centre of your search radius
3. Longitude - Longitude of the point at the centre of your search radius
4. Radius - The radius of your search circle
5. Depth - The number of pages of results to search over ( 1 = 20 results, 2 = 40 etc )
6. API Key - Your Google Places API Key

As an example, the function below will find Golf Courses within 20km of Central London at maximum depth (20 pages of results is the most Google can give). 

placesAPI("Golf Course","51.4977836","-0.1522502","20000","*your-api-key*",20) 

Using placeSearch() you will automatically fill your Google Sheet with business results, including their name, latitude, longitude, Place ID and the Place Type. To get additional results for each business, placeDetails() is available to search the Place API and return the additional fields, all it needs is the following;

1. Place ID - the unique Google Place ID provided by placeSearch()
2. Fields - list of fields to return comma separated - [full list here](https://developers.google.com/places/web-service/details#fields)
3. API Key - Your Google Places API Key

As an example, the function below will perform a Place Detail request for your place ID and give you the business name, website and telephone number.

placeDetails(*your-place-id*,"name,website,formatted_phone_number","*your-api-key*")

Using the two together, you can quickly generate lists of local businesses in your area along with contact information and other details.

### Signing Up For a Google Places Account

In order to use these functions, you will need to create an account with Google to access the Places API and generate an API Key. You will need to enter billing information, but as of the time of writing, Google provides ample free credits to get you started.

Sign up for an account [here](https://cloud.google.com/maps-platform/#get-started) and then following the steps [here](https://developers.google.com/places/web-service/get-api-key) to generate your API Key. Remember - your API key acts like a password to access the service. Protect it like you would any other password as anyone with your API Key can make requests that are charged to your account.

### Making These Functions Available in Google Sheets

Once you have your API key, you're almost ready to begin generating leads with the Google Places API. As a final step, you will need to copy the code in the Code Library into a Google Apps Script. To do this, open a blank spreadsheet in Google Sheets and under Tools, select Script-Editor.

This will open the Google Apps Script Editor. In your blank project, remove all code with code copied from the Code Library and then save your project. These functions will now be available in your Google Sheet environment. 

Try it out! To search for Golf Courses within 20km's of Central London, you can use the following;

=placesAPI("Golf Course","51.4977836","-0.1522502","20000","*your-api-key*",20)

Happy searching!

Bryce
