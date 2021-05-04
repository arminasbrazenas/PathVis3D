function aStarPath(planeIdArr)
{
    function calculateHCost4Directional(nodeIndex)
    {
        return Math.abs(parseInt(finishIndex / grid.width) - parseInt(nodeIndex / grid.width)) + Math.abs(finishIndex % grid.width - nodeIndex % grid.width);
    }

    function calculateHCost8Directional(nodeIndex)
    {
        var yDistance = Math.abs(Math.abs(parseInt(finishIndex / grid.width) - parseInt(nodeIndex / grid.width)));
        var xDistance = Math.abs(finishIndex % grid.width - nodeIndex % grid.width);
        if (xDistance > yDistance)
            return 14 * yDistance + 10 * (xDistance - yDistance);
        else
            return 14 * xDistance + 10 * (yDistance - xDistance);
    }

    function modifyNodeValues(nodeIndex, currentNodeIndex)
    {
        nodes[nodeIndex].previousNodeIndex = currentNodeIndex;
        if (searchDirections == 4)
        {
            nodes[nodeIndex].gCost = nodes[currentNodeIndex].gCost + 1;
            nodes[nodeIndex].hCost = calculateHCost4Directional(nodeIndex);
        }
        else
        {
            nodes[nodeIndex].gCost = nodes[currentNodeIndex].gCost + calculateMoveCost(currentNodeIndex, nodeIndex);
            nodes[nodeIndex].hCost = calculateHCost8Directional(nodeIndex);
        }
    }

    function evaluateNode(currentNodeIndex, nextNodeIndex)
    {
        if (!openArr.includes(nodes[nextNodeIndex]))
        {
            openArr.push(nodes[nextNodeIndex]);
            modifyNodeValues(nextNodeIndex, currentNodeIndex);
        }
        else if ((searchDirections == 4 && nodes[nextNodeIndex].gCost > nodes[currentNodeIndex].gCost + 1) || 
        (searchDirections == 8 && nodes[nextNodeIndex].gCost > nodes[currentNodeIndex].gCost + calculateMoveCost(currentNodeIndex, nextNodeIndex)))
            modifyNodeValues(nextNodeIndex, currentNodeIndex); 
    }

    var nodes = [];
    assignNodes(nodes, planeIdArr, "a-star");

    var openArr = [];
    nodes[startIndex].previousNodeIndex = startIndex;
    nodes[startIndex].gCost = 0;
    if (searchDirections == 4)
        nodes[startIndex].hCost = calculateHCost4Directional(startIndex);
    else
        nodes[startIndex].hCost = calculateHCost8Directional(startIndex);
    openArr.push(nodes[startIndex]);
    
    var interval = setInterval(() => {
        openArr.sort(function(a, b) {
            if ((a.gCost + a.hCost < b.gCost + b.hCost) || (a.gCost + a.hCost == b.gCost + b.hCost && a.hCost < b.hCost)) return -1;
            else return 1;
        });

        if (openArr.length == 0)
        {
            clearInterval(interval);
            setTimeout(() => {
                toggleRunning(false, "path");
            }, searchAnimationSpeed * 2 * 1000);
            return;
        }

        var currentNodeIndex = nodes.indexOf(openArr.shift());
        nodes[currentNodeIndex].visited = true;
        if (currentNodeIndex != startIndex && currentNodeIndex != finishIndex)
            searchMesh.add(parseInt(currentNodeIndex / grid.width) * grid.maxWidth + (currentNodeIndex % grid.width));

        if (currentNodeIndex == finishIndex)
        {
            clearInterval(interval);
            setTimeout(() => {
                var path = [];
                while(nodes[currentNodeIndex].previousNodeIndex != startIndex)
                {
                    path.unshift(nodes[currentNodeIndex].previousNodeIndex);
                    currentNodeIndex = nodes[currentNodeIndex].previousNodeIndex;
                }
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
    }, searchSpeed);
}