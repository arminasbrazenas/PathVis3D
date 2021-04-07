var startIndex, finishIndex;
var searchSpeed, searchAnimationSpeed, pathAnimationSpeed = 20;
var isRunning = false;
var searchDirections;
var elapsedMilliseconds = 0;
function findPath()
{
    if (isRunning == false)
    {
        searchDirections = parseInt(document.getElementsByClassName("current-search-way")[0].id);
        elapsedMilliseconds = 0;
        searchSpeed = parseInt(document.getElementById("search-speed-slider").value);
        searchAnimationSpeed = 1.5 - searchSpeed / 10;
        searchSpeed <= 5 ? searchSpeed = -100 * searchSpeed + 600 : searchSpeed = -20 * searchSpeed + 200;
        clearPath();
        toggleRunning(true, "path");
        searchObjects = [];
        
        var planeIdArr = [];
        for (var i = 0; i < wallGeometries.length; i++)
        {
            var planeId = wallGeometries[i].name.match(/\d/g);
            planeId = parseInt(planeId.join(""));
            planeIdArr.push(planeId - nodes[0].id);
        }
        planeIdArr.sort(function(a, b){ return a - b });
        
        startIndex = (start.nodeId - nodes[0].id) - (grid.maxWidth - grid.width) * parseInt((start.nodeId - nodes[0].id) / grid.maxWidth);
        finishIndex = (finish.nodeId - nodes[0].id) - (grid.maxWidth - grid.width) * parseInt((finish.nodeId - nodes[0].id) / grid.maxWidth);
        switch(document.getElementsByClassName("current-search")[0].id)
        {
            case "a-star-path":
                aStarPath(planeIdArr);
                break;
            case "dijkstra-path":
                dijkstraPath(planeIdArr);
                break;
            case "bfs-path":
                bestFirstSearchPath(planeIdArr);
                break;
            case "dfs-path":
                depthFirstSearchPath(planeIdArr);
                break;
        }
    }
}

var mazeGenerationSpeed, wallAdditionSpeed;
function generateMaze()
{
    if (isRunning == false)
    {
        elapsedMilliseconds = 0;
        wallAdditionSpeed = parseInt(1000 / (grid.height * grid.width));
        mazeGenerationSpeed = parseInt(document.getElementById("generation-speed-slider").value);
        mazeGenerationSpeed <= 5 ? mazeGenerationSpeed = -100 * mazeGenerationSpeed + 600 : mazeGenerationSpeed = -20 * mazeGenerationSpeed + 200;
        mazeGenerationSpeed < 2 ? mazeGenerationSpeed = 2 : mazeGenerationSpeed = mazeGenerationSpeed;
        grid.reset();
        toggleRunning(true, "maze");
        switch(document.getElementsByClassName("current-maze")[0].id)
        {
            case "dfs-maze":
                depthFirstSearchMaze();
                break;
            case "prims-maze":
                primsMaze();
                break;
            case "kruskals-maze":
                kruskalsMaze();
                break;
            case "recursive-maze":
                recursiveDivisionMaze();
                break;
        }
    }
}

function toggleRunning(state, type)
{
    if (state == true)
    {
        if (type == "path")
        {
            document.getElementsByClassName("path-btn")[0].innerHTML = "Searching..."
            document.getElementsByClassName("path-btn")[0].style.color = "#36aeeb";
        }
        else if (type == "maze")
        {
            document.getElementsByClassName("generate-maze-btn")[0].innerHTML = "Generating Maze..."
            document.getElementsByClassName("generate-maze-btn")[0].style.color = "#D5A353";
        }

        isRunning = true;
        for (var i = 0; i < document.getElementsByClassName("command").length; i++)
            document.getElementsByClassName("command")[i].disabled = true;
        for (var i = 0; i < document.getElementsByClassName("slider").length; i++)
            document.getElementsByClassName("slider")[i].disabled = true;            
    }
    else
    {
        if (type == "path")
        {
            document.getElementsByClassName("path-btn")[0].innerHTML = "Find Path";
            document.getElementsByClassName("path-btn")[0].style.color = "";
        }
        else if (type == "maze")
        {
            document.getElementsByClassName("generate-maze-btn")[0].innerHTML = "Generate Maze";
            document.getElementsByClassName("generate-maze-btn")[0].style.color = "";
        }

        isRunning = false;
        for (var i = 0; i < document.getElementsByClassName("command").length; i++)
            document.getElementsByClassName("command")[i].disabled = false;
        for (var i = 0; i < document.getElementsByClassName("slider").length; i++)
            document.getElementsByClassName("slider")[i].disabled = false;
    }
}

function clearPath()
{
    searchMesh.init();
    pathMesh.init();
}