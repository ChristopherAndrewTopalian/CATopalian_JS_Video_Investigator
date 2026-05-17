// jsonDownload.js

function jsonDownload()
{
    // Get the beautifully formatted string (with line breaks and 2 spaces!)
    let formattedData = JSON.stringify(records, null, 2);

    // Wrap it in the old-school variable assignment
    let fileContent = "records = \n" + formattedData + ";";

    // Encode it for downloading
    let dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(fileContent);

    let dlAnchorElem = ge("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    
    // Save as a .js file to keep the auto-load magic working
    dlAnchorElem.setAttribute("download", "record.js"); 

    dlAnchorElem.click();
}

function jsonDownloadSafe()
{
    // Stringify the pure array, nicely formatted with 2 spaces
    let pureJSON = JSON.stringify(records, null, 2); 
    
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(pureJSON);

    let dlAnchorElem = ge("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    
    // Save as a pure data file, not an executable script
    dlAnchorElem.setAttribute("download", "record.json"); 
    dlAnchorElem.click();
}

function jsonDownloadOriginal()
{
    let object = records;

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent('records = ' + JSON.stringify(object) + ';');

    let dlAnchorElem = ge("downloadAnchorElem");

    dlAnchorElem.setAttribute("href", dataStr);

    dlAnchorElem.setAttribute("download", "record.js");

    dlAnchorElem.click();
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2020-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

