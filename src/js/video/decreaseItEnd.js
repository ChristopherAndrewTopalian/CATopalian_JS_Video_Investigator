// decreaseItEnd.js

function decreaseItEnd()
{
    let currentValue = secondsFromTimeCode(ge("endInput").value);

    let addOneToValue = currentValue - 1;

    let theValue = timeCodeFromSeconds(addOneToValue);

    ge('theEndMinutes2').textContent = theValue;

    ge('endInput').value = theValue;

    EndTimeEntered = addOneToValue;

    console.log("EndTimeEntered " + EndTimeEntered);

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

