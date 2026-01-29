# JavaScriptでモグラ叩きゲームを作ろう！

> [!IMPORTANT]
> このチュートリアルを始める前に、まず基礎を学びましょう！
> - [HTMLの基礎](./basics-html.md)
> - [CSSの基礎](./basics-css.md)
> - [JavaScriptの基礎](./basics-javascript.md)

---

## 今回作るゲーム

JavaScriptを使ってモグラ叩きゲームを作ります。Scratchで学んだことを、JavaScriptで表現してみましょう！

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
- **マウスクリック**: モグラをクリックして叩く
- **制限時間**: 30秒以内に何匹叩けるかを競う

---

## 準備: フォルダとファイルを作ろう

まず、ゲーム用のフォルダとファイルを作ります。

### フォルダ構成

```
mogura-tataki/
├── index.html    (ゲームの骨組み)
├── style.css     (見た目)
└── script.js     (動き)
```

### ファイルの作り方

1. デスクトップに「mogura-tataki」という名前のフォルダを作る
2. そのフォルダの中に、3つのファイルを作る
   - `index.html`
   - `style.css`
   - `script.js`

---

## ステップ1: HTMLでゲームの骨組みを作ろう

`index.html` を開いて、以下のコードを書きます。

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
    <div id="gameArea" class="game-area">
      <!-- ここにモグラが出てきます -->
    </div>

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

### このコードの説明

| 部分 | 何をするか |
|------|----------|
| `<h1>` | ゲームのタイトル |
| `<span id="score">` | スコアを表示する場所 |
| `<span id="time">` | 残り時間を表示する場所 |
| `<button id="startBtn">` | ゲーム開始ボタン |
| `<div id="gameArea">` | モグラが出てくる場所 |
| `<div id="gameOverMessage">` | ゲーム終了メッセージ |

> [!TIP]
> `id="score"` のように、`id` を付けると、JavaScriptからその部分を操作できるようになります！

---

## ステップ2: CSSで見た目をかっこよくしよう

`style.css` を開いて、以下のコードを書きます。

