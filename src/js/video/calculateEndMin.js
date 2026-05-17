// calculateEndMin.js

function calculateEndMin()
{
    let theInput = secondsFromTimeCode(ge('endInput').value);

    let endFullTimeCode = timeCodeFromSeconds(theInput);

    totalEndMin = endFullTimeCode;

    return totalEndMin;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

