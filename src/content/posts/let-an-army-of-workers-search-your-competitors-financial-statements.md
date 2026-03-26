---
title: "Let an Army of Workers Search Your Customers Financial Statements"
slug: "let-an-army-of-workers-search-your-competitors-financial-statements"
date: "2026-03-26T00:00:00.000Z"
author: "Bryce Davies"
updatedDate: "2024-04-17T15:09:20.000Z"
---

With the rise of automation and AI, you could be forgiven for thinking we're on the cusp of doing away with all of the repetitive, boring and low value tasks that pile up on our desks each day. Unfortunately as the years pass us by, small tasks we affectionately call "admin" continue to frustrate us, as well as the computers trying to automate them. When it comes to identifying objects in images, searching through documents for text or even writing articles, computers are getting better, but the AI behind each of these tasks is still not widely trusted.

In sales and marketing, there are hundreds of these small little tasks that we wish a computer could do for us, like searching for contact details for a customer, doing market research or spotting bad data in a CRM. As good as they are, for these tasks computers can't replace humans - yet. In turns out the information that is truely valuable to us on the web is often buried, unstructured or takes imagination to find. 

But what if instead of an army of computers searching the web for you, you could employ an army of humans, all at the click of a button? What if you could post a task to a marketplace, too small for a contractor, too complicated for a computer, and have it solved for you in real time? This is where marketplaces like Amazon's Mechanical Turk (MTurk) comes in, and in this post we're going to put it to the test. We're going to use MTurk to search through the financial statements of our prospects and tell us which ones are the most profitable. 

## What is a Mechanical Turk Anyway?

Mechanical Turk is a crowdsourced marketplace that pairs businesses who need small tasks done, often those that are difficult for a computer to automate, with workers around the world who are willing to do those tasks for a fee. The tool is widely used to train AI, such as having real humans classify images or confirm when an AI has gotten something wrong in training. It can also be a very powerful tool for market research as Amazon holds detailed demographic information like income, age, gender and even home ownership of its workers. To get started, we’ll need a Mechanical Turk account and to set up our first job.

## How to Search Your Prospects Financial Statements at Scale

Each year, businesses around the world are required to submit their financial statements to the government. Through these financial statements, business disclose things such as revenue, expenses and how many employees they have on staff during the period. These statements are a treasure trove of valuable information including how the business is performing and what their plans are for the coming year. The challenge however, is that because they are prepared by individual accounting firms each filing can look and read completely differently. 

With the variation in the language they use, the length of the document and even the quality of the document scan, this quickly becomes an incredibly complex task for an AI. Using a web scraper for this would be completely out of the question, but put to an army of human workers, this can be completely automated.

## Setting up your MTurk Project

In order to get workers started on your task, you will need to set up a project in Mechanical Turk. MTurk provides a library of projects to choose from, such as those used in image classification or data collection. In our example, we’ve picked the data collection template, which is already set up to provide workers a website link to follow and fields to capture the information in. 

Once you have selected a template, you will want to describe your task to the workers on the platform. Keep in mind, your task will be listed on the marketplace along side competing tasks, so the more information you can give workers and the more interesting the task looks, the greater your chance of attracting them.

In the second section, you will want to set up your reward per assignment and fill out the remaining fields. The reward per assignment is how much workers will be paid for completing your task. The more you enter in here, the more competition there will be for your task and the quicker it will be completed. You may also decide to allow multiple workers to complete the same task under "Number of assignments per task". This can helpful for ensuring you get accurate data, as where a single worker may make a mistake, multiple workers are unlikely to. 

For more complicated tasks, consider having 3 or more workers tackle the same tasks and if two agree, take that value as the correct answer. Using Time Allotted Per Assignment box, you can tell workers how long they have to complete the task. Try to keep it small enough so that workers are not overcommitting time to the project, but long enough for them to complete it. 

Finally you can set worker requirements, such as master status, or particular skills to ensure only workers with high success rates or demonstrated abilities work on your project. This comes at a higher cost, but for user research this can be incredible useful for ensuring workers with particular demographics take part in your task.

## Setting up your Project Layout

Once you have set the parameters of your project in Step 1, you will want to give clear instructions to the workers taking part in your task. Under the Design and Layout tab, you can set up the project description that workers will use to complete your task. MTurk implements this as a HTML form which you can edit and preview using the Preview and Finish tab.

The example design for this layout is included in the Code Library which you can use as a base, otherwise simply remove any unwanted fields from the example project and rename any text. If you would like to add additional guidance for the task, make sure you include these inside <p> and </p> tags at the top of your task if you're not familiar with HTML. 

## Publishing your Task

Once your task is set up, it's time to set it live. Under Preview and Finish you can complete and publish your task to workers to set it live. Once live, MTurk provides a live dashboard to monitor results in real time.

Under review results, you have the ability to reject input from any workers who have not properly completed the task and have these republished. Once your task is complete, you will have a CSV of results ready to review. 

## Refining your Task

When setting up a project for the first time, it is worth creating a small batch first to test how workers will react to your task and how often they make mistakes. If you task has a high number of incorrect results, you may need to provide more instruction to clarify the task. You can also consider adding in a comment field to let workers give feedback on how they found it, and tweak the project layout to make it easier for future workers. If the error rate stays high, it may also be worth increasing the reward price to get a more qualified pool of workers on your task or using only workers with master status. 

## Adding MTurk to your Toolbox

In our example, we wanted to have workers search through the financial statements of potential customers and tell us how many staff they had, as well as their revenue. A brief explanation of the task was provided and then two fields that workers used to enter in the information.

Using this project as a base, Mechanical Turk could quite easily be use for searching for contact details on a website, cleaning data or just about any other small task that don't require training. Adding MTurk to your toolbox today should give you back some valuable time to spend on closing more deals, but it goes much further. Used right MTurk can also open up a whole realm of possibilities to scale your marketing and get your product in front of a wider audience, all through the help of an army of workers.

Happy Turking,

BD
