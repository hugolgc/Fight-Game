import { Monster } from './Monster'

export class Issou extends Monster {
  
  constructor() {
    super({
      health: 75,
      name: 'issou',
      damage: 20,
      experiences: 25
    })
  }
}