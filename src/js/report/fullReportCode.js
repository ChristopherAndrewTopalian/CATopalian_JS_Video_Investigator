// fullReportCode.js

function fullReportCode(theName)
{
    // Format the data perfectly with a 2-space indent
    let formattedData = JSON.stringify(records, null, 2);

    // Build the output using a template literal
    let outputString = `records = \n${formattedData};\n\n`;

    // Print to console
    console.log(outputString);

    // Optional: If we ever want to see 'theName' in the log so you know which report fired
    // console.log(`--- Report for: ${theName} --- \n` + outputString);
}

function fullReportCodeOriginal(theName)
{
    console.log("records = " + JSON.stringify(records, null, ' ') + ";" + "\n\n");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2020-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

