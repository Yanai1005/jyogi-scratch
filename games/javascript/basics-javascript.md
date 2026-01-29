# JavaScriptの基礎を学ぼう！

## JavaScriptとは？

**JavaScript**（ジャバスクリプト）は、ウェブページに「動き」や「インタラクティブ性」を付ける言語です。

Scratchでいうと、**ブロックを組み合わせてプログラムを作る**のと同じです。JavaScriptでは、文字でプログラムを書きます。

---

## JavaScriptでできること

- ボタンをクリックしたときに何かを起こす
- 計算をする
- ゲームを作る
- アニメーションを作る
- データを保存する

---

## JavaScriptの基本

### HTMLにJavaScriptを追加する

HTMLファイルの `<body>` の最後に `<script>` タグを書きます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>JavaScriptの練習</title>
</head>
<body>
  <h1>JavaScriptを学ぼう！</h1>
  <button id="myButton">クリックしてね！</button>
  
  <script>
    // ここにJavaScriptを書く
    alert('こんにちは！');
  </script>
</body>
</html>
```

---

## 変数（へんすう）

**変数**は、データを入れる「箱」のようなものです。

Scratchの「変数」と同じです！

### 変数の作り方

```javascript
let score = 0;        // スコアを0にする
let name = "太郎";    // 名前を保存
let isGameRunning = true;  // ゲームが動いているか
```

- `let`: 変数を作るときに使う
- `=`: 値を入れる
- `;`: 命令の終わり

### 変数の使い方

```javascript
let score = 0;
score = score + 10;  // スコアに10を足す
console.log(score);  // 結果を表示（10になる）
```

---

## 関数（かんすう）

**関数**は、命令をまとめたものです。

Scratchの「ブロック定義」と同じです！

### 関数の作り方

```javascript
function sayHello() {
  alert('こんにちは！');
}

// 関数を呼び出す
sayHello();
```

### 引数（ひきすう）のある関数

```javascript
function greet(name) {
  alert('こんにちは、' + name + 'さん！');
}

greet('太郎');  // 「こんにちは、太郎さん！」と表示
greet('花子');  // 「こんにちは、花子さん！」と表示
```

---

## イベント（ボタンをクリックしたとき）

ボタンをクリックしたときに、何かを起こすことができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>クリックゲーム</title>
</head>
<body>
  <h1>クリックゲーム</h1>
  <p>スコア: <span id="score">0</span></p>
  <button id="clickButton">クリック！</button>
  
  <script>
    let score = 0;
    
    // ボタンを取得
    const button = document.getElementById('clickButton');
    const scoreDisplay = document.getElementById('score');
    
    // ボタンをクリックしたときの処理
    button.addEventListener('click', function() {
      score = score + 1;
      scoreDisplay.textContent = score;
    });
  </script>
</body>
</html>
```

### コードの説明

- `document.getElementById('clickButton')`: IDが `clickButton` の要素を取得
- `addEventListener('click', ...)`: クリックされたときに実行する
- `textContent`: 文字を変更する

---

## 条件分岐（もし〜なら）

Scratchの「もし〜なら」ブロックと同じです。

```javascript
let score = 50;

if (score >= 100) {
  alert('すごい！100点以上だ！');
} else if (score >= 50) {
  alert('いい感じ！');
} else {
  alert('がんばろう！');
}
```

- `if`: もし〜なら
- `else if`: そうでなくて、もし〜なら
- `else`: それ以外

---

## 繰り返し（ループ）

Scratchの「〇回繰り返す」ブロックと同じです。

### for文

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4 と表示
}
```

### while文

```javascript
let count = 0;

while (count < 3) {
  console.log('カウント: ' + count);
  count = count + 1;
}
```

---

## 配列（はいれつ）

**配列**は、複数のデータをまとめて保存できます。

Scratchの「リスト」と同じです！

```javascript
let fruits = ['りんご', 'バナナ', 'みかん'];

console.log(fruits[0]);  // 'りんご'
console.log(fruits[1]);  // 'バナナ'
console.log(fruits[2]);  // 'みかん'