```css
/* 全体の設定 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 背景 */
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* ゲーム全体を囲む箱 */
.container {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}

/* タイトル */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5em;
}

/* スコアと時間の表示エリア */
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

/* ボタン */
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

/* ゲームエリア(モグラが出てくる場所) */
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

/* モグラ */
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

/* モグラの目 */
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

/* マウスを乗せたとき */
.mole:hover {
  transform: scale(1.1);
}

/* 叩かれたときのアニメーション */
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

/* ゲーム終了メッセージ */
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

### CSSのポイント

- **背景**: グラデーションで綺麗な紫色
- **モグラ**: 茶色の丸い形で、目が付いている
- **アニメーション**: 叩かれたときに小さくなって消える

---

## ステップ3: JavaScriptで動きを付けよう

ここが一番大事な部分です！ゆっくり進めていきましょう。

`script.js` を開いて、以下のコードを書きます。

### 3-1. ゲームの情報を保存する変数を作る

```javascript
// ゲームの情報を保存する変数
// Scratchの「変数」と同じです！
let score = 0;           // スコア
let time = 30;           // 残り時間
let isGameRunning = false;  // ゲームが動いているか
let gameTimer = null;    // タイマー
```

### 3-2. HTMLの部品を取得する

```javascript
// HTMLの部品を取得
// Scratchの「スプライト」を取得するのと同じです！
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('gameArea');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScore = document.getElementById('finalScore');
```

> [!NOTE]
> `document.getElementById('score')` は、HTMLの中から `id="score"` の部分を探して取ってくる命令です。

### 3-3. ゲーム開始の関数を作る

```javascript
// ゲームを始める関数
// Scratchの「ブロック定義」と同じです！
function startGame() {
  // 変数を初期化(最初の状態に戻す)
  score = 0;
  time = 30;
  isGameRunning = true;
  
  // 画面に表示
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = true;  // 開始ボタンを押せなくする
  gameArea.innerHTML = '';   // モグラを全部消す
  gameOverMessage.style.display = 'none';  // 終了メッセージを隠す

  // タイマーを開始(1秒ごとに updateTimer を実行)
  gameTimer = setInterval(updateTimer, 1000);
  
  // モグラを出し始める
  spawnMoles();
}
```

### 3-4. タイマーを更新する関数

```javascript
// タイマーを更新する関数
// Scratchの「ずっと」ブロックの中身と同じです！
function updateTimer() {
  time = time - 1;  // 時間を1減らす
  timeDisplay.textContent = time;  // 画面に表示

  // 時間が0になったらゲーム終了
  if (time <= 0) {
    endGame();
  }
}
```

### 3-5. ゲーム終了の関数

```javascript
// ゲームを終了する関数
function endGame() {
  isGameRunning = false;
  clearInterval(gameTimer);  // タイマーを止める
  startBtn.disabled = false;  // 開始ボタンを押せるようにする

  // すべてのモグラを消す
  const allMoles = document.querySelectorAll('.mole');
  allMoles.forEach(function(mole) {
    mole.remove();
  });

  // 最終スコアを表示
  finalScore.textContent = '最終スコア: ' + score + '点';
  gameOverMessage.style.display = 'flex';
}
```

### 3-6. リセットの関数

```javascript
// ゲームをリセットする関数
function resetGame() {
  if (isGameRunning) {
    endGame();
  }
  score = 0;
  time = 30;
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = false;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';
}
```

### 3-7. モグラを出す関数

```javascript
// モグラを出す関数
function spawnMoles() {
  // ゲームが終わっていたら何もしない
  if (!isGameRunning) return;

  // 1匹か2匹のモグラを出す
  const moleCount = Math.random() < 0.5 ? 1 : 2;
  
  // モグラを作って出す
  for (let i = 0; i < moleCount; i++) {
    const mole = createMole();
    gameArea.appendChild(mole);
  }

  // 1～3秒後にまたモグラを出す
  const waitTime = Math.random() * 2000 + 1000;
  setTimeout(spawnMoles, waitTime);
}
```

> [!NOTE]
> - `Math.random()` は、0から1の間のランダムな数を作ります
> - `setTimeout(関数, 時間)` は、指定した時間後に関数を実行します

### 3-8. モグラを作る関数

```javascript
// モグラを作る関数
function createMole() {
  // 新しいモグラを作る
  const mole = document.createElement('div');
  mole.className = 'mole';

  // ランダムな位置を計算
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 70;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // モグラの位置を設定
  mole.style.left = x + 'px';
  mole.style.top = y + 'px';

  // クリックされたときの処理
  mole.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!isGameRunning) return;

    // スコアを1増やす
    score = score + 1;
    scoreDisplay.textContent = score;

    // 叩かれたアニメーション
    mole.classList.add('hit');

    // 0.3秒後にモグラを消す
    setTimeout(function() {
      mole.remove();
    }, 300);
  });

  // 1.5秒後に自動で消える
  setTimeout(function() {
    if (mole.parentElement) {
      mole.remove();
    }
  }, 1500);

  return mole;
}
```

### 3-9. ボタンにイベントを設定

```javascript
// ボタンをクリックしたときの処理を設定
// Scratchの「〇〇が押されたとき」ブロックと同じです！
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
```

---

## 完成したコード全体

すべてをまとめた `script.js` の完成形です:

```javascript
// ゲームの情報を保存する変数
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

// タイマーを更新する関数
function updateTimer() {
  time = time - 1;
  timeDisplay.textContent = time;

  if (time <= 0) {
    endGame();
  }
}

// ゲームを終了する関数
function endGame() {
  isGameRunning = false;
  clearInterval(gameTimer);
  startBtn.disabled = false;

  const allMoles = document.querySelectorAll('.mole');
  allMoles.forEach(function(mole) {
    mole.remove();
  });

  finalScore.textContent = '最終スコア: ' + score + '点';
  gameOverMessage.style.display = 'flex';
}

// ゲームをリセットする関数
function resetGame() {
  if (isGameRunning) {
    endGame();
  }
  score = 0;
  time = 30;
  scoreDisplay.textContent = '0';
  timeDisplay.textContent = '30';
  startBtn.disabled = false;
  gameArea.innerHTML = '';
  gameOverMessage.style.display = 'none';
}

