import { Monster } from './Monster'

export class Pascal extends Monster {
  
  constructor() {
    super({
      health: 150,
      name: 'pascal',
      damage: 30,
      experiences: 40
    })
  }
}