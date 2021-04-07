function recursiveDivisionMaze()
{
    function chooseOrientation(width, height)
    {
        var orientation;
        if (width > height)
            orientation = "vertical";
        else if (width < height)
            orientation = "horizontal";
        else
            Math.floor(Math.random() * 2) == 0 ? orientation = "vertical" : orientation = "horizontal";
        return orientation;
    }

    function specialRandom(min, max, divisor)
    {
        const random = Math.random() * (max - min) + min;
        const num = Math.round(random / divisor) * divisor;
        return num;
    }

    function divide(x1, y1, x2, y2)
    {
        if (x2 - x1 < 2 || y2 - y1 < 2)
            return;
        var orientation = chooseOrientation(x2 - x1, y2 - y1);
        
        if (orientation == "vertical")
        {
            var start = specialRandom(x1 + 1, x2, 2) - 1;
            var passage = specialRandom(y1, y2, 2);

            for (var y = y1; y <= y2; y++)
            {
                elapsedMilliseconds += mazeGenerationSpeed;
                if (y != passage)
                {
                    let temp = start + y * grid.width;
                    setTimeout(() => {
                        walls.addNonmerge(nodes[temp]);
                    }, elapsedMilliseconds);
                }
            }
            
            divide(x1, y1, start - 1, y2);
            divide(start + 1, y1, x2, y2);
        }
        else
        {
            var start = specialRandom(y1 + 1, y2, 2) - 1;
            var passage = specialRandom(x1, x2, 2);

            for (var x = x1; x <= x2; x++)
            {
                elapsedMilliseconds += mazeGenerationSpeed;
                if (x != passage)
                {
                    let temp = start * grid.width + x;
                    setTimeout(() => {
                        walls.addNonmerge(nodes[temp]);
                    }, elapsedMilliseconds);
                }
            }
            
            divide(x1, y1, x2, start - 1);
            divide(x1, start + 1, x2, y2);
        }
    }

    divide(0, 0, grid.width - 1, grid.height - 1);

    setTimeout(() => {
        walls.mergeAll();
        toggleRunning(false, "maze");
    }, elapsedMilliseconds + 600);
}