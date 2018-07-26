/* What should the add-on do after it is installed */
function onInstall() {
    onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
    DocumentApp.getUi()
        .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
        .addItem("Google Maps", "showSidebar")
        .addToUi();  // Run the showSidebar function when someone clicks the menu
}

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
    var html = HtmlService.createTemplateFromFile("googlemaps")
        .evaluate()
        .setTitle("Google Maps - Search"); // The title shows in the sidebar
    DocumentApp.getUi().showSidebar(html);
}

function displaySummary(){
    var html = HtmlService.createHtmlOutputFromFile('summary.html')
        .setTitle("Summaries");
    DocumentApp.getUi().showSidebar(html);
}

/* This Google Script function does all the magic. */
function insertGoogleMap(e) {
    if(e == null){
        e = '7440 Breckenridge Plano Tx'
    }
    var map = Maps.newStaticMap()
        .setSize(800, 600) // Insert a Google Map 800x600 px
        .setZoom(15)
        .setCenter(e); // e contains the address entered by the user

    // Find the location of the cursor in the document
    cursor = DocumentApp.getActiveDocument().getCursor()
    if (cursor) {
        cursor.insertInlineImage(map.getBlob()); // insert the image at the cursor
    } else {
        DocumentApp.getUi().alert('Cannot find a cursor.');
    }
}

function getSummary(){
    var body = DocumentApp.getActiveDocument().getBody();
    // Use editAsText to obtain a single text element containing
    // all the characters in the document.
    var text = body.editAsText();

    var options = {
        'method' : 'get',
        'contentType': 'appliaction/json',
        //'payload' : {'articles': text}
    };
    var response = UrlFetchApp.fetch("https://jsonplaceholder.typicode.com/users", options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data

}

function testCode() {
    Logger.log(HtmlService
        .createTemplateFromFile('googlemaps')
        .getCode());
}

function getTest() {
    return 'Hello'
}