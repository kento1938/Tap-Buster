document.addEventListener('DOMContentLoaded', function() {
    const startScene = document.getElementById('startScene');
    const battleScene = document.getElementById('battleScene');
    // 音楽を再生するための<audi>要素を取得
    const backgroundMusic = document.getElementById('backgroundMusic');
    const buttonSound = document.getElementById('buttonSound');
    const enemySound = document.getElementById('EnemySound');

    let playerMaxHP = 100;
    let playerHP = playerMaxHP;
    let playerAttack = 30;
    let playerDefense = 30;

    let enemyMaxHP = 70; // Max HP: 70
    let enemyHP = enemyMaxHP;
    let enemyAttack = 10; // Initial Attack: 10
    let enemyLevel = 1;

    let coins = 500; // Initialize player coins

    let countdown = 0;
    backgroundMusic.play();
    function savePlayerStats() {
        localStorage.setItem('playerStats', JSON.stringify({ maxHP: playerMaxHP, hp: playerHP, attack: playerAttack, defense: playerDefense, coins: coins }));
    }

    function loadPlayerStats() {
        const stats = JSON.parse(localStorage.getItem('playerStats'));
        if (stats) {
            playerMaxHP = stats.maxHP;
            playerHP = stats.hp;
            playerAttack = stats.attack;
            playerDefense = stats.defense;
            coins = stats.coins;
        }
        
    }

    function resetPlayerData() {
        localStorage.removeItem('playerStats');
        // Reset player stats without reloading the page
        resetPlayerStats();
    }

    function resetPlayerStats() {
        playerMaxHP = 100;
        playerHP = playerMaxHP;
        playerAttack = 30;
        playerDefense = 30
        coins = 500; // Reset player coins
        displayPlayerStats();
    }

    function displayPlayerStats() {
        document.getElementById('playerMaxHP').textContent = playerMaxHP;
        document.getElementById('playerHP').textContent = playerHP + '/' + playerMaxHP;
        document.getElementById('playerAttack').textContent = playerAttack;
        document.getElementById('playerDefense').textContent = playerDefense;
        document.getElementById('playerCoins').textContent = coins; // Display player coins
    }

    function generateEnemyStats() {
        enemyHP = enemyMaxHP * enemyLevel; // Enemy HP increases with level
        enemyAttack = 30 * enemyLevel * 1.3; // Reset enemy attack to default multiplied by level
        displayEnemyStats();
    }

    function displayEnemyStats() {
        document.getElementById('enemyMaxHP').textContent = enemyMaxHP * enemyLevel; // Display max HP based on current level
        document.getElementById('enemyHP').textContent = enemyHP + '/' + (enemyMaxHP * enemyLevel); // Display current HP out of max HP
        document.getElementById('enemyAttack').textContent = 30 * enemyLevel * 1.3; // Display attack based on current level
        document.getElementById('enemyLevel').textContent = enemyLevel;
    }

    function generateCountdown() {
        countdown = Math.floor(Math.random() * 3) + 1; // Countdown: 1 to 3
        displayCountdown();
        if (countdown === 0) {
            enemyAttackPlayer(); // Start enemy attack immediately if countdown is 0
        }
    }

    function displayCountdown() {
        document.getElementById('countdownValue').textContent = countdown;
    }

    function attackEnemy() {
        const damage = playerAttack;
        enemyHP -= damage;
        if (enemyHP <= 0) {
            defeatEnemy();
        } else {
            displayEnemyStats();
            generateCountdown(); // Reset countdown
        }
    }

    function enemyDefense() {
        return Math.max(0, playerAttack - playerDefense); // Calculate enemy defense based on player's attack and defense
    }

    function enemyAttackPlayer() {
        playerHP -= Math.max(0, enemyAttack - playerDefense); // Calculate damage to player
        displayPlayerStats();
        if (playerHP <= 0) {
            endBattle(); // Player defeated
        } else {
            generateCountdown(); // Start countdown for next player action
        }
    }

    function defeatEnemy() {
        coins += 100; // Add 100 coins to player's total coins
        savePlayerStats();
        enemyLevel++;
        enemyMaxHP = Math.floor(enemyMaxHP * 1.3); // Increase enemy max HP by 30%
        enemyAttack = Math.floor(enemyAttack * 1.3); // Increase enemy attack by 30%
        playerHP = playerMaxHP; // Restore player HP to max
        generateEnemyStats();
    }

    function startBattle() {
        startScene.style.display = 'none';
        battleScene.style.display = 'block';
        // Initialize enemy stats for level 1 enemy
        enemyMaxHP = 70; // Max HP: 70
        enemyHP = enemyMaxHP;
        enemyAttack = 10; // Initial Attack: 10
        enemyLevel = 1;
        generateCountdown();
        displayPlayerStats();
        displayEnemyStats(); // Display initialized enemy stats
   
        // 音楽を再生
        backgroundMusic.play();
    }

    function endBattle() {
        battleScene.style.display = 'none';
        startScene.style.display = 'block';
        playerHP = playerMaxHP; // Player HP restored to max
        enemyLevel = 1; // Reset enemy level to 1
        displayPlayerStats(); // Update player HP display
    }
    // Increase coins by 100 for each defeated enemy
    function defeatEnemy() {
        const coinsDropped = Math.floor(Math.random() * 5) + 1; // Coins dropped: 1 to 5
        coins += 100; // Increase coins by 100 for each defeated enemy
        savePlayerStats(); // Save player stats
        enemyLevel++;
        enemyMaxHP = Math.floor(enemyMaxHP * 1.3); // Increase enemy max HP by 30%
        enemyAttack = Math.floor(enemyAttack * 1.3); // Increase enemy attack by 30%
        playerHP = playerMaxHP; // Restore player HP to max
        generateEnemyStats();
    }

    document.getElementById('startButton').addEventListener('click', startBattle);

    document.getElementById('resetButton').addEventListener('click', resetPlayerData);

    document.getElementById('startButton').addEventListener('click', function() {
        savePlayerStats(); // Save player stats when starting battle
        startBattle();
    });

    document.getElementById('attackButton').addEventListener('click', function() {
        
        if (countdown > 0) {
            attackEnemy();
            buttonSound.play();
            countdown--;
            displayCountdown();
            if (countdown === 0) {
                enemyAttackPlayer(); // Enemy attacks after player's attack
                enemySound.play();
            }
        } else {
            alert('You need to wait for the countdown to attack again!');
        }
    });

    document.getElementById('backButton').addEventListener('click', function() {
        savePlayerStats(); // Save player stats when ending battle
        endBattle();
    });

    document.getElementById('increaseHP').addEventListener('click', function() {
        const cost = 100; // コインのコスト
        if (coins >= cost) {
            // コインがコスト以上ある場合
            coins -= cost; // コインを消費
            playerMaxHP = Math.floor(playerMaxHP * 1.2); // Max HPを20%増加し、小数点以下を切り捨てる
            playerHP = Math.min(playerHP + Math.floor(playerMaxHP * 0.05), playerMaxHP); // Current HPも5%増加し、Max HPを超えないようにする
            savePlayerStats(); // プレイヤーのステータスを保存
            displayPlayerStats(); // ステータスを更新して表示
            updateButtonStates(); // ボタンの状態を更新
        } else {
            // コインが不足している場合
            alert('Not enough coins!');
        }
    });
    
    document.getElementById('increaseAttack').addEventListener('click', function() {
        const cost = 100; // コインのコスト
        if (coins >= cost) {
            // コインがコスト以上ある場合
            coins -= cost; // コインを消費
            playerAttack = Math.floor(playerAttack * 1.2); // 攻撃力を20%増加し、小数点以下を切り捨てる
            savePlayerStats(); // プレイヤーのステータスを保存
            displayPlayerStats(); // ステータスを更新して表示
            updateButtonStates(); // ボタンの状態を更新
        } else {
            // コインが不足している場合
            alert('Not enough coins!');
        }
    });
    
    document.getElementById('increaseDefense').addEventListener('click', function() {
        const cost = 100; // コインのコスト
        if (coins >= cost) {
            // コインがコスト以上ある場合
            coins -= cost; // コインを消費
            playerDefense = Math.floor(playerDefense * 1.2); // 防御力を20%増加し、小数点以下を切り捨てる
            savePlayerStats(); // プレイヤーのステータスを保存
            displayPlayerStats(); // ステータスを更新して表示
            updateButtonStates(); // ボタンの状態を更新
        } else {
            // コインが不足している場合
            alert('Not enough coins!');
        }
    });
    
    
    
    
    loadPlayerStats(); // Load player stats from local storage
    displayPlayerStats(); // Display loaded player stats
    
});
