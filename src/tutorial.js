var isTutorialOpen = false;
var settingsOpenBeforeTutorial = false;

function toggleTutorial()
{
    isTutorialOpen = !isTutorialOpen;
    document.getElementsByClassName("hamburger-wrap")[0].classList.toggle("no-effects");
    if (isTutorialOpen == true)
    {
        document.querySelector(".tutorial-pages.current").classList.remove("current");
        document.getElementsByClassName("tutorial-pages")[0].classList.add("current");
        document.getElementsByClassName("next-btn")[0].innerHTML = "Next";

        isSettingsOpen == true ? settingsOpenBeforeTutorial = true : settingsOpenBeforeTutorial = false;
    }
    else
    {
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

function switchTutorialForwards()
{
    var pages = document.getElementsByClassName("tutorial-pages");
    for (var i = 0; i < pages.length; i++)
    {
        if (pages[i].classList.contains("current"))
        {
            if (i + 1 < pages.length)
            {
                pages[i].classList.remove("current");
                pages[i + 1].classList.add("current");

                if (i == pages.length - 2)
                    document.getElementsByClassName("next-btn")[0].innerHTML = "Exit";
            }
            else
                toggleTutorial();
            return;
        }
    }
}

function switchTutorialBackwards()
{
    var pages = document.getElementsByClassName("tutorial-pages");
    for (var i = 0; i < pages.length; i++)
    {
        if (pages[i].classList.contains("current") && i != 0)
        {
            pages[i].classList.remove("current");
            pages[i - 1].classList.add("current");

            if (i == pages.length - 1)
                document.getElementsByClassName("next-btn")[0].innerHTML = "Next";
            return;
        }
    }
}