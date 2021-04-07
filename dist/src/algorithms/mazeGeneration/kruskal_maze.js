function kruskalsMaze()
{
    function MazeNode(key, wallMeshIndex, splitWalls)
    {
        if (key !== null)
            this.root = key;
        else
        {
            this.wallMeshIndex = wallMeshIndex;
            this.splitWalls = splitWalls;
        }
    }

    var mazeNodes = [], edges = [];  
    for (let i = 0; i < nodes.length; i++)
    {
        setTimeout(() => {
            if ((i + 1) % 2 == 0)
            {
                var index = walls.addNonmerge(nodes[i]);
                if ((parseInt(i / grid.width) + 1) % 2 == 0)
                    mazeNodes.push(new MazeNode(null, index, [i - grid.width, i + grid.width]));
                else
                    mazeNodes.push(new MazeNode(null, index, [i - 1, i + 1]));
                edges.push(mazeNodes[mazeNodes.length - 1]);
            }
            else if ((parseInt(i / grid.width) + 1) % 2 == 0)
            {
                var index = walls.addNonmerge(nodes[i]);
                mazeNodes.push(new MazeNode(null, index, null));
            }
            else
            {
                mazeNodes.push(new MazeNode(i, null, null));
            }
        }, elapsedMilliseconds += wallAdditionSpeed);
    }

    elapsedMilliseconds = 0;
    setTimeout(() => {
        edges = shuffle(edges);
        while(edges.length != 0)
        {
            var lastIndex = edges.length - 1;
            if (mazeNodes[edges[lastIndex].splitWalls[0]].root != mazeNodes[edges[lastIndex].splitWalls[1]].root)
            {
                elapsedMilliseconds += mazeGenerationSpeed;
                let temp = edges[lastIndex].wallMeshIndex;
                setTimeout(() => {
                    walls.removeNonmerge(temp);
                }, elapsedMilliseconds);
                var a = mazeNodes[edges[lastIndex].splitWalls[1]].root;
                for (var i = 0; i < mazeNodes.length; i++)
                    if (mazeNodes[i].root == a)
                        mazeNodes[i].root = mazeNodes[edges[lastIndex].splitWalls[0]].root;
            }
            edges.pop();
        }
        
        setTimeout(() => {
            walls.mergeAll();
            toggleRunning(false, "maze");
        }, elapsedMilliseconds);

    }, wallAdditionSpeed * nodes.length + 750);
}