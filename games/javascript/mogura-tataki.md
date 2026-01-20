# JavaScriptでモグラ叩きゲームを作ろう！

## 今回作るゲーム

JavaScriptを使ってモグラ叩きゲームを実装します。Scratchで学んだロジックをそのままJavaScriptで表現することで、プログラミングの本質を理解できます。

### 完成系

<iframe 
  width="100%" 
  height="315" 
  src="https://www.youtube.com/embed/-dvY2Iq4oX0" 
  title="モグラ叩きゲーム - JavaScript版" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>

### 操作方法
- **マウスクリック**: 魔法の杖でモグラを叩く
- **制限時間**: 30秒以内に何匹叩けるかを競う

---

## プロジェクト構成

```
mogura-tataki/
├── index.html
├── style.css
└── script.js
```

---

## ステップ1: HTMLの基本構造

`index.html` を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>モグラ叩きゲーム</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>モグラ叩きゲーム</h1>
    
    <div class="game-info">
      <div class="info-item">
        <label>スコア:</label>
        <span id="score">0</span>
      </div>
      <div class="info-item">
        <label>残り時間:</label>
        <span id="time">30</span>秒
      </div>
      <button id="startBtn" class="btn">ゲーム開始</button>
      <button id="resetBtn" class="btn">リセット</button>
    </div>

    <div id="gameArea" class="game-area">
      <!-- モグラが動的に生成される -->
    </div>

    <div id="gameOverMessage" class="game-over-message" style="display: none;">
      <div class="modal">
        <h2>ゲーム終了!</h2>
        <p id="finalScore"></p>
        <button onclick="location.reload()">もう一度プレイ</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

---

## ステップ2: CSSでスタイリング

`style.css` を作成します。

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5em;
}

.game-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.info-item {
  font-size: 1.1em;
  color: #555;
}

.info-item label {
  font-weight: bold;
  color: #333;
}

.info-item span {
  font-size: 1.5em;
  color: #667eea;
  font-weight: bold;
  margin: 0 5px;
}

.btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #764ba2;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.game-area {
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%);
  border: 3px solid #333;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.mole {
  position: absolute;
  width: 60px;
  height: 70px;
  background: #8b4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  transition: transform 0.1s;
  border: 2px solid #654321;
}

.mole::before,
.mole::after {
  content: '●';
  position: absolute;
  font-size: 0.4em;
  color: black;
}

.mole::before {
  left: 15px;
  top: 15px;
}

.mole::after {
  right: 15px;
  top: 15px;
}

.mole:hover {
  transform: scale(1.1);
}

.mole.hit {
  animation: hit 0.3s ease;
}

@keyframes hit {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.game-over-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

.modal p {
  color: #667eea;
  font-size: 1.5em;
  margin-bottom: 30px;
  font-weight: bold;
}

.modal button {
  padding: 12px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background 0.3s ease;
}

.modal button:hover {
  background: #764ba2;
}
```

---

## ステップ3: JavaScriptでゲームロジック

`script.js` を作成します。

```javascript
// ゲームの状態を管理するオブジェクト
const gameState = {
  score: 0,
  time: 30,
  isGameRunning: false,
  gameTimer: null,
  moles: []
};

// DOM要素の参照
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('gameArea');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScore = document.getElementById('finalScore');

// ゲーム開始
function startGame() {
  gameState.score = 0;
  gameState.time = 30;
  gameState.isGameRunning = true;
  
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = true;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';

  // タイマーを開始
  gameState.gameTimer = setInterval(updateTimer, 1000);
  
  // モグラを生成開始
  spawnMoles();
}

// タイマーを更新
function updateTimer() {
  gameState.time--;
  timeDisplay.textContent = gameState.time;

  if (gameState.time <= 0) {
    endGame();
  }
}

// ゲーム終了
function endGame() {
  gameState.isGameRunning = false;
  clearInterval(gameState.gameTimer);
  startBtn.disabled = false;

  // すべてのモグラを削除
  document.querySelectorAll('.mole').forEach(mole => mole.remove());

  // ゲーム終了メッセージを表示
  finalScore.textContent = `最終スコア: ${gameState.score}点`;
  gameOverMessage.style.display = 'flex';
}

// ゲームをリセット
function resetGame() {
  if (gameState.isGameRunning) {
    endGame();
  }
  gameState.score = 0;
  gameState.time = 30;
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = false;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';
}

// モグラを生成
function spawnMoles() {
  if (!gameState.isGameRunning) return;

  // 1～3匹のモグラを同時に出現させる
  const moleCount = Math.random() < 0.5 ? 1 : 2;
  
  for (let i = 0; i < moleCount; i++) {
    const mole = createMole();
    gameArea.appendChild(mole);
  }

  // 次のモグラを1～3秒後に生成
  setTimeout(spawnMoles, Math.random() * 2000 + 1000);
}

// モグラを作成
function createMole() {
  const mole = document.createElement('div');
  mole.className = 'mole';

  // ランダムな位置に配置
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 70;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  mole.style.left = x + 'px';
  mole.style.top = y + 'px';

  // クリックで叩く
  mole.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!gameState.isGameRunning) return;

    // スコアを増やす
    gameState.score++;
    scoreDisplay.textContent = gameState.score;

    // アニメーション
    mole.classList.add('hit');

    // アニメーション後に削除
    setTimeout(() => {
      mole.remove();
    }, 300);
  });

  // 一定時間後に自動で消える
  setTimeout(() => {
    if (mole.parentElement) {
      mole.remove();
    }
  }, 1500);

  return mole;
}

