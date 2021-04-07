# PathVis3d
This application was built as an end-of-year school assessment whose purpose was to visualize the process behind pathfinding robots. 
As I primarily focused on a robotics competition called Micromouse, it was necessary to build a maze generator. 
To make it look more aesthetically pleasing to the eye as well as to challenge myself, I decided to visualize everything in 3D. 
Thanks to the Three.js library, it was not as hard as I thought it to would be. The app can be found here: https://arminasbrazenas.github.io/PathVis3d/

### Pathfinding algorithms
- __A* algorithm__ - one of the best and most popular algorithms used in path-finding due to its completeness, optimality and efficiency. It's weighted and guarantees the shortest path.
- __Depth First Search__ - investigated in the 19th century by French mathematician Charles Pierre Trémaux as a strategy for solving mazes. It's unweighted and doesn't guarantee the shortest path.
- __Dijkstra's algorithm__ - a really famous algorithm in the world of pathfinding, which was conceived by Dutch computer scientist Edsger W. Dijkstra in 1956. It's weighted and guarantees the shortest path.
- __Greedy Best First Search__ - unlike A*, this algorithm only relies on the estimated cost to get to the finish node, but not start node. It's weighted and doesn't guarantee the shortest path.
