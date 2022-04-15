import { Magician } from '../class/characters/Magician'
import { Warrior } from '../class/characters/Warrior'

export const charactersService = {
  get(character) {
    if (character === 'magician') return new Magician()
    if (character === 'warrior') return new Warrior()
  }
}