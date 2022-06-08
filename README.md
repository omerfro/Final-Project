# Final-Project

# Battleships!

### The goal of the project is to build a two-player battleship game.
- The first player, the host, is opening the app and starting the game.
    - After the game is created the host can send the game id to the guest.
- The host and the guest are using the game ID building their boards.
- After both users finish building the board the game starts.
- The host plays first, In each turn:
    - Each player is guessing a location on the opponent board
    - if the location is a hit, the player gets another turn to guess
    - if the location is a miss, the turn goes to the opponent
