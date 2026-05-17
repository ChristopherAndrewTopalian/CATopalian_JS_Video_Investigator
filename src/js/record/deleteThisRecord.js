// deleteThisRecord.js

function deleteThisRecord(i)
{
    let warningDelete = confirm("DELETE ONLY This Record?");

    if (warningDelete == true)
    {
        // alert("Record has been deleted");
    }
    else if (warningDelete == false)
    {
        alert("Canceled");

        return;
    }

    let recordEnteredToDelete = ge("deleteRecordInput").value;

    console.log(recordEnteredToDelete + " the entered record to delete");

    records.splice(recordEnteredToDelete, 1);

    printRecords();

    console.log("records = " + JSON.stringify(records) + ";");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

