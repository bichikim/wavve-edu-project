import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import {UserConfig} from 'unocss'

const config: UserConfig = {
  presets: [
    //
    presetUno(),
    presetIcons(),
  ],
}

export default config
