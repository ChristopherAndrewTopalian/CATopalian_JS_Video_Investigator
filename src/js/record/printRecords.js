// printRecords.js

function printRecords()
{
    if (ge("mainRecords"))
    {
        ge("mainRecords").remove();
    }

    let videoId = 'video1';

    let mainDiv = ce("div");
    mainDiv.id = "mainRecords";
    ge('rightContainer').append(mainDiv);

    //----//

    for (let x = 0; x < records.length; x++)
    {
        //let videoId = "newVideoPlayer" + x;

        let subDiv = ce("div");
        subDiv.className = "subDiv";
        mainDiv.append(subDiv);

        //-//

        subDiv.append(ce('hr'));

        //-//

        let recordNumber = ce("div");
        recordNumber.textContent = "#" + x;
        recordNumber.style.color = "rgb(255, 255, 255)";
        subDiv.append(recordNumber);

        //-//

        let controlDiv = ce("div");
        controlDiv.style.width = '100%';
        controlDiv.style.display = 'flex';
        controlDiv.style.flexDirection = 'row';
        subDiv.append(controlDiv);

        //-//

        let back2SecondsButton = ce("button");
        back2SecondsButton.textContent = "< 1";
        back2SecondsButton.onclick = function()
        {
            back2Seconds(records[x].start, records[x].end, videoId, 1.0 );
        };
        controlDiv.append(back2SecondsButton);

        //----//

        let back2SecondsHalfSpeedButton = ce("button");
        back2SecondsHalfSpeedButton.textContent = "< .5";
        back2SecondsHalfSpeedButton.onclick = function()
        {
            back2Seconds(records[x].start, records[x].end, videoId, 0.5);
        };
        controlDiv.append(back2SecondsHalfSpeedButton);

        //----//

        let forward2SecondsHalfSpeedButton = ce("button");
        forward2SecondsHalfSpeedButton.textContent = ".5 >";
        forward2SecondsHalfSpeedButton.onclick = function()
        {
            forward2Seconds(records[x].start, records[x].end, videoId, 0.5);
        };
        controlDiv.append(forward2SecondsHalfSpeedButton);

        //-//

        let forward2SecondsButton = ce("button");
        forward2SecondsButton.textContent =" 1 >";
        forward2SecondsButton.onclick = function()
        {
            forward2Seconds(records[x].start, records[x].end, videoId, 1.0);
        };
        controlDiv.append(forward2SecondsButton);

        //----//

        //----//

        let playContainer = ce('div');
        playContainer.style.display = 'flex';
        playContainer.style.flexDirection = 'row';
        subDiv.append(playContainer);

        //-//

        let play100PercentButton = ce("button");
        play100PercentButton.textContent = "▶ 100";
        play100PercentButton.onclick = function()
        {
            playVideoMAIN(records[x].start, records[x].end, videoId, 1.0);
        };
        playContainer.append(play100PercentButton);

        //----//

        let play50PercentButton = ce("button");
        play50PercentButton.textContent = "▶ 50";
        play50PercentButton.onclick = function()
        {
            playVideoMAIN(records[x].start, records[x].end, videoId, 0.5);
        };
        playContainer.append(play50PercentButton);

        //----//

        let play25PercentButton = ce("button");
        play25PercentButton.textContent = "▶ 25";
        play25PercentButton.onclick = function()
        {
            playVideoMAIN(records[x].start, records[x].end, videoId, 0.25);
        };
        playContainer.append(play25PercentButton);

        //----//

        let timeContainer = ce('div');
        timeContainer.style.display = 'flex';
        timeContainer.flexDirection = 'row';
        subDiv.append(timeContainer);

        //-//

        let startTimeTextArea = ce("textarea");
        //startTimeTextArea.className = "startendtime";
        // startTimeTextArea.style.alignSelf = 'flex-start';
        startTimeTextArea.id = x + '-startMins';
        startTimeTextArea.style.backgroundColor = "rgb(0, 0, 0)";
        startTimeTextArea.style.color = "rgb(255, 255, 255)";
        startTimeTextArea.value = records[x].startMins;
        startTimeTextArea.style.display = 'flex';
        startTimeTextArea.style.height = '25px';
        startTimeTextArea.style.width = '100%';
        startTimeTextArea.style.justifyContent = 'center';

        startTimeTextArea.style.textAlign = 'center';
        startTimeTextArea.onchange = function()
        {
            editThisRecord(x);
        };
        timeContainer.append(startTimeTextArea);

        //----//

        let endTimeTextArea = ce("textarea");
        //endTimeTextArea.className = "startendtime";
        //endTimeTextArea.style.alignSelf = 'flex-start';
        endTimeTextArea.style.display = 'flex';
        endTimeTextArea.style.width = '100%';
        endTimeTextArea.style.height = '25px';
        endTimeTextArea.style.justifyContent = 'center';
        endTimeTextArea.style.textAlign = 'center';
        endTimeTextArea.id = x + '-endMins';
        endTimeTextArea.style.backgroundColor = "rgb(0, 0, 0)";
        endTimeTextArea.style.color = "rgb(255, 255, 255)";
        endTimeTextArea.value = records[x].endMins;
        endTimeTextArea.onchange = function()
        {
            editThisRecord(x);
        };
        timeContainer.append(endTimeTextArea);

        //----//

        let textContainer = ce('div');
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        subDiv.append(textContainer);

        //-//

        let notesTextArea = ce("textarea");
        notesTextArea.id = x + '-notes';
        notesTextArea.value = records[x].note;
        notesTextArea.style.width = '100%';
        //notesTextArea.className = "myTextBoxNotes";
        notesTextArea.onchange = function()
        {
            editThisRecord(x);
        };
        textContainer.append(notesTextArea);

        //----//

        let wordsTextArea = ce("textarea");
        wordsTextArea.id = x + '-words';
        wordsTextArea.value = records[x].words;
        wordsTextArea.style.width = '100%';
        //wordsTextArea.className = "myTextBoxNotes";
        wordsTextArea.onchange = function()
        {
            editThisRecord(x);
        };
        textContainer.append(wordsTextArea);

        //----//

        let conclusionTextArea = ce("textarea");
        conclusionTextArea.id = x + '-conclusion';
        conclusionTextArea.value = records[x].conclusion;
        conclusionTextArea.style.width = '100%';
        //conclusionTextArea.className = "myTextBoxNotes";
        conclusionTextArea.onchange = function()
        {
            editThisRecord(x);
        };
        textContainer.append(conclusionTextArea);

        //----//

        let moveContainer = ce('div');
        moveContainer.style.display = 'flex';
        moveContainer.style.flexDirection = 'row';
        subDiv.append(moveContainer);

        //-//

        let moveUpButton = ce("button");
        moveUpButton.className = "videoButtons";
        moveUpButton.textContent = "Up";
        moveUpButton.id = x;
        moveUpButton.onclick = function()
        {
            moveRecordUp(x);
        };
        moveContainer.append(moveUpButton);

        //----//

        let moveDownButton = ce("button");
        moveDownButton.textContent = "Down";
        moveDownButton.id = x;
        moveDownButton.onclick = function()
        {
            moveRecordDown(x);
        };
        moveContainer.append(moveDownButton);

        //----//

        let otherContainer = ce('div');
        otherContainer.style.display = 'flex';
        subDiv.append(otherContainer);

        //-//

        let deleteThisRecordButton = ce("button");
        deleteThisRecordButton.textContent = "🗑 Delete This Record";
        deleteThisRecordButton.id = x + '-deleteThis';
        deleteThisRecordButton.onclick = function()
        {
            deleteThisRecord(x);
        };
        otherContainer.append(deleteThisRecordButton);

        //----//

        let keepOnlyThisRecordButton2 = ce("button");
        keepOnlyThisRecordButton2.textContent = "Keep Only This Record";
        keepOnlyThisRecordButton2.id = x + '-keepOnlyThis';
        keepOnlyThisRecordButton2.onclick = function()
        {
            keepOnlyThisRecordButton(x);
        };
        otherContainer.append(keepOnlyThisRecordButton2);
    }

    howManyRecords();
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2020-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

