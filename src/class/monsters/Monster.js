export class Monster {
  health      = null
  maxHealth   = null
  name        = null
  damage      = null
  experiences = null

  constructor({ health, name, damage, experiences }) {
    this.health      = health
    this.maxHealth   = this.health
    this.name        = name
    this.damage      = damage
    this.experiences = experiences
  }

  attack() {
    return this.attack
  }

  take(attack) {
    const damage = this.health - attack
    this.health = damage < 0 ? 0 : damage
  }
}