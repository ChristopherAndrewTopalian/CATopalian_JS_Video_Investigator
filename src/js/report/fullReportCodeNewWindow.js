// fullReportCodeNewWindow.js

function fullReportCodeNewWindow()
{
    // Format the pure data perfectly (using 2 spaces)
    let formattedData = JSON.stringify(records, null, 2);

    // Wrap it in your JSONP auto-load structure
    let myText = "records = \n" + formattedData + ";";

    // Open the window (Cleaned up the comma-separated parameters)
    let newWindow = window.open("", "_blank", "left=10,top=10,width=1200,height=600");

    // Build a modern, dark-mode HTML skeleton for the popup
    newWindow.document.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Video Investigator - Database Export</title>
            <style>
                body { 
                    background-color: #1e1e1e; 
                    color: #d4d4d4; 
                    padding: 20px; 
                    font-family: Consolas, monospace; 
                    font-size: 14px; 
                }
                pre { 
                    /* Ensures long lines wrap nicely instead of creating a horizontal scrollbar */
                    white-space: pre-wrap; 
                    word-wrap: break-word; 
                }
            </style>
        </head>
        <body>
            <pre id="codeOutput"></pre>
        </body>
        </html>
    `);
    newWindow.document.close();

    // Safely inject the data into the <pre> tag. 
    // Using textContent completely prevents HTML injection bugs.
    newWindow.document.getElementById('codeOutput').textContent = myText;
}

/*
function fullReportCodeNewWindow()
{
    let mytext = "";

    mytext += ("records = " + JSON.stringify(records, null, ' ') + ";");

    let newWindow = window.open("", "test", "left = 10 top = 10 width = 1200, height = 600, scrollbars = 1, resizable = 1", true);

    newWindow.document.open();

    newWindow.document.write(mytext);

    newWindow.document.close();
}
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

