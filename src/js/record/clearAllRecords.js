// clearAllRecords.js

function clearAllRecords()
{
    let warningDelete = confirm("CLEAR ALL RECORDS?");

    if (warningDelete == true)
    {
        // alert("All Records have been cleared.");
    }
    else if (warningDelete == false)
    {
        alert("Canceled");

        return;
    }

    // clears all records
    records = [];

    idOfRecord = 0;

    printRecords();

    howManyRecords();

    console.log("records = " + JSON.stringify(records) + ";");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

