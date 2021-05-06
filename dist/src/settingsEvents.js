var isSettingsOpen;
if (window.innerWidth > 1000)
{
    currentState = "desktop"; previousState = "desktop";
    isSettingsOpen = true;
    settingsOpenBeforeMobile = true;
    document.getElementsByClassName("settings")[0].classList.add("active");
    document.getElementsByClassName("three-scene")[0].style.width = "calc(100vw - 500px)";
}
else
{
    currentState = "mobile"; previousState = "mobile";
    isSettingsOpen = false;
    settingsOpenBeforeMobile = false;
    document.getElementsByClassName("three-scene")[0].style.width = "100vw";
}

function toggleSettings()
{
    if (isTutorialOpen == false)
        document.getElementsByClassName("settings")[0].classList.contains("active") ? closeSettings() : openSettings();
}

function closeSettings()
{
    isSettingsOpen = false;
    document.getElementsByClassName("settings")[0].classList.remove("active");
    onWindowResize(isSettingsOpen);

    document.getElementsByClassName("three-scene")[0].style.width = "calc(100vw)";   
}

function openSettings()
{
    isSettingsOpen = true;
    document.getElementsByClassName("settings")[0].classList.add("active");
    onWindowResize(isSettingsOpen);

    document.getElementsByClassName("three-scene")[0].style.width = "calc(100vw - 500px)";   
}

for (var i = 0; i < document.getElementsByClassName("btn-wrap").length; i++)
{
    document.getElementsByClassName("btn-wrap")[i].addEventListener("click", () => {
        if (currentState == "mobile")
            closeSettings();
    })
}

var settingsOpenBeforeMobile;
var currentState, previousState;
window.addEventListener("resize", onWindowResize, false);
function onWindowResize()
{
    if (isSettingsOpen == false)
    {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        if (currentState == "desktop") settingsOpenBeforeMobile = false;
    }
    else
    {
        renderer.setSize(window.innerWidth - 500, window.innerHeight);
        camera.aspect = (window.innerWidth - 500) / window.innerHeight;  

        if (currentState == "desktop") settingsOpenBeforeMobile = true;
    }
    camera.updateProjectionMatrix();

    previousState = currentState;
    window.innerWidth <= 1000 ? currentState = "mobile" : currentState = "desktop";
    
    if (currentState == "mobile" && previousState == "desktop" && isSettingsOpen == true)
    {
        closeSettings();
        controls.maxDistance = mobileMaxZoom;
    }
    else if (currentState == "desktop" && previousState == "mobile" && settingsOpenBeforeMobile == true && isSettingsOpen == false && isTutorialOpen == false)
    {
        openSettings();
        controls.maxDistance = desktopMaxZoom;
    }
}

function openSettingsTypeOptions(index)
{
    document.getElementsByClassName("settings-type-wrapper")[index].classList.toggle("active");
    document.getElementsByClassName("type-wrapper-options")[index].classList.toggle("active");
}

function switchSelectorForwards(className)
{
    if (isRunning == false)
    {
        var length = document.getElementsByClassName(className).length;
        for (var i = 0; i < length; i++)
        {
            if (document.getElementsByClassName(className)[i].classList.contains("current"))
            {
                document.getElementsByClassName(className)[i].classList.remove("current");
                if (i == length - 1) 
                    document.getElementsByClassName(className)[0].classList.add("current");
                else
                    document.getElementsByClassName(className)[i + 1].classList.add("current");
                return;
            }
        }
    }
}

function switchSelectorBackwards(className)
{
    if (isRunning == false)
    {
        var length = document.getElementsByClassName(className).length;
        for (var i = 0; i < length; i++)
        {
            if (document.getElementsByClassName(className)[i].classList.contains("current"))
            {
                document.getElementsByClassName(className)[i].classList.remove("current");
                if (i > 0)
                    document.getElementsByClassName(className)[i - 1].classList.add("current");
                else
                    document.getElementsByClassName(className)[length - 1].classList.add("current");
                return;
            }
        }
    }
}

function addSelectorSwitchForClass(className)
{
    for (var i = 0; i < document.getElementsByClassName(className).length; i++)
    {
        document.getElementsByClassName(className)[i].addEventListener("click", function() {
            switchSelectorForwards(className);
        }, false);
    }
}

addSelectorSwitchForClass("pathfinding-algorithms");
addSelectorSwitchForClass("pathfinding-type");
addSelectorSwitchForClass("maze-algorithms");