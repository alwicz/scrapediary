---
title: "Don’t Forget - Google Has Already Scraped The Entire Web"
slug: "dont-forget-google-has-already-scraped-the-entire-web"
date: "2026-03-26T00:00:00.000Z"
author: "Bryce Davies"
updatedDate: "2020-07-08T09:42:20.000Z"
---

It's easy to forget with the proliferation of web scraping tools on the market today that we already have free access to the worlds largest web scraping platform. In fact, we use it multiple times a day. That platform of course is Google, and it has already scraped the entire web thousands of times over. Google's web crawler works 24 hours a day, indexing pages to feed search results, and you would be surprised what it can drag up from the depths for you. 

When you use Google to find your nearest coffee shop or next favourite bar, the results Google sends back are those it found on its latest crawl over the web. Googlebot - the company's web crawler, works by inspecting links on web pages that point to other pages on the web. By visiting these pages and crawling their links, Googlebot can follow an infinite trail across the web. This method of crawling the web is powerful because web pages with lots of links to them tend to be more important and get crawled by Googlebot more often. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/googlebot-blinking-1396526290.gif" alt="" loading="lazy"></figure>

Pictured: Googlebot, your new best friend.

If a website is new, or doesn't have many other pages linking to it, Googlebot may have issues finding it. Proof of this is behind Google requesting a "sitemap" in these cases. With this map, Googlebot can spend less time stumbling around in the dark and go direct to these less popular pages. This blind stumble across the web is similar to dredging the ocean, nobody really knows what we're going to find down there. Sometimes, Google finds things that its owners would prefer to keep secret. Using targeted Google searches to find these hidden gems have a name - a "Google Dork" and are often used by hackers to uncover sensitive information they can take advantage of. 

Google Dorks exploit the fact that Google is busying crawling the entire internet and that some websites out there do a poor keeping sensitive information like login details, or documents out of the path of the Googlebot. In order to give you better search results, Google provides [advanced search techniques](https://support.google.com/websearch/answer/2466433?visit_id=637296382837519952-1774174606&amp;rd=1) that give you almost total control over the results. It is these techniques that can be used by hackers or other bad actors to do harm on the web, by dragging sensitive information out into the open. 

But the methods behind Google Dorks aren't just useful for hackers. Google is extremely powerful and we can use its targeted search to find information that might take us hours to find otherwise. In a business context, Google Dorks are particularly good for competitor analysis, lead generation and for enriching the data we already have on our customers. 

### The Basics - Using Google Dorks for Competitor Analysis

Let's assume we've just launched a new software company that sells job board software. Clients post their open job vacancies and would-be employees apply for them. We've just entered the market and we want to know who are our competitors are and most importantly, who are their customers. We come across Lever.co (sorry Lever!) and see they're a prominent player in the market. Lever hosts job boards on behalf of clients on its own website, generally at a link of the form jobs.lever.co/**coolcompany**, where "coolcompany" is the name of a Lever customer. 

If we could find all of the sites that Lever is hosting on behalf of its clients, we could essentially build a list of their entire client base. Of course, Lever isn't about to just hand over their client list to us, and they don't provide a list of their clients from their website. However, all of Lever's clients want their job postings to be public on the web so potential candidates can apply, and they will often link to their Lever job board from their own website. Remember, Googlebot follows links on the web, so it's very likely it has visited each of these pages in the past.

One search technique we can use here is to include the *site: *modifier to only return search results at the domain "jobs.lever.co". This forces the Google search to only return the job pages hosted on Lever that the Googlebot has crawled. As you can see, Lever's customers are now in plain sight, thanks to Google. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-05-at-2.24.58-pm.png" alt="" loading="lazy"></figure>

Now that we've found a list of Lever's customers, we may want to get a better idea of how they are selling their product, for instance what do their marketing materials look like, what analysis of their business has been done in the past and what are customers paying for their software?

When searching Google, we expect our search results to feature web pages. But remember, Google is crawling the entire internet. This means Googlebot can also drag up things like files and content hosted on the web. Asking Google to return files of a particular type is a common technique used by hackers to get access to unsecured files on the internet with sensitive information on it.

Using the *filetype:* parameter, we can request that Google only return files in its search, for instance "pdf" for presentations, "docx" for Word documents, "ppt" for Powerpoint presentations and "xls" for Excel documents. Let's say we want to do some further competitor analysis on Lever. We might want to look at presentations they have made, or that others have made featuring them. Using the filetype parameter, we can search for PDF's including their website "lever.co".

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-05-at-2.34.30-pm.png" alt="" loading="lazy"></figure>

Google has returned PDF's hosted at various sites around the web which we can freely download inspect. These files may not normally be made public, or at least not openly promoted or made searchable. This gives us a view into their marketing collateral, and using other search terms along side this like "price" or "contract" can often pull up their customer contracts, especially if they sell to government.

In Lever's case, I was able to find a presentation prepared by a technology analyst that included market share data among other key metrics. This is exactly the type of information I may be interested in when working out how to compete with them in the market and how to position my product against theirs. 

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/Screen-Shot-2020-07-05-at-2.35.09-pm-1.png" alt="" loading="lazy"></figure>

There are hundreds of Google Dorks listed freely on the internet, with the External Links section on the [Google Dorks Wikipedia](https://en.wikipedia.org/wiki/Google_hacking) page giving a fantastic introduction. Feel free to play around with them and remember, Google Dorks are best used in good faith, if you find something that probably shouldn't be on the internet like login details or sensitive personal information, steer clear of it. 

Happy Dorking,

BD

Ps, have you got a web scraping project in mind? Share it with me at bd@scrapediary.com and I can lend a hand. 
