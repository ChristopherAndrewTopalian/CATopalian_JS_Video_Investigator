// deleteThisRecordButton.js

function deleteThisRecordButton(i)
{
    let warningDelete = confirm("DELETE ONLY This Record?");

    if (warningDelete == true)
    {
        // alert("Okay");
    }
    else if (warningDelete == false)
    {
        alert("Canceled");

        return;
    }

    records.splice(i, 1);

    printRecords();

    console.log("records = " + JSON.stringify(records) + ";");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

