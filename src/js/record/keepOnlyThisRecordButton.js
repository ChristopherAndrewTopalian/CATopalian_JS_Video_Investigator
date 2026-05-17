// keepOnlyThisRecordButton.js

function keepOnlyThisRecordButton(i)
{
    let warningKeep = confirm("Keep ONLY This Record?");

    if (warningKeep == true)
    {
        // alert("All except this selected record has removed");
    }
    else if (warningKeep == false)
    {
        alert("Canceled");

        return;
    }

    console.log("Keeping Only Record " + i);
    records = records.splice(i, 1);

    printRecords();
    console.log("records = " + JSON.stringify(records) + ";");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

