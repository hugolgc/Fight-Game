import { Monster } from './Monster'

export class Patrick extends Monster {
  
  constructor() {
    super({
      health: 50,
      name: 'patrick',
      damage: 35,
      experiences: 10
    })
  }
}