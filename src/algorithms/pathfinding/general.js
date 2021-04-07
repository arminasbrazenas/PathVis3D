function assignNodes(nodes, planeIdArr, algorithm)
{
    function node(type)
    {
        if (type == "wall")
            this.isWall = true;

        else
        {
            if (algorithm == "a-star" || algorithm == "bfs")
            {
                this.visited = false;
                this.previousNodeIndex = null;
                //-- gCost - from start to this node; hCost - minimum cost from this node to finish; --//
                this.gCost = Infinity;
                this.hCost = Infinity; 
            }
    
            else if (algorithm == "dijkstra")
            {
                this.visited = false;
                this.previousNodeIndex = null;
                this.gCost = Infinity;
            }
    
            else if (algorithm == "dfs")
            {
                this.previousNodeIndex = null; 
            }
        }
    }

    for (var y = 0; y < grid.height; y++)
    {
        for (var x = 0; x < grid.width; x++)
        {
            if (planeIdArr.includes(y * grid.maxWidth + x))
                this.node = new node("wall");
            else
                this.node = new node();
            nodes.push(this.node);
        }
    }
}

function calculateMoveCost(currentNodeIndex, nextNodeIndex)
{
    var yToNext = Math.abs(parseInt(currentNodeIndex / grid.width) - parseInt(nextNodeIndex / grid.width));
    var xToNext = Math.abs(currentNodeIndex % grid.width - nextNodeIndex % grid.width);
    return parseInt(10 * Math.sqrt(yToNext * yToNext + xToNext * xToNext));
}

function animatePath(path)
{
    if (path.length == 0)
        toggleRunning(false, "path");
    else
    {
        for (var i = 0; i < path.length; i++)
            searchObjects.splice(searchObjects.findIndex(obj => obj.name === path[i].toString()), 1);

        searchMesh.init();
        for (var i = 0; i < searchObjects.length; i++)
            searchMesh.addToMesh(searchObjects[i]);
        scene.add(searchMesh.complete);

        pathMesh.addAllVisited(path);
        for (let i = 0; i < path.length; i++)
        {
            setTimeout(() => {
                pathMesh.animate(i);
                if (i == path.length - 1)
                    toggleRunning(false, "path");
            }, i * pathAnimationSpeed);
        }    
    }
}