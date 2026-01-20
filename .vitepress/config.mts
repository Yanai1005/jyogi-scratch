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
    ],

    sidebar: [
      {
        text: 'Scratchゲーム',
        items: [
          { text: '講座トップ', link: '/games/scratch/' },
          { text: 'モグラ叩きゲーム', link: '/games/scratch/mogura-tataki' }
        ]
      }
    ],
  }
})
