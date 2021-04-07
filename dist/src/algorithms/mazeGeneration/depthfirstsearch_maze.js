function depthFirstSearchMaze()
{
    function MazeNode(wallIndex)
    {
        wallIndex != -1 ? this.wallMeshIndex = wallIndex : this.visited = false;
    }

    function removeWall(visitIndex, wallIndex)
    {
        mazeNodes[visitIndex].visited = true;
        nodeStack.push(visitIndex);
        setTimeout(() => {
            walls.removeNonmerge(mazeNodes[wallIndex].wallMeshIndex);
        }, elapsedMilliseconds);
    }

    var mazeNodes = [], nodeStack = [];
    for (let i = 0; i < nodes.length; i++)
    {
        setTimeout(() => {
            if ((parseInt(i / grid.width) + 1) % 2 == 0 || (i + 1) % 2 == 0)
                mazeNodes.push(new MazeNode(walls.addNonmerge(nodes[i])));
            else
                mazeNodes.push(new MazeNode(-1));
        }, elapsedMilliseconds += wallAdditionSpeed);
    }

    setTimeout(() => {
        elapsedMilliseconds = 0;
        var currentNode = 0;
        mazeNodes[currentNode].visited = true;
        nodeStack.push(currentNode);
        
        while (nodeStack.length != 0)
        {
            currentNode = nodeStack.pop();
            var possibleDirections = [];

            if (currentNode - grid.width * 2 >= 0 && mazeNodes[currentNode - grid.width * 2].visited === false)
                possibleDirections.push("N");
            if (currentNode + grid.width * 2 < grid.width * grid.height && mazeNodes[currentNode + grid.width * 2].visited === false)
                possibleDirections.push("S");
            if ((currentNode + 1) % grid.width != 0 && mazeNodes[currentNode + 2].visited === false)
                possibleDirections.push("E");
            if (currentNode % grid.width != 0 && mazeNodes[currentNode - 2].visited === false)
                possibleDirections.push("W");
    
            if (possibleDirections.length != 0)
            {
                nodeStack.push(currentNode);

                let direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                elapsedMilliseconds += mazeGenerationSpeed;

                if (direction == "N")
                    removeWall(currentNode - grid.width * 2, currentNode - grid.width);
                else if (direction == "S")
                    removeWall(currentNode + grid.width * 2, currentNode + grid.width);
                else if (direction == "E")
                    removeWall(currentNode + 2, currentNode + 1);
                else if (direction == "W")
                    removeWall(currentNode - 2, currentNode - 1);
            }
        }

        setTimeout(() => {
            walls.mergeAll();
            toggleRunning(false, "maze");
        }, elapsedMilliseconds);
        
    }, wallAdditionSpeed * nodes.length + 750);
}