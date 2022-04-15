import { Character } from './Character'

export class Magician extends Character {
  
  constructor() {
    super({
      name: 'magician',
      health: 100,
      defense: 5,
      damage: 15
    })

    this.mana = 100
    this.magicDamage = 25
  }

  launch() {
    if (this.mana < 0) return
    const mana = this.mana - 10
    this.mana = mana > 0 ? mana : 0

    setTimeout(() => this.mana += 10, 5000)
    return this.magicDamage
  }
}