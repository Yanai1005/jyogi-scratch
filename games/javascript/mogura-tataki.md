# JavaScriptでモグラ叩きゲームを作ろう！

> [!IMPORTANT]
> このチュートリアルを始める前に、まず基礎を学びましょう！
> - [HTMLの基礎](./basics-html.md)
> - [CSSの基礎](./basics-css.md)
> - [JavaScriptの基礎](./basics-javascript.md)

---

## 🎮 完成したゲームで遊んでみよう！

まずは完成版を遊んで、どんなゲームを作るか確認しましょう！

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
- **マウスクリック**: モグラをクリックして叩く
- **制限時間**: 30秒以内に何匹叩けるかを競う

---

## 💻 サンドボックスでコードを試そう！

下のエディタで**コードを直接編集**できます。「▶ 実行」ボタンを押すと右側に反映されます！

<iframe 
  src="/mogura-sandbox.html"
  style="width:100%; height:550px; border:1px solid #444; border-radius: 8px;"
></iframe>

> [!TIP]
> **サンドボックスの使い方**
> 1. 上部のタブで `index.html`, `style.css`, `script.js` を切り替え
> 2. コードを自由に編集
> 3. 「▶ 実行」ボタンで変更を反映

---

## 準備: フォルダとファイルを作ろう

自分のパソコンでゲームを作る場合は、以下の構成でファイルを作成します。

```
mogura-tataki/
├── index.html    (ゲームの骨組み)
├── style.css     (見た目)
└── script.js     (動き)
```

---

## ステップ1: HTMLでゲームの骨組みを作ろう

`index.html` に以下のコードを書きます。

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
    
    <!-- ゲームの情報を表示する部分 -->
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

    <!-- モグラが出てくる場所 -->
    <div id="gameArea" class="game-area"></div>

    <!-- ゲーム終了メッセージ -->
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

### HTMLの説明

| 部分 | 役割 |
|------|------|
| `<span id="score">` | スコアを表示 |
| `<span id="time">` | 残り時間を表示 |
| `<button id="startBtn">` | ゲーム開始ボタン |
| `<div id="gameArea">` | モグラが出てくる場所 |

> [!TIP]
> `id="score"` のように `id` を付けると、JavaScriptからその部分を操作できます！

---

## ステップ2: CSSで見た目をかっこよくしよう

`style.css` に以下のコードを書きます。

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
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
}

