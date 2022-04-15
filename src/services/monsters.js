import { Issou } from '../class/monsters/Issou'
import { Pascal } from '../class/monsters/Pascal'
import { Patrick } from '../class/monsters/Patrick'

export const monstersServices = {
  getRandom() {
    const monsters = [
      new Issou(),
      new Pascal(),
      new Patrick()
    ]
    return monsters[Math.floor(Math.random() * monsters.length)]
  }
}