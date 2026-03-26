---
title: "LinkedIn Has Entered Into A Web Scraping Arms Race"
slug: "linkedin-vs-the-world-a-web-scraping-arms-race"
date: "2020-07-02T13:58:13.000Z"
author: "Bryce Davies"
updatedDate: "2020-08-15T12:17:39.000Z"
---

LinkedIn is quickly becoming the most valuable source of business contact details in the world, with the company experiencing massive growth in users over the past few years. As a business LinkedIn’s revenue model has two components, the first is the tried and tested ad model, where advertisers pay for eyeballs and clicks. The second though is much more interesting. The company has essentially become the middleman for making connections between professionals. 

With tools like Sales Navigator, Recruiter and Premium plans, LinkedIn creates value when professionals connect and do business, whether that's through doing a deal, making a hire or some other relationship. Of course to capture value through these tools,  they need to make it increasingly difficult to make these connections without them, which they do by restricting who you can search for and how you can interact on the platform.

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/linkedin-membership.png" alt="" loading="lazy"></figure>

[Source: LinkedIn Statistics](https://news.linkedin.com/about-us#statistics)

Rather than openly pointing to this fact, LinkedIn muddies the waters by making a claim that such restrictions are to protect users' privacy. Claims about privacy from a social media platform are usually best taken with a grain of salt, but you could imagine the company holding back a tsunami of bots, spammers and unsolicited cold sales approaches from unsuspecting users. That line of thinking of course only works if you assume that people who use LinkedIn's premium search tools would never take users email addresses and do something like entering them into a CRM for sales purposes.

As it turns out, there are other people out there who think they can do a better job of helping professionals connect on the platform, and that puts them in direct conflict with LinkedIn. There has been an explosion of third party tools centred around automation, data collection and messaging that plug gaps in LinkedIn Premium and users are flocking to them. The competition over who gets to own connection-making on the platform spilled over into the courts in 2019 with a [high profile case between LI and HiQ](https://www.theverge.com/2019/9/10/20859399/linkedin-hiq-data-scraping-cfaa-lawsuit-ninth-circuit-ruling), where a data scraping platform overturned an injunction stopping them from extracting data from the site. 

What we're seeing now is an out in the open arms race between third party software vendors and LinkedIn, with vendors offering a suite of tools from automated messaging campaigns, data extraction and analytics and LinkedIn racing to detect them on the platform and shut them down. In taking this stance, LinkedIn has become the de facto gold standard of web scraping targets with those who claim to be able to do so answering a very interesting question;

> "How do we scrape a website that is actively trying to stop us?"

Understanding what makes scraping LinkedIn hard gives us a window into what a possible future might look like on the web, with more websites deploying anti-web scraping technology. In short, LinkedIn uses an array of techniques. Some are common such as blocking IP addresses of high-traffic bots, slow-loading and hiding elements on some pages and deliberately obscuring the website design to make pattern recognition hard.

What is new is it's now fairly clear they’re also able to detect browser information, blocking bots that are running on commonly used headless chrome browsers (think internet browser with monitor display). They even seem to have the ability to detect chrome browser plugins, which many LinkedIn web scrapers use to essentially control your browser window and run the automation on your own computer. Proof of that is in the warning notifications served to those using them, identifying the specific tool they're using.

<figure class="kg-card kg-image-card"><img class="kg-image" src="https://www.scrapediary.com/content/images/2020/07/0--2-.jpeg" alt="" loading="lazy"></figure>

[Source: Third Party Apps Could Seriously Damage Your LinkedIn Health](https://www.linkedin.com/pulse/warning-3rd-party-apps-could-seriously-damage-your-linkedin-cooper/)

Innovation on LinkedIn's side seems to rule out the following types of web-scraping tools;

1. Cloud-based, third party services that use your email/password or session cookie to scrape with headless chrome and
2. Extension based services running in a browser on your computer

However this is an arms and an advance from one side is bound met with innovation from the other. The new high water mark here seems to be something like [LinkedHelper2](https://lh2.linkedhelper.com/) (guess what happened to LinkedHelper1) which uses an app installed on your computer with a browser built in and controls it similar to using keyboard and mouse input. This way it uses your IP address, there are no Chrome Extensions involved and using built in connection request limits mean you can mimic normal behaviour on the site.

Over the coming few days I'll be diving deeper into LinkedHelper2 and putting together an extensive QuickStart guide, but keep this in mind next time you look for an automation tool on LinkedIn. Either back small nimble players who can bounce back from being shut down or those with deep pockets willing to go to court, there is no in between. 

Stay Safe,

BD

## Subscribe to the newsletter

Subscribe

**Great!** Check your inbox (or spam folder) and click the link to confirm your subscription.
        

            Sorry, something went wrong. Please try again.
        

    .subscribe-form.success .message-success {display:block}
    .subscribe-form.success .subscribe-form-fields {display:none}
    .subscribe-form.error .message-error {display:block}
