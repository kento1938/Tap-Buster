# Tap-Buster

## Continued: JavaScript (script.js) - ReadMe

### Functionality Overview
- **Starting Battles**: Allows players to initiate battles with enemies by clicking the "Start" button.
- **Attacking Enemies**: Enables players to attack enemies by clicking the "Attack" button, with damage calculations based on player and enemy stats.
- **Enemy Attacks**: Implements enemy attacks after the player's action, with damage calculations based on player defense.
- **Ending Battles**: Handles the conclusion of battles, including player victory, defeat, and progression to the next enemy level.
- **Increasing Stats**: Provides options for players to spend coins to increase their maximum HP, attack, and defense stats.
- **Data Persistence**: Utilizes local storage to save and load player stats, ensuring continuity between game sessions.
- **Audio Effects**: Integrates background music and sound effects to enhance the gaming experience.

### Key Functions
- **savePlayerStats()**: Saves the player's current stats (HP, attack, defense, coins) to local storage.
- **loadPlayerStats()**: Loads the player's saved stats from local storage, if available.
- **startBattle()**: Initiates a battle scene, displaying player and enemy stats, and starting the countdown timer.
- **attackEnemy()**: Handles player attacks on enemies, deducting HP and triggering enemy attacks.
- **enemyAttackPlayer()**: Calculates and applies damage from enemy attacks on the player.
- **defeatEnemy()**: Handles the defeat of enemies, rewarding the player with coins and increasing enemy difficulty for subsequent battles.

### Usage
- Developers can customize game mechanics, balance, and features by modifying functions and variables in `script.js`.
- Players can enjoy the game by interacting with the user interface provided in `index.html`, with styles defined in `styles.css`.
- To run the game, open the `index.html` file in a web browser, ensuring that all dependencies (HTML, CSS, JavaScript files, and audio files) are accessible.

### Further Development
- Enhance user interface with animations, visual effects, and responsive design improvements.
- Implement additional game features such as multiple enemy types, special attacks, and leveling systems.
- Optimize performance and refine gameplay mechanics based on player feedback and testing.

### Dependencies (Continued)
- Background Music: `background_music.mp3`
- Button Sound Effect: `mini_bomb1.mp3`
- Enemy Sound Effect: `Enemy.mp3`

### Credits
- **Background Music**: Attribution to [Artist Name], [Source Link]
- **Button Sound Effect**: Attribution to [Artist Name], [Source Link]
- **Enemy Sound Effect**: Attribution to [Artist Name], [Source Link]

### License
- This project is licensed under the [License Name] License - see the [LICENSE](LICENSE) file for details.

### Contributors
- [Your Name] - Initial Development - [GitHub Profile](https://github.com/your-profile)
- [Contributor Name] - Additional Features - [GitHub Profile](https://github.com/contributor-profile)

### Acknowledgments
- Special thanks to [Name] for their valuable insights and feedback during development.
- Inspired by [Game Title], [Source Link], for providing inspiration and ideas for gameplay mechanics and design.
