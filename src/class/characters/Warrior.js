import { Character } from './Character'

export class Warrior extends Character {
  
  constructor() {
    super({
      name: 'warrior',
      health: 150,
      defense: 10,
      damage: 25
    })
  }
}