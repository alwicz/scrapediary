---
title: "Apify Code Examples"
slug: "apify-code-examples"
date: "2020-07-15T12:36:43.000Z"
author: "Bryce Davies"
updatedDate: "2020-07-28T21:20:08.000Z"
---

**Scraper 1 - UK.gov's Gender Pay Gap Service - Apify Code**

Overview: Scraper will click through paginated list of Businesses and pull out their Business Name, Link to their Individual Report Page, Address and Industry. Combiner with Scraper 2 below to visit each Pay Gap report individually once collected.  

    async function pageFunction(context) {
        
        var $ = context.jQuery;
        var results = [];
    
        var base_url = "https://gender-pay-gap.service.gov.uk"
    
        $(".comparison-employer-container").each(function() {
                results.push({
                    name: $(this).find('h2').text().trim(),
                    link: base_url.concat($(this).find('a').attr('href')),
                    address: $(this).find('address').text().trim(),
                    industry: $(this).find(".metadata-text-	value").text().trim()
    
                });
                
               
        });
        
        return results
    }

Use: Copy this into the PageFunction section of your Apify web scraper task and include *.pagination-next > a *as your link selector.

**Scraper 2 - UK.gov's Gender Pay Gap Service - Apify Code**

Overview: Scraper will visit individual gender pay gap report and pull out the Company Name, Report Data, Number of Employees, Contact Name, Contact Title and link to Company's website (if available). 

    async function pageFunction(context) {
        
        var $ = context.jQuery;
        var results = [];
    
        results.push({
            company_name: $('#OrganisationName').text().trim(),
            report_date: $('.employer-report-metadata').find('.metadata-text-value').eq(0).text().trim(),
            employer_size: $('.employer-report-metadata').find('.metadata-text-value').eq(1).text().trim(),
            contact_name: $('.employer-report-metadata').find('.metadata-text-value').eq(2).find('span').eq(0).text().trim(), 
            contact_title: $('.employer-report-metadata').find('.metadata-text-value').eq(2).find('span').eq(1).text().trim(),
            website: $('.employer-report-metadata').find('a').eq(2).attr('href')
        });
    
        return results
      
    }

Use: Link selector can be left blank, upload a list of urls via text file or linking online of the form "[https://gender-pay-gap.service.gov.uk/Employer/qkPguuSW/2018](https://gender-pay-gap.service.gov.uk/Employer/qkPguuSW/2018)" where "2018" is the reporting year you want to access. 
