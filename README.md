# PathVis3d
This application was built as an end-of-year school assessment whose purpose was to visualize the process behind pathfinding robots. As I primarily focused on a robotics competition called Micromouse, it was necessary to build a maze generator. To make it look more aesthetically pleasing to the eye as well as to challenge myself, I decided to visualize everything in 3D. Thanks to the Three.js library, it was not as hard as I thought it to would be. The app can be found here: https://arminasbrazenas.github.io/PathVis3d/

### Pathfinding algorithms
- __A* algorithm__ - one of the best and most popular algorithms used in path-finding due to its completeness, optimality and efficiency. It's weighted and guarantees the shortest path.
- __Depth First Search__ - investigated in the 19th century by French mathematician Charles Pierre Trémaux as a strategy for solving mazes. It's unweighted and doesn't guarantee the shortest path.
- __Dijkstra's algorithm__ - a really famous algorithm in the world of pathfinding, which was conceived by Dutch computer scientist Edsger W. Dijkstra in 1956. It's weighted and guarantees the shortest path.
- __Greedy Best First Search__ - unlike A*, this algorithm only relies on the estimated cost to get to the finish node, but not the start node. It's weighted and doesn't guarantee the shortest path.

### Maze generation algorithms
- __Recursive Division__ - a unique algorithm, as it treats the maze as a fractal and instead of carving passages as the other algorithms do, it begins with a blank board and adds walls at every step producing a completely valid maze. This algorithm is completely stunning, at every step adding finer and finer levels of detail to the maze. 
- __Depth First Search__ - a fast, easy to understand and straightforward to implement maze generation algorithm. Mazes generated with a depth-first search have a low branching factor and contain many long corridors because the algorithm explores as far as possible along each branch before backtracking.
- __Kruskal's algorithm__ - an algorithm for producing a minimal spanning tree from a weighted graph. Because all of the maze's walls are of equal weight, it tends to produce regular patterns which are fairly easy to solve.
- __Prim's algorithm__ - unlike Kruskal's algorithm, which works edgewise across the entire graph, it starts at one point and grows outward from that point.
