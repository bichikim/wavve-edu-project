/// <reference types="vite/client" />

import {UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from 'node:url'
import unocss from 'unocss/vite'
import millionLint from '@million/lint'

const isInVsTerminal =
  `${process.env.VSCODE_GIT_ASKPASS_NODE}${process.env.GIT_ASKPASS}${process.env.VSCODE_GIT_ASKPASS_MAIN}`
    .toLowerCase()
    .includes('visual studio code')

export const config: UserConfig = {
  plugins: [
    //
    react(),
    unocss(),
    isInVsTerminal ? millionLint.vite() : null,
  ],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('src', import.meta.url)),
    },
  },
}

export default config
