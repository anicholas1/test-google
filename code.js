/* What should the add-on do after it is installed */
function onInstall() {
    onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
    DocumentApp.getUi()
        .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
        .addItem("Summary", "showSidebar")
        .addToUi();  // Run the showSidebar function when someone clicks the menu
}

/* Show a 300px sidebar with the HTML from home.html */
function showSidebar() {
    const html = HtmlService.createTemplateFromFile("home")
        .evaluate()
        .setTitle("Research For Me"); // The title shows in the sidebar
    DocumentApp.getUi().showSidebar(html);
}

function displaySummary(){
    const html = HtmlService.createHtmlOutputFromFile('summary.html')
        .setTitle("Summaries");
    DocumentApp.getUi().showSidebar(html);
}

/* Get summary fetches articles and summarise from api, and returns to handler function in home.html */
function getSummary(){
    const body = DocumentApp.getActiveDocument().getBody();
    // Use editAsText to obtain a single text element containing
    // all the characters in the document.
    const text = body.editAsText().getText();


    const test_text = "trump tariffs china";
    const options = {
        "method" : "post",
        "contentType": "application/json",
        "payload" : JSON.stringify({"text": text}),
        "headers" : {"Accept" : "application/json"},
        "muteHttpExceptions" : true
    };
    const response = UrlFetchApp.fetch("http://18.207.157.28:10000/summary/search/", options);
    const json = response.getContentText();
    const data = JSON.parse(json);
    Logger.log(data.articles);

    return data.articles

}

// Send text to amazon api for search results.
// Convert fact sentences into javascript object. Index the words.
// Create html paragraph for sentences. Add span tag at index range
// With fact sentences and index of words, bold the words near the indexes with html.
function getStory(){
    const body = DocumentApp.getActiveDocument().getBody();
    // Use editAsText to obtain a single text element containing
    // all the characters in the document.
    const text = body.editAsText().getText();

    const options = {
        "method" : "post",
        "contentType": "application/json",
        "payload" : JSON.stringify({"text": text}),
        "headers" : {"Accept" : "application/json"},
        "muteHttpExceptions" : true
    };
    const response = UrlFetchApp.fetch("http://54.204.154.15:10010/api/facts", options);
    // Logger.log(response.getContentText())
    const json = response.getContentText();
    const data = JSON.parse(json);

    return data.html

}




function testCode() {
    Logger.log(HtmlService
        .createTemplateFromFile('googlemaps')
        .getCode());
}

function getTest() {
    return 'Hello'
}