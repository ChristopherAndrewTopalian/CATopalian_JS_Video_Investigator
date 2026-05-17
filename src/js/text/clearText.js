// clearText.js

function clearText()
{
    let warningDelete = confirm("CLEAR ALL TEXT?");

    if (warningDelete == true)
    {
        ge('startInput').value = "00:00:00";

        ge('endInput').value = "00:00:00";

        ge('theStartMinutes2').textContent = "00:00:00";

        ge('theEndMinutes2').textContent = "00:00:00";

        ge('noteInput').value = "";

        ge('wordsInput').value = "";

        ge('conclusionInput').value = "";

        ge('displayNote').textContent = "Notes";

        ge('displayWords').textContent = "Words";

        ge('displayConclusion').textContent = "Conclusion";
    }
    else if (warningDelete == false)
    {
        alert("Canceled");

        return;
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