.game-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.info-item span {
  font-size: 1.3em;
  color: #667eea;
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
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
  height: 300px;
  background: linear-gradient(180deg, #87ceeb 0%, #90EE90 50%, #8B4513 100%);
  border: 3px solid #333;
  border-radius: 10px;
  overflow: hidden;
}

.mole {
  position: absolute;
  width: 50px;
  height: 60px;
  background: #8b4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  border: 2px solid #654321;
  transition: transform 0.1s;
}

.mole:hover {
  transform: scale(1.1);
}

.mole.hit {
  animation: hit 0.3s ease;
}

@keyframes hit {
  0% { transform: scale(1); }
  50% { transform: scale(0.7); opacity: 0.5; }
  100% { transform: scale(0.5); opacity: 0; }
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
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}

.modal p {
  color: #667eea;
  font-size: 1.3em;
  margin: 15px 0;
  font-weight: bold;
}

.modal button {
  padding: 10px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
```

### CSSのポイント

| プロパティ | 効果 |
|-----------|------|
| `linear-gradient(...)` | グラデーション背景 |
| `border-radius` | 角を丸くする |
| `@keyframes hit` | 叩かれたときのアニメーション |

---

## ステップ3: JavaScriptで動きを付けよう

`script.js` に以下のコードを書きます。これが一番大事な部分です！

### 3-1. 変数とHTML要素の取得

```javascript
// ゲームの変数（Scratchの「変数」と同じ！）
let score = 0;
let time = 30;
let isGameRunning = false;
let gameTimer = null;

// HTMLの部品を取得
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('gameArea');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScore = document.getElementById('finalScore');
```

### 3-2. ゲーム開始・終了・リセット

```javascript
// ゲームを始める関数
function startGame() {
  score = 0;
  time = 30;
  isGameRunning = true;
  
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = true;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';

  gameTimer = setInterval(updateTimer, 1000);
  spawnMoles();
}

// タイマーを更新
function updateTimer() {
  time = time - 1;
  timeDisplay.textContent = time;
  if (time <= 0) {
    endGame();
  }
}

// ゲーム終了
function endGame() {
  isGameRunning = false;
  clearInterval(gameTimer);
  startBtn.disabled = false;

  document.querySelectorAll('.mole').forEach(function(mole) {
    mole.remove();
  });

  finalScore.textContent = '最終スコア: ' + score + '点';
  gameOverMessage.style.display = 'flex';
}

// リセット
function resetGame() {
  if (isGameRunning) endGame();
  score = 0;
  time = 30;
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = false;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';
}
```

### 3-3. モグラを出す・作る

```javascript
// モグラを出す関数
function spawnMoles() {
  if (!isGameRunning) return;

  const moleCount = Math.random() < 0.5 ? 1 : 2;
  
  for (let i = 0; i < moleCount; i++) {
    gameArea.appendChild(createMole());
  }

  setTimeout(spawnMoles, Math.random() * 2000 + 1000);
}

// モグラを作る関数
function createMole() {
  const mole = document.createElement('div');
  mole.className = 'mole';

  // 20%でボーナスモグラ（⭐5点）
  const isBonus = Math.random() < 0.2;
  if (isBonus) {
    mole.style.background = 'gold';
    mole.textContent = '⭐';
  } else {
    mole.textContent = '🐹';
  }

  // ランダムな位置
  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 60);
  mole.style.left = x + 'px';
  mole.style.top = y + 'px';

  // クリックで得点
  mole.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!isGameRunning) return;

    score += isBonus ? 5 : 1;
    scoreDisplay.textContent = score;
    mole.classList.add('hit');
    setTimeout(function() { mole.remove(); }, 300);
  });

  // 1.5秒で消える
  setTimeout(function() {
    if (mole.parentElement) mole.remove();
  }, 1500);

  return mole;
}
```

### 3-4. ボタンのイベント設定

```javascript
// ボタンをクリックしたときの処理
// Scratchの「〇〇が押されたとき」と同じ！
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
```

---

## 📚 Scratchとの対応表

| Scratch | JavaScript |
|---------|-----------|
| 変数「スコア」を0にする | `score = 0;` |
| スコアを1ずつ変える | `score = score + 1;` |
| もし 時間 ≦ 0 なら | `if (time <= 0) { ... }` |
| ずっと | `setInterval(関数, 1000)` |
| 〇秒待つ | `setTimeout(関数, 時間)` |
| ブロック定義 | `function 関数名() { ... }` |
| 〇〇が押されたとき | `addEventListener('click', 関数)` |
| 乱数 | `Math.random()` |

---

## 🚀 チャレンジ: カスタマイズしよう！

上のサンドボックスでコードを編集して試してみよう！

### チャレンジ1: 制限時間を変える

```javascript
let time = 60;  // 60秒に変更！
```

### チャレンジ2: モグラの色を変える

```css
.mole {
  background: pink;  /* ピンクのモグラ！ */
}
```

### チャレンジ3: もっと多くのモグラを出す

```javascript
const moleCount = Math.random() < 0.3 ? 3 : 2;  // 2〜3匹に変更
```

---

## 🔧 うまく動かないときは

| 症状 | 確認ポイント |
|------|-------------|
| モグラが出てこない | `startGame()` が呼ばれているか確認 |
| クリックしても反応しない | `addEventListener` が正しいか確認 |
| スコアが増えない | `scoreDisplay.textContent = score;` を確認 |

> [!TIP]
> **デバッグのコツ**: F12キーで開発者ツールを開き、Consoleタブでエラーを確認しよう！

---

## 🎉 まとめ

このゲームで学んだこと：

✅ **変数** - ゲームの情報を保存  
✅ **関数** - 処理をまとめて整理  
✅ **イベント** - ボタンクリックに反応  
✅ **タイマー** - 時間を管理  
✅ **ランダム** - モグラをランダムな場所に出す

Scratchで学んだことが、JavaScriptでも使えることが分かりましたね！

次は、自分だけのオリジナルゲームを作ってみよう！🎮