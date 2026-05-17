// editThisRecord.js

function editThisRecord(i)
{
    StartTimeEntered = secondsFromTimeCode(ge(i+'-startMins').value);

    EndTimeEntered = secondsFromTimeCode(ge(i+'-endMins').value);

    theTotalStartMinutes = ge(i+'-startMins').value.trim();

    theTotalEndMinutes = ge(i+'-endMins').value.trim();

    NotesEntered = ge(i+'-notes').value;

    WordsEntered = ge(i+'-words').value;

    ConclusionEntered = ge(i+'-conclusion').value;

    let existingId = records[i].recordId;

    recordEntry =
    {
        recordId: existingId,
        start: StartTimeEntered,
        end: EndTimeEntered,
        startMins: theTotalStartMinutes,
        endMins: theTotalEndMinutes,
        note: NotesEntered,
        words: WordsEntered,
        conclusion: ConclusionEntered
    };

    records.splice(i, 1, recordEntry);

    console.log("records = " + JSON.stringify(records) + ";");

    printRecords();
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

