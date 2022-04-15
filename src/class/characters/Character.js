export class Character {
  name      = null
  health    = null
  maxHealth = null
  defense   = null
  damage    = null

  constructor({ name, health, defense, damage }) {
    this.name      = name
    this.health    = health
    this.maxHealth = this.health
    this.defense   = defense
    this.damage    = damage
  }

  heal() {
    const health = this.health + 30
    this.health = health > this.maxHealth ? this.maxHealth : health
  }

  take(attack) {
    const damage = this.health - (attack - this.defense)
    this.health = damage < 0 ? 0 : damage
  }
}