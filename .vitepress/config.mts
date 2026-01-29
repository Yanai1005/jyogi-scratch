import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "講座資料",
  description: "講座資料",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'Scratch講座', link: '/games/scratch/' },
      { text: 'JavaScript講座', link: '/games/javascript/' }
    ],

    sidebar: [
      {
        text: 'Scratchゲーム',
        items: [
          { text: '講座トップ', link: '/games/scratch/' },
          { text: 'モグラ叩きゲーム', link: '/games/scratch/mogura-tataki' }
        ]
      },
      {
        text: 'JavaScriptゲーム',
        items: [
          { text: '講座トップ', link: '/games/javascript/' },
          { text: 'HTMLの基礎', link: '/games/javascript/basics-html' },
          { text: 'CSSの基礎', link: '/games/javascript/basics-css' },
          { text: 'JavaScriptの基礎', link: '/games/javascript/basics-javascript' },
          { text: 'モグラ叩きゲーム', link: '/games/javascript/mogura-tataki' }
        ]
      }
    ],
  }
})
