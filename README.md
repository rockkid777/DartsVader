# DartsVader

Running: node server/server.js # it is important, to start from the project dir, not the server dir.

Runs on localhost:8080

Urls:

Game ui: http://localhost:8080/webMonitor
 
Enter score with get params: http://localhost:8080/cam?num=11&modifier=1
Parameters:
 * num: the number thrown
 * mod: 0: out, 1: single, 2: double, 3: triple
 * handsVisible: 1: the player is taking the darts, the next player is coming
 
The rest is not really working