// setStartTime.js

function setStartTime()
{
    StartTimeEntered = secondsFromTimeCode(ge("startInput").value);

    let startFullTimeCode = timeCodeFromSeconds(StartTimeEntered);

    // Display it on the bottom
    ge('theStartMinutes2').textContent = startFullTimeCode;

    ge("continueButton").style.borderColor = "rgb(0, 250, 250)";

    ge("continueButton").innerText = "press to continue";
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

