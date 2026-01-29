# CSSの基礎を学ぼう！

## CSSとは？

**CSS**（シーエスエス）は、**Cascading Style Sheets**の略で、ウェブページを「かっこよく」する言語です。

Scratchでいうと、**スプライトの色や大きさを変える**のと似ています。CSSでは、文字の色、大きさ、配置などを自由に変えられます。

---

## CSSの基本

CSSは、HTMLで作った要素に「スタイル」を付けます。

### CSSの書き方

```css
h1 {
  color: blue;
  font-size: 40px;
}
```

- `h1`: どの要素にスタイルを付けるか（セレクタ）
- `color`: 文字の色
- `font-size`: 文字の大きさ

---

## HTMLにCSSを追加する方法

### 方法1: `<style>` タグを使う

HTMLファイルの `<head>` の中に書きます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>CSSの練習</title>
  <style>
    h1 {
      color: red;
      text-align: center;
    }
    p {
      color: green;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <h1>こんにちは！</h1>
  <p>これは緑色の文章です。</p>
</body>
</html>
```

### 方法2: 別のCSSファイルを作る

**style.css** というファイルを作って、HTMLから読み込みます。

**style.css**
```css
h1 {
  color: blue;
  font-size: 50px;
}

p {
  color: purple;
}
```

**index.html**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>CSSの練習</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>こんにちは！</h1>
  <p>これは紫色の文章です。</p>
</body>
</html>
```

---

## よく使うCSSプロパティ

### 文字の色

```css
h1 {
  color: red;  /* 赤色 */
}
```

色は、`red`, `blue`, `green` などの名前や、`#FF0000` のようなコードで指定できます。

### 文字の大きさ

```css
p {
  font-size: 24px;  /* 24ピクセル */
}
```

### 背景の色

```css
body {
  background-color: lightblue;  /* 薄い青色 */
}
```

### 文字の位置

```css
h1 {
  text-align: center;  /* 中央揃え */
}
```

- `left`: 左揃え
- `center`: 中央揃え
- `right`: 右揃え

### 余白（マージン）

```css
p {
  margin: 20px;  /* 周りに20pxの余白 */
}
```

### 枠線

```css
button {
  border: 3px solid black;  /* 3pxの黒い線 */
  border-radius: 10px;      /* 角を丸くする */
}
```

### ボタンのスタイル

```css
button {
  background-color: orange;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkorange;  /* マウスを乗せたときの色 */
}
```

---

## 実際に使ってみよう！

### 例: カラフルな自己紹介ページ

**index.html**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>自己紹介</title>
  <style>
    body {
      background-color: #f0f8ff;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #ff6347;
      text-align: center;
      font-size: 48px;
    }
    
    p {
      color: #333;
      font-size: 20px;
      margin: 10px;
    }
    
    .highlight {
      background-color: yellow;
      padding: 5px;
    }
    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 15px 30px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>私の自己紹介</h1>
  <p>名前: <span class="highlight">太郎</span></p>
  <p>好きなこと: プログラミング、ゲーム</p>
  <button>もっと知る</button>
</body>
</html>
```

---

## Scratchとの比較

| Scratch | CSS |
|---------|-----|
| 「色の効果を〇〇にする」 | `color: red;` |
| 「大きさを〇〇%にする」 | `font-size: 20px;` |
| スプライトの位置を変える | `margin`, `padding` で位置調整 |
| 「〇〇秒で〇〇に変える」 | `transition` でアニメーション |

---

## CSSでアニメーション

ボタンにマウスを乗せたときに、滑らかに色が変わるようにできます。

```css
button {
  background-color: blue;
  transition: background-color 0.3s;  /* 0.3秒かけて変化 */
}

button:hover {
  background-color: darkblue;
}
```

---

## 練習問題

1. 見出しを好きな色に変えてみよう
2. ボタンの色と大きさを変えてみよう
3. 背景に好きな色を付けてみよう
4. マウスを乗せたときに色が変わるボタンを作ってみよう

---

## まとめ

- CSSはウェブページを「かっこよく」する
- 色、大きさ、位置などを自由に変えられる
- `color`, `font-size`, `background-color` などのプロパティがある
- `<style>` タグや別ファイルでCSSを書ける

次は[JavaScriptの基礎](./basics-javascript.md)を学んで、ページに「動き」を付けてみよう！
