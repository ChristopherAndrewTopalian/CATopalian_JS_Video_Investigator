// markEndVideo.js

function markEndVideo()
{
    let video = ge("video1");

    let markEnd = video.currentTime;

    let endFullTimeCode = timeCodeFromSeconds(markEnd);

    ge('theEndMinutes2').textContent = endFullTimeCode;

    // display markStart in the startInput text box
    secondsFromTimeCode(ge("endInput").value = endFullTimeCode);

    console.log(markEnd);

    EndTimeEntered = markEnd;

    ge("continueButton").style.borderColor = "rgb(0, 250, 250)";

    ge("continueButton").innerText = "press to continue";

    return markEnd;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

