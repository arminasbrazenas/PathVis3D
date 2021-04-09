var isSettingsOpen;
if (window.innerWidth > 1150)
{
    currentState = "desktop"; previousState = "desktop";
    isSettingsOpen = true;
    settingsOpenBeforeMobile = true;
    document.getElementsByClassName("settings-overlay")[0].classList.add("active");
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
    isSettingsOpen = !isSettingsOpen;
    document.getElementsByClassName("settings-overlay")[0].classList.toggle("active");
    onWindowResize(isSettingsOpen);

    var blur = document.getElementsByClassName("three-scene")[0];
    isSettingsOpen == true ? blur.style.width = "calc(100vw - 500px)" : blur.style.width = "100vw";
}

function switchPickBackwards(className, currentOption)
{
    if (isRunning == false)
    {
        var length = document.getElementsByClassName(className).length;
        for (var i = 0; i < length; i++)
        {
            if (document.getElementsByClassName(className)[i] == document.getElementsByClassName(currentOption)[0])
            {
                document.getElementsByClassName(currentOption)[0].classList.remove(currentOption);
                if (i > 0)
                    document.getElementsByClassName(className)[i - 1].classList.add(currentOption);
                else
                    document.getElementsByClassName(className)[length - 1].classList.add(currentOption);
                return;
            }
        }
    }
}

function switchPickForwards(className, currentOption)
{
    if (isRunning == false)
    {
        var length = document.getElementsByClassName(className).length;
        for (var i = 0; i < length; i++)
        {
            if (document.getElementsByClassName(className)[i] == document.getElementsByClassName(currentOption)[0])
            {
                document.getElementsByClassName(currentOption)[0].classList.remove(currentOption);
                if (i == length - 1)
                    document.getElementsByClassName(className)[0].classList.add(currentOption);
                else
                    document.getElementsByClassName(className)[i + 1].classList.add(currentOption);
                return;          
            }
        }
    }
}

for (var i = 0; i < document.getElementsByClassName("search-algorithms").length; i++)
{
    document.getElementsByClassName("search-algorithms")[i].addEventListener("click", function() {
        switchPickForwards(`search-algorithms`, `current-search`);
    }, false);
}

for (var i = 0; i < document.getElementsByClassName("maze-algorithms").length; i++)
{
    document.getElementsByClassName("maze-algorithms")[i].addEventListener("click", function() {
        switchPickForwards(`maze-algorithms`, `current-maze`);
    }, false);
}

for (var i = 0; i < document.getElementsByClassName("search-ways").length; i++)
{
    document.getElementsByClassName("search-ways")[i].addEventListener("click", function() {
        switchPickForwards(`search-ways`, `current-search-way`);
    }, false);
}

function closeSettingsIfMobile()
{
    if (currentState == "mobile")
        toggleSettings();
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
    window.innerWidth <= 1150 ? currentState = "mobile" : currentState = "desktop";
    
    if (currentState == "mobile" && previousState == "desktop" && isSettingsOpen == true)
    {
        toggleSettings();
        controls.maxDistance = mobileMaxZoom;
    }
    else if (currentState == "desktop" && previousState == "mobile" && settingsOpenBeforeMobile == true && isSettingsOpen == false)
    {
        toggleSettings();
        controls.maxDistance = desktopMaxZoom;
    }
}