// markStartVideo.js

function markStartVideo()
{
    let video = ge("video1");

    let markStart = video.currentTime;

    let startFullTimeCode = timeCodeFromSeconds(markStart);

    ge('theStartMinutes2').textContent = startFullTimeCode;

    // display markStart in the startInput text box
    secondsFromTimeCode(ge("startInput").value = startFullTimeCode);

    console.log(markStart);

    StartTimeEntered = markStart;

    ge("continueButton").style.borderColor = "rgb(0, 250, 250)";

    ge("continueButton").innerText = "press to continue";
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

