function dijkstraPath(planeIdArr)
{
    function evaluateNode(currentNodeIndex, nextNodeIndex)
    {
        var moveCost = calculateMoveCost(currentNodeIndex, nextNodeIndex);
        if (nodes[currentNodeIndex].gCost + moveCost < nodes[nextNodeIndex].gCost)
        {
            nodes[nextNodeIndex].previousNodeIndex = currentNodeIndex;
            nodes[nextNodeIndex].gCost = nodes[currentNodeIndex].gCost + moveCost;
        }
    }

    var nodes = [];
    assignNodes(nodes, planeIdArr, "dijkstra");
    
    nodes[startIndex].previousNodeIndex = startIndex;
    nodes[startIndex].gCost = 0;

    var interval = setInterval(() => {
        var currentNodeIndex = startIndex, minCost = Infinity;
        for (var i = 0; i < nodes.length; i++)
        {
            if (nodes[i].visited === false && nodes[i].gCost < minCost)
            {
                currentNodeIndex = i;
                minCost = nodes[i].gCost;
            }
        }

        if (currentNodeIndex == startIndex && minCost == Infinity)
        {
            clearInterval(interval);
            setTimeout(() => {
                toggleRunning(false, "path");
            }, searchAnimationSpeed * 2 * 1000);
            return;
        }

        if (currentNodeIndex == finishIndex)
        {
            clearInterval(interval);
            setTimeout(() => {
                var path = [];
                while (currentNodeIndex != startIndex)
                {
                    path.unshift(nodes[currentNodeIndex].previousNodeIndex);
                    currentNodeIndex = nodes[currentNodeIndex].previousNodeIndex;
                }
                path.shift();

                animatePath(path);
            }, searchAnimationSpeed * 2 * 1000);
            return;
        }

        //-- Check North --//
        if (currentNodeIndex - grid.width >= 0 && nodes[currentNodeIndex - grid.width].visited === false)
            evaluateNode(currentNodeIndex, currentNodeIndex - grid.width);
        //-- Check South --//
        if (currentNodeIndex + grid.width < grid.width * grid.height && nodes[currentNodeIndex + grid.width].visited === false)
            evaluateNode(currentNodeIndex, currentNodeIndex + grid.width);
        //-- Check East --//
        if ((currentNodeIndex + 1) % grid.width != 0 && nodes[currentNodeIndex + 1].visited === false)
            evaluateNode(currentNodeIndex, currentNodeIndex + 1);
        //-- Check West --//
        if (currentNodeIndex % grid.width != 0 && nodes[currentNodeIndex - 1].visited === false)
            evaluateNode(currentNodeIndex, currentNodeIndex - 1);

        if (searchDirections == 8)
        {
            //-- Check North West --//
            if (currentNodeIndex - grid.width - 1 >= 0 && nodes[currentNodeIndex - grid.width - 1].visited === false && currentNodeIndex % grid.width != 0
            && (nodes[currentNodeIndex - grid.width].isWall !== true || nodes[currentNodeIndex - 1].isWall !== true))
                evaluateNode(currentNodeIndex, currentNodeIndex - grid.width - 1);
            //-- Check North East --//
            if (currentNodeIndex - grid.width + 1 >= 0 && nodes[currentNodeIndex - grid.width + 1].visited === false && (currentNodeIndex + 1) % grid.width != 0
            && (nodes[currentNodeIndex - grid.width].isWall !== true || nodes[currentNodeIndex + 1].isWall !== true))
                evaluateNode(currentNodeIndex, currentNodeIndex - grid.width + 1);
            //-- Check South West --//
            if (currentNodeIndex + grid.width - 1 < grid.width * grid.height && nodes[currentNodeIndex + grid.width - 1].visited === false && currentNodeIndex % grid.width != 0
            && (nodes[currentNodeIndex + grid.width].isWall !== true || nodes[currentNodeIndex - 1].isWall !== true))
                evaluateNode(currentNodeIndex, currentNodeIndex + grid.width - 1);
            //-- Check South East --//
            if (currentNodeIndex + grid.width + 1 < grid.width * grid.height && nodes[currentNodeIndex + grid.width + 1].visited === false && (currentNodeIndex + 1) % grid.width != 0
            && (nodes[currentNodeIndex + grid.width].isWall !== true || nodes[currentNodeIndex + 1].isWall !== true))
                evaluateNode(currentNodeIndex, currentNodeIndex + grid.width + 1);
        }

        nodes[currentNodeIndex].visited = true;
        if (currentNodeIndex != finishIndex && currentNodeIndex != startIndex)
            searchMesh.add(parseInt(currentNodeIndex / grid.width) * grid.maxWidth + (currentNodeIndex % grid.width));
    }, searchSpeed);}