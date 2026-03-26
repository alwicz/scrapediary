---
title: "Free Email Extractor Online: Extract All Email Addresses"
slug: "email-extractor"
date: "2024-07-15T07:53:56.000Z"
author: "Oliver Lompart"
updatedDate: "2024-07-15T07:56:09.000Z"
---

Our powerful free email extractor tool helps you effortlessly extract email addresses from any text. Simply paste your text into the input field, and our smart algorithm will identify and list all valid email addresses in seconds.

<div id="email-extractor" class="email-extractor">
    <h2>Email Extractor</h2>
    <textarea id="input-text" placeholder="Paste your text here..."></textarea>
    <button onclick="extractEmails()">Extract Emails</button>
    <div id="result"></div>
    <div id="export-buttons" style="display: none;">
        <button onclick="exportEmails('csv')">Export to CSV</button>
        <button onclick="exportEmails('txt')">Export to TXT</button>
    </div>
</div>

<style>
    .email-extractor { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; background-color: #f8f9fa; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .email-extractor h2 { color: #333; margin-bottom: 20px; text-align: center; }
    .email-extractor textarea { width: 100%; height: 150px; margin-bottom: 15px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; resize: vertical; }
    .email-extractor button { background-color: #007bff; border: none; color: white; padding: 10px 20px; text-align: center; display: inline-block; font-size: 16px; margin: 10px 5px; cursor: pointer; border-radius: 4px; transition: background-color 0.3s ease; }
    .email-extractor button:hover { background-color: #0056b3; }
    .email-extractor #result { margin-top: 20px; border: 1px solid #e9ecef; padding: 15px; background-color: white; border-radius: 4px; }
    .email-extractor #result h3 { color: #495057; margin-top: 0; }
    .email-extractor #result ul { padding-left: 20px; color: #495057; }
    .email-extractor #result p { color: #6c757d; }
    .email-extractor #export-buttons { margin-top: 15px; text-align: center; }
</style>

<script>
    let extractedEmails = [];
    function extractEmails() {
        const inputText = document.getElementById('input-text').value;
        const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
        const emails = inputText.match(emailRegex) || [];
        extractedEmails = [...new Set(emails)];
        const resultDiv = document.getElementById('result');
        if (extractedEmails.length > 0) {
            resultDiv.innerHTML = '<h3>Extracted Emails:</h3><ul>' + extractedEmails.map(email => '<li>'+email+'</li>').join('') + '</ul>';
            document.getElementById('export-buttons').style.display = 'block';
        } else {
            resultDiv.innerHTML = '<p>No emails found.</p>';
            document.getElementById('export-buttons').style.display = 'none';
        }
    }
    function exportEmails(format) {
        let content, filename, mimeType;
        if (format === 'csv') { content = 'Email\n' + extractedEmails.join('\n'); filename = 'extracted_emails.csv'; mimeType = 'text/csv'; }
        else { content = extractedEmails.join('\n'); filename = 'extracted_emails.txt'; mimeType = 'text/plain'; }
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }
</script>

## Need to Extract Email Addresses from Websites?

While our current tool focuses on extracting emails from pasted text, we understand you might need to gather emails directly from websites. For more comprehensive data extraction, including the ability to extract emails from web pages, try our [Contact Details Scraper](https://apify.com/vdrmota/contact-info-scraper). This powerful tool allows you to:

- Extract emails from multiple websites simultaneously
- Gather additional contact information like phone numbers and social media profiles
- Export data in various formats for easy integration with your workflow

[Try Contact Details Scraper Now](https://apify.com/vdrmota/contact-info-scraper)

## What is an Email Extractor?

An email extractor is a specialized online tool designed to automatically identify and extract email addresses from a given body of text. It uses advanced pattern recognition algorithms to locate strings that match the standard format of email addresses.

### Key Features of Our Email Extractor:

1. **Intelligent Recognition**: Identifies various email formats, including less common ones
2. **Bulk Processing**: Handle large volumes of text at once
3. **Duplicate Removal**: Automatically removes duplicate email addresses
4. **Easy Export**: Download extracted emails in CSV or TXT format
5. **Privacy-Focused**: We don't store or use the extracted email addresses

### How to Use Our Email Extractor:

1. Copy the text containing the email addresses you want to extract
2. Paste your text into the input field
3. Click the "Extract Emails" button
4. Review the list of extracted email addresses
5. Download or copy the results

It's that simple - and completely free to use!