// 配列に追加
fruits.push('いちご');
console.log(fruits);  // ['りんご', 'バナナ', 'みかん', 'いちご']
```

---

## Scratchとの比較

| Scratch | JavaScript |
|---------|-----------|
| 変数「スコア」を0にする | `let score = 0;` |
| スコアを1ずつ変える | `score = score + 1;` |
| もし〜なら | `if (条件) { ... }` |
| 〇回繰り返す | `for (let i = 0; i < 回数; i++) { ... }` |
| ブロック定義 | `function 関数名() { ... }` |
| 〇〇と言う | `alert('〇〇');` |
| リスト | `let list = [];` |

---

## 実際に作ってみよう！

### 例: カウンターアプリ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>カウンターアプリ</title>
  <style>
    body {
      text-align: center;
      font-family: Arial, sans-serif;
      padding: 50px;
    }
    
    #counter {
      font-size: 72px;
      color: #4CAF50;
      margin: 30px;
    }
    
    button {
      font-size: 24px;
      padding: 15px 30px;
      margin: 10px;
      cursor: pointer;
      border: none;
      border-radius: 8px;
      color: white;
    }
    
    .plus {
      background-color: #4CAF50;
    }
    
    .minus {
      background-color: #f44336;
    }
    
    .reset {
      background-color: #2196F3;
    }
  </style>
</head>
<body>
  <h1>カウンターアプリ</h1>
  <div id="counter">0</div>
  
  <button class="plus" id="plusBtn">+1</button>
  <button class="minus" id="minusBtn">-1</button>
  <button class="reset" id="resetBtn">リセット</button>
  
  <script>
    // 変数を作る
    let count = 0;
    
    // 要素を取得
    const counterDisplay = document.getElementById('counter');
    const plusBtn = document.getElementById('plusBtn');
    const minusBtn = document.getElementById('minusBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // 表示を更新する関数
    function updateDisplay() {
      counterDisplay.textContent = count;
    }
    
    // +1ボタンをクリックしたとき
    plusBtn.addEventListener('click', function() {
      count = count + 1;
      updateDisplay();
    });
    
    // -1ボタンをクリックしたとき
    minusBtn.addEventListener('click', function() {
      count = count - 1;
      updateDisplay();
    });
    
    // リセットボタンをクリックしたとき
    resetBtn.addEventListener('click', function() {
      count = 0;
      updateDisplay();
    });
  </script>
</body>
</html>
```

---

## よく使うJavaScriptの命令

### コンソールに表示

```javascript
console.log('デバッグメッセージ');
```

ブラウザの「開発者ツール」の「コンソール」に表示されます。

### アラートを表示

```javascript
alert('こんにちは！');
```

### 要素を取得

```javascript
const element = document.getElementById('myId');
```

### 文字を変更

```javascript
element.textContent = '新しい文字';
```

### クリックイベント

```javascript
element.addEventListener('click', function() {
  // クリックされたときの処理
});
```

---

## 練習問題

### 問題1: 簡単な計算機
2つの数を足し算するプログラムを作ってみよう。

```javascript
let a = 10;
let b = 20;
let sum = a + b;
console.log(sum);  // 30
```

### 問題2: 年齢判定
年齢が18以上なら「大人」、そうでなければ「子供」と表示するプログラムを作ってみよう。

```javascript
let age = 15;

if (age >= 18) {
  console.log('大人');
} else {
  console.log('子供');
}
```

### 問題3: 好きな食べ物リスト
好きな食べ物を配列に入れて、全部表示してみよう。

```javascript
let foods = ['カレー', 'ラーメン', 'ピザ'];

for (let i = 0; i < foods.length; i++) {
  console.log(foods[i]);
}
```

---

## まとめ

- JavaScriptはウェブページに「動き」を付ける
- **変数**でデータを保存する（`let score = 0;`）
- **関数**で命令をまとめる（`function sayHello() { ... }`）
- **if文**で条件分岐（もし〜なら）
- **for文**で繰り返し
- **配列**で複数のデータを管理
- **イベント**でボタンクリックなどに反応

これで基礎は完璧！次は[モグラ叩きゲーム](./mogura-tataki.md)を作ってみよう！
