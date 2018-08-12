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

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
    var html = HtmlService.createTemplateFromFile("home")
        .evaluate()
        .setTitle("Research For Me"); // The title shows in the sidebar
    DocumentApp.getUi().showSidebar(html);
}

function displaySummary(){
    var html = HtmlService.createHtmlOutputFromFile('summary.html')
        .setTitle("Summaries");
    DocumentApp.getUi().showSidebar(html);
}

/* This Google Script function does all the magic. */

function getSummary(){
    var body = DocumentApp.getActiveDocument().getBody();
    // Use editAsText to obtain a single text element containing
    // all the characters in the document.
    var text = body.editAsText().getText();


    var test_text = "trump tariffs china";
    var options = {
        "method" : "post",
        "contentType": "application/json",
        "payload" : JSON.stringify({"text": text}),
        "headers" : {"Accept" : "application/json"},
        "muteHttpExceptions" : true
    };
    // var response = UrlFetchApp.fetch("https://jsonplaceholder.typicode.com/users", options);
    var response = UrlFetchApp.fetch("http://18.207.157.28:10000/summary/search/", options);
    // Logger.log(response.getContentText())

    var json = response.getContentText();
    var data = JSON.parse(json);
    Logger.log(data.articles)

    return data.articles

}

function testCode() {
    Logger.log(HtmlService
        .createTemplateFromFile('googlemaps')
        .getCode());
}

function getTest() {
    return 'Hello'
}