// イベントリスナーの登録
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
```

---

## コードの説明

### gameStateオブジェクト
ゲームの現在の状態（スコア、時間、実行中フラグなど）を一元管理しています。

### スコアと時間の更新
- `scoreDisplay.textContent = gameState.score` で画面にスコアを反映
- タイマーは1秒ごと（`setInterval(updateTimer, 1000)`）に実行

### モグラの生成と配置
```javascript
const x = Math.random() * maxX;
const y = Math.random() * maxY;
```
`Math.random()` でランダムな位置を計算して配置します。

### クリック判定
```javascript
mole.addEventListener('click', (e) => { ... });
```
モグラをクリックしたら `score` を増やし、アニメーションを実行します。

### 自動削除
```javascript
setTimeout(() => { mole.remove(); }, 1500);
```
モグラは1.5秒後に自動で消えます。クリックされたら300ms後に消えます。

---

## 発展的な機能

### 1. 難易度設定
```javascript
const difficulties = {
  easy: { timeLimit: 60, moleSpeed: 3000 },
  normal: { timeLimit: 30, moleSpeed: 2000 },
  hard: { timeLimit: 20, moleSpeed: 1000 }
};
```

### 2. サウンドの追加
```javascript
const hitSound = new Audio('hit.mp3');
mole.addEventListener('click', () => {
  hitSound.play();
  // ...
});
```

### 3. ボーナスモグラ
```javascript
if (Math.random() < 0.2) { // 20%の確率
  mole.dataset.bonus = true;
  mole.style.background = 'gold';
  scoreBonus = 5; // 通常の5点分
}
```

### 4. ハイスコア保存
```javascript
function saveScore() {
  let highScore = localStorage.getItem('highScore') || 0;
  if (gameState.score > highScore) {
    localStorage.setItem('highScore', gameState.score);
  }
}
```

### 5. ゲーム統計の表示
```javascript
const stats = {
  totalClicks: 0,
  accuracy: 0,
  averageReactionTime: 0
};
```

---

## トラブルシューティング

### モグラが出現しない
- `startGame()` が呼ばれているか確認
- ブラウザコンソールでエラーがないか確認

### クリックが反応しない
- `e.stopPropagation()` でイベント伝播を止めているか確認
- `.mole { cursor: pointer; }` がCSSにあるか確認

### スコアが更新されない
- `gameState.score++` が実行されているか確認
- `scoreDisplay.textContent` で画面更新しているか確認

---

## まとめ

このプロジェクトで学んだこと：
- **DOM操作**: `document.createElement()` でHTML要素を動的に作成
- **イベント処理**: `addEventListener()` でクリックイベントを処理
- **タイマー**: `setInterval()` で時間制御
- **状態管理**: オブジェクトで複数の値を管理
- **アニメーション**: CSSアニメーションとJavaScriptのタイムアウトを組み合わせ
- **ゲームロジック**: スコア、タイミング、ランダム生成など

これらの技術はウェブゲームだけでなく、インタラクティブなウェブアプリケーション全般で活用できます！
