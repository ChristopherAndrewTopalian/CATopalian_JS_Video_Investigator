// setEndTime.js

// when user types input of end seconds, or button
function setEndTime()
{
    EndTimeEntered = secondsFromTimeCode(ge("endInput").value);

    let endFullTimeCode = timeCodeFromSeconds(EndTimeEntered);

    // Display it on the bottom
    ge('theEndMinutes2').textContent = endFullTimeCode;

    ge("continueButton").style.borderColor = "rgb(0, 250, 250)";

    ge("continueButton").innerText = "press to continue";
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

