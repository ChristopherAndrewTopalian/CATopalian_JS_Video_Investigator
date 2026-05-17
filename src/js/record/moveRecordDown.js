// moveRecordDown.js

function moveRecordDown(i)
{
    let newplace = i + 1;

    let oldplace = i;

    records.splice(newplace, 0, records.splice(oldplace, 1)[0]);

    printRecords();

    console.log("records = " + JSON.stringify(records) + ";");
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

