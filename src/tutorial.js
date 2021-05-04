var isTutorialOpen = false;
var settingsOpenBeforeTutorial = false;

function toggleTutorial()
{
    isTutorialOpen = !isTutorialOpen;
    if (isTutorialOpen == true)
    {
        //toggleMainButtons(true);
        isSettingsOpen == true ? settingsOpenBeforeTutorial = true : settingsOpenBeforeTutorial = false;
    }
    else
    {
        //toggleMainButtons(false);
        if (settingsOpenBeforeTutorial == true) toggleSettings();
    }

    if (isTutorialOpen == true)
    {
        isSettingsOpen = false;
        document.getElementsByClassName("settings")[0].classList.remove("active");
        document.getElementsByClassName("three-scene")[0].style.width = "100vw";
        onWindowResize(isSettingsOpen);
    }
    document.getElementsByClassName("three-scene")[0].classList.toggle("active");
    document.getElementsByClassName("tutorial-wrap")[0].classList.toggle("active");
}

/*function toggleMainButtons(state)
{
    for (var i = 0; i < document.getElementsByClassName("main-btn").length; i++)
    {
        var button = document.getElementsByClassName("main-btn")[i];
        button.disabled = state;
        button.classList.toggle("no-effects");
    }
}*/

/*var settingsOpenBeforeTutorial = false;
function toggleTutorial()
{
    isTutorialOpen = !isTutorialOpen;
    if (isTutorialOpen == true)
    {
        toggleMainButtons(true);
        isSettingsOpen == true ? settingsOpenBeforeTutorial = true : settingsOpenBeforeTutorial = false;
    }
    else
    {
        toggleMainButtons(false);
        if (settingsOpenBeforeTutorial == true)
            toggleSettings();
    }

    document.getElementsByClassName("current-page")[0].classList.remove("current-page");
    document.getElementsByClassName("tutorial-pages")[0].classList.add("current-page");

    if (isTutorialOpen == true)
    {
        isSettingsOpen = false;
        document.getElementsByClassName("settings-overlay")[0].classList.remove("active");
        onWindowResize(isSettingsOpen);

        document.getElementsByClassName("three-scene")[0].style.width = "100vw";
    }

    document.getElementsByClassName("three-scene")[0].classList.toggle("active");
    document.getElementsByClassName("tutorial-container")[0].classList.toggle("active");
}

function switchTutorialForwards()
{
    var pages = document.getElementsByClassName("tutorial-pages");
    for (var i = 0; i < pages.length; i++)
    {
        if (pages[i].classList.contains("current-page"))
        {
            if (i + 1 < pages.length)
            {
                pages[i].classList.remove("current-page");
                pages[i + 1].classList.add("current-page");

                if (i == pages.length - 2)
                    document.getElementsByClassName("next-btn")[0].innerHTML = "Exit";
            }
            else
            {
                document.getElementsByClassName("next-btn")[0].innerHTML = "Next";
                toggleTutorial();
            }
            return;
        }
    }
}

function switchTutorialBackwards()
{
    var pages = document.getElementsByClassName("tutorial-pages");
    for (var i = 0; i < pages.length; i++)
    {
        if (pages[i].classList.contains("current-page") && i != 0)
        {
            pages[i].classList.remove("current-page");
            pages[i - 1].classList.add("current-page");

            if (i == pages.length - 1)
                document.getElementsByClassName("next-btn")[0].innerHTML = "Next";
            return;
        }
    }
}

function toggleMainButtons(state)
{
    for (var i = 0; i < document.getElementsByClassName("main-btn").length; i++)
    {
        var button = document.getElementsByClassName("main-btn")[i];
        button.disabled = state;
        button.classList.toggle("no-effects");
    }
}*/