function primsMaze()
{
    function MazeNode(wallMeshIndex)
    {
        if (wallMeshIndex == -1)
        {
            this.visited = false;
            this.neighbourWalls = [];
        }
        else
            this.wallMeshIndex = wallMeshIndex;
    }

    var mazeNodes = [], frontier = [];
    for (let i = 0; i < nodes.length; i++)
    {
        setTimeout(() => {
            if ((parseInt(i / grid.width) + 1) % 2 == 0 || (i + 1) % 2 == 0)
                mazeNodes.push(new MazeNode(walls.addNonmerge(nodes[i])));
            else
            {
                mazeNodes.push(new MazeNode(-1));
                frontier.push(i);
            }
        }, elapsedMilliseconds += wallAdditionSpeed);
    }

    elapsedMilliseconds = 0;
    setTimeout(() => {
        var currentNode = frontier[Math.floor(Math.random() * frontier.length)];
        frontier = [currentNode];
        while (frontier.length != 0)
        {
            mazeNodes[currentNode].visited = true;
            while (frontier.indexOf(currentNode) != -1)
                frontier.splice(frontier.indexOf(currentNode), 1);
            //-- NORTH --//
            if (currentNode - 2 * grid.width >= 0 && mazeNodes[currentNode - 2 * grid.width].visited === false)
            {
                frontier.push(currentNode - 2 * grid.width);
                mazeNodes[currentNode - 2 * grid.width].neighbourWalls.push(mazeNodes[currentNode - grid.width]);
            }
            //-- SOUTH --//
            if (currentNode + 2 * grid.width < grid.width * grid.height && mazeNodes[currentNode + 2 * grid.width].visited === false)
            {
                frontier.push(currentNode + 2 * grid.width);
                mazeNodes[currentNode + 2 * grid.width].neighbourWalls.push(mazeNodes[currentNode + grid.width]);
            }
            //-- EAST --//
            if ((currentNode + 1) % grid.width != 0 && mazeNodes[currentNode + 2].visited === false)
            {
                frontier.push(currentNode + 2);
                mazeNodes[currentNode + 2].neighbourWalls.push(mazeNodes[currentNode + 1]);
            }
            //-- WEST --//
            if (currentNode % grid.width != 0 && mazeNodes[currentNode - 2].visited === false)
            {
                frontier.push(currentNode - 2);
                mazeNodes[currentNode - 2].neighbourWalls.push(mazeNodes[currentNode - 1]);
            }

            if (frontier.length == 0)
            {
                setTimeout(() => {
                    walls.mergeAll();
                    toggleRunning(false, "maze");
                }, elapsedMilliseconds);  
                return;         
            }

            currentNode = frontier[Math.floor(Math.random() * frontier.length)];  
            let wallAnimation = mazeNodes[currentNode].neighbourWalls[Math.floor(Math.random() * mazeNodes[currentNode].neighbourWalls.length)].wallMeshIndex;
            elapsedMilliseconds += mazeGenerationSpeed;
            setTimeout(() => {
                walls.removeNonmerge(wallAnimation);
            }, elapsedMilliseconds);
        }
    }, wallAdditionSpeed * nodes.length + 750);
}