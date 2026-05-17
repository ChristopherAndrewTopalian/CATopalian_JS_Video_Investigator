// setIsolationModeVisuals.js

// toggles visual state of the isolation playback buttons
function setIsolationModeVisuals(isActive) 
{
    let btn100 = ge('playVideo100Button');
    let btn50 = ge('playVideo50Button');
    let btn25 = ge('playVideo25Button');

    let activeColor = '#005A9E'; 
    let defaultColor = '#000000';
    let activeTextColor = '#FFFFFF'; 

    if (btn100 && btn50 && btn25) 
    {
        btn100.style.backgroundColor = isActive ? activeColor : defaultColor;
        btn100.style.color = activeTextColor;

        btn50.style.backgroundColor = isActive ? activeColor : defaultColor;
        btn50.style.color = activeTextColor;

        btn25.style.backgroundColor = isActive ? activeColor : defaultColor;
        btn25.style.color = activeTextColor;
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

