function depthFirstSearchPath(planeIdArr)
{
    function visitNode(currentNodeIndex, nextIndex)
    {
        stack.push(nodes[nextIndex]);
        nodes[nextIndex].previousNodeIndex = currentNodeIndex;
    }

    var nodes = [], stack = [];
    assignNodes(nodes, planeIdArr, "dfs");

    stack.push(nodes[startIndex]);
    nodes[startIndex].previousNodeIndex = 0;
    var interval = setInterval(() => {
        if (stack.length == 0)
        {
            clearInterval(interval);
            setTimeout(() => {
                searchMesh.mergeAll();
                toggleRunning(false, "path");
            }, searchAnimationSpeed * 2 * 1000);
            return;
        }
        var currentNodeIndex = nodes.indexOf(stack.pop());
        if (currentNodeIndex == finishIndex) 
        {
            stack.push(nodes[currentNodeIndex]);
            clearInterval(interval);
            setTimeout(() => {
                searchMesh.mergeAll();

                var path = [];
                for (var i = 2; i < stack.length; i++)
                    path[i - 2] = stack[i].previousNodeIndex;

                animatePath(path);
            }, searchAnimationSpeed * 2 * 1000);
            return;
        }

        if (currentNodeIndex != startIndex && currentNodeIndex != finishIndex)
            searchMesh.addNonmerge(parseInt(currentNodeIndex / grid.width) * grid.maxWidth + (currentNodeIndex % grid.width));

        var direction = null;
        
        if (searchDirections == 4)
        {
            if (currentNodeIndex + grid.width < grid.width * grid.height && nodes[currentNodeIndex + grid.width].previousNodeIndex === null)
                direction = "S";
            else if ((currentNodeIndex + 1) % grid.width != 0 && nodes[currentNodeIndex + 1].previousNodeIndex === null)
                direction = "E";
            else if (currentNodeIndex % grid.width != 0 && nodes[currentNodeIndex - 1].previousNodeIndex === null)
                direction = "W";
            else if (currentNodeIndex - grid.width >= 0 && nodes[currentNodeIndex - grid.width].previousNodeIndex === null)
                direction = "N";
        }
        else
        {
            if (currentNodeIndex + grid.width + 1 < grid.width * grid.height && (currentNodeIndex + 1) % grid.width != 0 && nodes[currentNodeIndex + grid.width + 1].previousNodeIndex === null
            && (nodes[currentNodeIndex + grid.width].isWall !== true || nodes[currentNodeIndex + 1].isWall !== true))
                direction = "SE";
            else if (currentNodeIndex + grid.width - 1 < grid.width * grid.height && currentNodeIndex % grid.width != 0 && nodes[currentNodeIndex + grid.width - 1].previousNodeIndex === null
            && (nodes[currentNodeIndex + grid.width].isWall !== true || nodes[currentNodeIndex - 1].isWall !== true))
                direction = "SW";
            else if (currentNodeIndex - grid.width + 1 >= 0 && (currentNodeIndex + 1) % grid.width != 0 && nodes[currentNodeIndex - grid.width + 1].previousNodeIndex === null
            && (nodes[currentNodeIndex - grid.width].isWall !== true || nodes[currentNodeIndex + 1].isWall !== true))
                direction = "NE"; 
            else if (currentNodeIndex - grid.width - 1 >= 0 && currentNodeIndex % grid.width != 0 && nodes[currentNodeIndex - grid.width - 1].previousNodeIndex === null
            && (nodes[currentNodeIndex - grid.width].isWall !== true || nodes[currentNodeIndex - 1].isWall !== true))
                direction = "NW";       
            else if (currentNodeIndex + grid.width < grid.width * grid.height && nodes[currentNodeIndex + grid.width].previousNodeIndex === null)
                direction = "S";
            else if ((currentNodeIndex + 1) % grid.width != 0 && nodes[currentNodeIndex + 1].previousNodeIndex === null)
                direction = "E";
            else if (currentNodeIndex % grid.width != 0 && nodes[currentNodeIndex - 1].previousNodeIndex === null)
                direction = "W";
            else if (currentNodeIndex - grid.width >= 0 && nodes[currentNodeIndex - grid.width].previousNodeIndex === null)
                direction = "N";
        }

        if (direction !== null)
        {
            stack.push(nodes[currentNodeIndex]);
            if (direction == "N")
                visitNode(currentNodeIndex, currentNodeIndex - grid.width);
            else if (direction == "S")
                visitNode(currentNodeIndex, currentNodeIndex + grid.width);
            else if (direction == "E")
                visitNode(currentNodeIndex, currentNodeIndex + 1);
            else if (direction == "W")
                visitNode(currentNodeIndex, currentNodeIndex - 1);
            else if (direction == "NW")
                visitNode(currentNodeIndex, currentNodeIndex - grid.width - 1);
            else if (direction == "NE")
                visitNode(currentNodeIndex, currentNodeIndex - grid.width + 1);
            else if (direction == "SW")
                visitNode(currentNodeIndex, currentNodeIndex + grid.width - 1);
            else if (direction == "SE")
                visitNode(currentNodeIndex, currentNodeIndex + grid.width + 1);
        }
    }, searchSpeed);
}