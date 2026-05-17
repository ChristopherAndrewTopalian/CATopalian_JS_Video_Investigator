// increaseItStart.js

// The Up Arrow Button, for Start Time, for increasing the seconds
function increaseItStart()
{
    let currentValue = secondsFromTimeCode(ge("startInput").value);

    let addOneToValue = currentValue + 1;

    let theValue = timeCodeFromSeconds(addOneToValue);

    ge('theStartMinutes2').textContent = theValue;

    ge('startInput').value = theValue;

    StartTimeEntered = addOneToValue;

    console.log("StartTimeEntered " + StartTimeEntered);

    ge("continueButton").style.borderColor = "rgb(0, 250, 250)";

    ge("continueButton").innerText = "press to continue";

    return theValue;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

