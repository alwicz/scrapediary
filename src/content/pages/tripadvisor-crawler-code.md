---
title: "Tripadvisor Crawler Code"
slug: "tripadvisor-crawler-code"
date: "2026-03-26T00:00:00.000Z"
author: "Bryce Davies"
updatedDate: "2020-09-01T14:56:49.000Z"
---

Use the code below to Crawl Tripadvisor for restaurant contact information.

Step 1 - Copy [this actor into your Apify account](https://apify.com/apify/web-scraper#enqueuerequestrequest-options-asyncfunction) ( create a free Apify account if you don't have one already)

Step 2 - Copy the code below into the "Page Function" section of the Apify task

Step 3 - On Tripadvisor, search for Restaurants in your target city or state. Copy the link into the Start URL section and click run.

Example Link - [https://www.tripadvisor.co.uk/Restaurants-g60763-New_York_City_New_York.html](https://www.tripadvisor.co.uk/Restaurants-g60763-New_York_City_New_York.html)

    async function pageFunction(context) {
        
        var $ = context.jQuery;
        var results = [];
        var base_url = "https://www.tripadvisor.co.uk"
    
        //if page is a restaurant review, run the code below, otherwise
        // we're on a restaurant listing page
        if (context.request.url.includes("Restaurant_Review")){
            
            //email is in a mailto: format with ?subject at the end
            // clean this up before output
            var mail_string = $('.ui_icon.email').closest('a[href]').attr('href')
            var mail_parts = mail_string.split(':')
            var mail_parts2 = mail_parts[1].split('?')
            var mail = mail_parts2[0]
    
            // get the scheme from the script in the <head> section
            // this includes address info as well as restaurant name
            var schema = JSON.parse($('script[type="application/ld+json"]').first().text());
        
            results.push({
                name: schema.name,
                email: mail,
                website : $('.ui_icon.laptop').closest('a[href]').attr('href'),
                telephone: $('.ui_icon.phone').closest('span:not([class])').text().trim(),
                street: schema.address.streetAddress,
                postal: schema.address.postalCode,
                city: schema.address.addressLocality,
                country: schema.address.addressCountry.name
                
    
            });
        //if we're on a restaurant listing page, for each restaurant listing
        // ad their review link to the scraping queue
        }else{
            $('div[data-test*="list_item"]').each(function() {   
                var link = base_url.concat($(this).find('a').eq(0).attr('href'))
                context.enqueueRequest({ url : link })
    
            });   
    
            //add the link to go to the next page of results to the scraping queue
            var link2 = base_url.concat($(".next").attr('href'))
            context.enqueueRequest({ url : link2 })
    
        }
    
        return results
    
    }
