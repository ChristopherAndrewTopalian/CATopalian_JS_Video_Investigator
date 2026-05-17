// addRecord.js

let addingOneToLargestId;

function addRecord(theIdHere, totalStartMin, totalEndMin)
{
    // if records exist
    if (records.length > 0)
    {
        // uses map() with Math.max.apply() to find the largest recordId
        let largestId = Math.max.apply(Math,records.map(function(x)
        {
            return x.recordId;
        }));

        addingOneToLargestId = largestId + 1;
    }
    // else if no records exist, such as after clearing all records
    else
    {
        addingOneToLargestId = 1;
    }

    StartTimeEntered = secondsFromTimeCode(ge("startInput").value);

    EndTimeEntered = secondsFromTimeCode(ge("endInput").value);

    theTotalStartMinutes = calculateStartMin(totalStartMin);

    theTotalEndMinutes = calculateEndMin(totalEndMin);

    recordEntry =
    {
        recordId: addingOneToLargestId,
        start: StartTimeEntered,
        end: EndTimeEntered,
        startMins: theTotalStartMinutes,
        endMins: theTotalEndMinutes,
        note: NotesEntered,
        words: WordsEntered,
        conclusion: ConclusionEntered,
        title: theTitle
    };

    // idOfRecord = i;
    idOfRecord = theIdHere;

    // add item to end of array
    records.push(recordEntry);

    console.log("records = " + JSON.stringify(records) + ";");

    printRecords();

    howManyRecords();
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

