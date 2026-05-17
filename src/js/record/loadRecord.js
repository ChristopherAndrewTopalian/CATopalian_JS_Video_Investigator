// loadRecord.js

function loadRecordSafe(file)
{
    let reader = new FileReader();
    
    reader.onload = function(e)
    {
        // Get the raw text from the file
        let rawText = e.target.result;

        // Turn the text back into a real Array of Objects
        records = JSON.parse(rawText);

        // Draw the newly loaded records to the screen
        printRecords(); 
        
        console.log("Database successfully loaded!");
    };
    
    // Start reading the file
    reader.readAsText(file);
}

function loadRecord()
{
    let script = ce('script');

    script.onload = function()
    {
        printRecords();
    };

    script.src = nameOfRecords;

    document.getElementsByTagName('head')[0].append(script);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

