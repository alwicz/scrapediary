---
title: "Is Web Scraping Legal in 2024?"
slug: "is-web-scraping-legal"
date: "2024-09-24T05:00:00.000Z"
author: "Oliver Lompart"
updatedDate: "2024-09-24T08:21:52.000Z"
tags: ["Legal"]
---

One of the most frequently asked questions on the topic of web scraping is whether or not web scraping is legal. As is the answer for most legal questions - it depends. Web scraping is the practice of using a computer, rather than a person to extract data from a website, so on face value it's hard to see how the two would be treated different by the law. That being said, sales and marketing professionals continue to worry not just about running into legal issues, but also damaging their reputation when it comes to using such tools. In this post we'll explore the ethics and legality of web scraping in 2024 and how you can collect data safely.

## Why Are People Concerned about the Legality of Web Scraping?

Web scraping has gotten a bad name for itself over the years, with the media attributing it to spam email campaigns, shady data collection practices and [high profile court cases](https://www.eff.org/deeplinks/2019/09/victory-ruling-hiq-v-linkedin-protects-scraping-public-data). In reality, these are all examples of the adage - "With Great Power, Comes Great Responsibility".

It is true that with web crawling, you can extract thousands of business contacts in a matter of minutes, which gives sales and marketing teams outsized power to find and contact potential customers. This power has often been abused in the past with large spam email campaigns leveraging scraped data. These abuses raise an important point - it is just as important how you use the information as where you got it from.

It's hard to argue that if a company was running an email campaign that was targeted, relevant and added genuine value to potential customers that it should be stopped, or at worst, sued. However there are some considerations that we need to take in to account to make sure data is handled safely and ethically, particularly with website terms and conditions, the website's robots.txt file and data privacy legislation.

## How To Stay On The Right Side Of T&C's

Every website on the internet today has a set of terms and conditions that set out what potential users are and are not allowed to do on their website. If you are considering a website as a potential source data for your web scraper, it is worth looking out for these T&C's, privacy policy or other terms on their website. As an example, the Financial Times has a section in their T&C's called "Access & Use".

As you can see in their terms, the FT sets out how their website should be accessed and how the data on it should be used. They mention right away to review their Copyright Policy to understand the types of use that are not permitted. From the Copyright Policy, they provide a list of prohibit actives under the heading  "What Am I Not Permitted to Do".

As you can see from the list above, the FT specifically states that scraping FT content is not permitted. From both a legal and an ethical perspective, this is the point to look for another data source to ensure you stay compliant. The FT has a strong motivation to protect their copyright and likely employ anti-web scraping technology to enforce it.

## The Parts Of The Web You Shouldn't Scrape

To ensure you're scraping ethically, you can review the pages that the website owner doesn't want bots or crawlers to visit. Don't forget, Google (and others) are busy crawling the entire web and have been for over a decade. To ensure that search engines and other parties don't index or list sensitive information on their sites, website owners host a file called robots.txt which tell the crawler which parts of the website they should stay out of. You can find this file by adding a /robots.txt at the end of your target website.

As an example from the Financial Times, you can see this website provides instructions to crawlers not to visit pathways such as /myft, /cancel and /search as examples. These are parts of their site only available to members, and as such they don't want them showing up in a Google Search result.

For the FT, it is important however that search engines such as Google do index their content so readers can find it online. Any pathways not covered by "Disallow", or explicitly mentioned by "Allow" will be picked up in the crawl. Using the Robots.txt file, you can see which parts of the website that the owner would prefer you stay out of. Steering clear of those areas will ensure your crawler behaves ethically and in line with the wishes of the website owner.

## Scraping Behind a Login Page

There is a wealth of publicly available business information on the internet, but it is true that some of the richest datasets are made available by websites that require you to create an account or pay for a subscription such as LinkedIn, or Crunchbase. When you sign up with a service like these, you will be opting in to additional terms and conditions that almost always forbid the automated collection of data and govern how you use it.

If you're scraping data from a service like these that requires you to create an account, you're almost guaranteed to be breaking the terms of service. Not only that, but the account you have with the service allows the service provider to collect additional information about you, including how and where you log in and your usage of their system. Using these details, it becomes much easier for the service provider to spot web scraping on their platform and ban your account. When it comes to scraping behind a login screen, it's best to look for publicly available data first before considering this an option, and only then consider the given risks.

## What about GDPR or CCPA?

Governments around the world have been busy drafting legislation that protects the privacy of individuals, especially online with the most notable being the EU's GDPR and California's CCPA. One important distinction to make right away is that these laws protect individuals, not businesses. If you were to scrape a list of business information, such as business name, telephone number or business address, privacy laws have little to say about this practice as this information doesn't include personal data.

Once you begin collecting information that could identify individuals, that is the point that these laws may apply. Given that this is not legal advice, consider the broad aims of these laws when collecting data about individuals;

1. Individuals have a "right to be forgotten" and have "right of access", meaning that people can ask you for a copy of what information you have stored on them. Complying with these requests are important and go a long way to demonstrating your compliance with the applicable law
2. Personal data should be stored in a secure way, in line with best practice. This means do your best to keep this information secure, protect it with a password or encryption and don't collect more information than you need in case a breach exposed this information to the public
3. Avoid selling or sharing data with 3rd parties unless it has been agreed with the individual. Getting this consent is often impossible, meaning that you should use this data for your own purposes and avoid buying lists of data from third parties where you can't verify consent.

Taking these points into account, the case for building an ethical sales and marketing process has never been stronger. Sourcing data yourself, rather than buying in lists will make compliance much easier.

## Key Takeaways

Without the advice of a lawyer, it's almost impossible to know whether your web scraping campaign is legal, but the truth is that that can be said of just about any other activity on the web. Rather than focusing purely on the legality of web scraping, it's also important to focus on the ethics behind it. Web scraping is but one method to generate business leads, and it can be incredibly powerful as long as it is used with the wishes of the target website in mind and with the respect of any individual whose data is collected.