// モグラを出す関数
function spawnMoles() {
  if (!isGameRunning) return;

  const moleCount = Math.random() < 0.5 ? 1 : 2;
  
  for (let i = 0; i < moleCount; i++) {
    const mole = createMole();
    gameArea.appendChild(mole);
  }

  const waitTime = Math.random() * 2000 + 1000;
  setTimeout(spawnMoles, waitTime);
}

// モグラを作る関数
function createMole() {
  const mole = document.createElement('div');
  mole.className = 'mole';

  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 70;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  mole.style.left = x + 'px';
  mole.style.top = y + 'px';

  mole.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!isGameRunning) return;

    score = score + 1;
    scoreDisplay.textContent = score;

    mole.classList.add('hit');

    setTimeout(function() {
      mole.remove();
    }, 300);
  });

  setTimeout(function() {
    if (mole.parentElement) {
      mole.remove();
    }
  }, 1500);

  return mole;
}

// ボタンをクリックしたときの処理を設定
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
```

---

## Scratchとの対応表

JavaScriptのコードが、Scratchのどのブロックに対応しているか確認しましょう！

| Scratch | JavaScript |
|---------|-----------|
| 変数「スコア」を0にする | `score = 0;` |
| スコアを1ずつ変える | `score = score + 1;` |
| もし 時間 ≦ 0 なら | `if (time <= 0) { ... }` |
| ずっと | `setInterval(関数, 1000)` |
| 〇秒待つ | `setTimeout(関数, 時間)` |
| ブロック定義 | `function 関数名() { ... }` |
| 〇〇が押されたとき | `ボタン.addEventListener('click', 関数)` |
| 乱数 | `Math.random()` |
| スプライトを作る | `document.createElement('div')` |
| スプライトを削除 | `要素.remove()` |

---

## ゲームを遊んでみよう！

1. `index.html` をダブルクリックしてブラウザで開く
2. 「ゲーム開始」ボタンをクリック
3. 出てきたモグラをクリックして叩く！
4. 30秒間でどれだけ叩けるか挑戦！

---

## もっと楽しくしよう！(発展)

### 1. 難易度を変える

時間を変えてみよう:

```javascript
let time = 60;  // 60秒に変更
```

### 2. モグラの色を変える

`style.css` の `.mole` の部分を変更:

```css
.mole {
  background: gold;  /* 金色のモグラ！ */
}
```

### 3. ボーナスモグラを作る

たまに金色のモグラが出て、叩くと5点もらえるようにしてみよう！

`createMole()` 関数の中に追加:

```javascript
// 20%の確率でボーナスモグラ
if (Math.random() < 0.2) {
  mole.style.background = 'gold';
  mole.dataset.bonus = 'true';
}

// クリックされたとき
mole.addEventListener('click', function(e) {
  e.stopPropagation();
  if (!isGameRunning) return;

  // ボーナスモグラなら5点、普通なら1点
  if (mole.dataset.bonus === 'true') {
    score = score + 5;
  } else {
    score = score + 1;
  }
  
  scoreDisplay.textContent = score;
  // ...
});
```

---

## うまく動かないときは

### モグラが出てこない
- `startGame()` 関数が呼ばれているか確認
- ブラウザの「開発者ツール」(F12キー)でエラーがないか確認

### クリックしても反応しない
- `addEventListener` が正しく書けているか確認
- `script.js` が `index.html` で読み込まれているか確認

### スコアが増えない
- `score = score + 1;` が書けているか確認
- `scoreDisplay.textContent = score;` で画面更新しているか確認

---

## まとめ

このゲームで学んだこと:

✅ **変数**: ゲームの情報を保存  
✅ **関数**: 処理をまとめて整理  
✅ **イベント**: ボタンクリックに反応  
✅ **タイマー**: 時間を管理  
✅ **ランダム**: モグラをランダムな場所に出す  
✅ **アニメーション**: 叩かれたときの動き  

Scratchで学んだことが、JavaScriptでも使えることが分かりましたね！

次は、自分だけのオリジナルゲームを作ってみよう！🎮
