<script setup>
import { computed, reactive } from 'vue'
import { charactersService } from './services/characters'
import { monstersServices } from './services/monsters'
import Health from './components/Health.vue'

const app = reactive({
  character: null,
  monster: null,
  experience: 0,
  kills: 0,
  messages: ['👋 Hey ! Choisie un personnage']
})

const level = computed(() => Math.floor(app.experience / 50) + 1)

function monsterAttack() {
  app.character.take(app.monster.damage)
  app.messages.push(`🥊 ${ app.monster.name } attaque de ${ app.monster.damage }PV`)

  if (!app.character.health) {
    alert('Partie perdue !')
    app.messages = ['👋 Hey ! Choisie un personnage']
    app.character = null
    app.monster = null
  }
}

function checkIfMonsterIsDead() {
  if (!app.monster.health) {
    app.messages.push(`💪 Vous avez battu ${ app.monster.name } et gagnez ${ app.monster.experiences }XP`)
    app.kills++
    app.experience += app.monster.experiences
    app.monster = monstersServices.getRandom()
    app.messages.push(`👾 ${ app.monster.name } débarque dans le game !`)
    return
  }

  monsterAttack()
}

function handleCharacter(character) {
  app.character = charactersService.get(character)
  app.messages.push(`👾 la partie commance avec  ${ app.character.name }`)
  app.monster = monstersServices.getRandom()
  app.messages.push(`👾 ${ app.monster.name } débarque dans le game !`)
}

function handleHeal() {
  app.character.heal()
  app.messages.push(`💊 ${ app.character.name } se soigne de 30PV`)
  monsterAttack()
}

function handleAttack() {
  app.monster.take(app.character.damage)
  app.messages.push(`⚡️ ${ app.character.name } attaque de ${ app.character.damage }PV`)

  checkIfMonsterIsDead()
}

function handleLaunch() {
  app.monster.take(app.character.launch())
  app.messages.push(`☄️ ${ app.character.name } lance une boule de feu`)

  checkIfMonsterIsDead()
}
</script>

<template>
  <!-- SÉNARIO -->
  <header class="fixed top-[25px] left-1/2 translate-x-[-50%]">
    <div class="w-[400px] bg-white rounded-xl px-3 py-2 border-4 border-zinc-200 space-y-1">
      <p v-for="message in app.messages.slice(-4)" class="tracking-wider">{{ message }}</p>
    </div>
  </header>



  <!-- CHOIX -->
  <ul v-if="!app.character" class="flex m-auto space-x-[100px]">
    <li
      @click="handleCharacter('warrior')"
      class="h-[300px] w-[300px] bg-white border-8 border-zinc-200 rounded-2xl cursor-pointer"
    >
      <img src="/warrior/default.png" class="h-full w-full object-cover" />
    </li>
    <li
      @click="handleCharacter('magician')"
      class="h-[300px] w-[300px] bg-white border-8 border-zinc-200 rounded-2xl cursor-pointer"
    >
      <img src="/magician/default.png" class="h-full w-full object-cover" />
    </li>
  </ul>



  <!-- COMBAT -->
  <main v-else class="relative container h-[400px] w-[800px] m-auto bg-white border-8 border-zinc-200 rounded-2xl">
    <article class="absolute bottom-0 left-[50px] flex flex-col justify-end">
      <Health :pv="app.character.health / app.character.maxHealth * 100" />
      <img
        :src="`/${ app.character.name }/default.png`"
        class="max-h-[200px] mx-auto mt-[50px] rounded-xl"
      />
    </article>
    <article class="absolute top-[25px] right-[50px] flex flex-col justify-end">
      <img
        :src="`/${ app.monster.name }/default.png`"
        class="max-h-[200px] mx-auto mb-[50px] rounded-xl"
      />
      <Health :pv="app.monster.health / app.monster.maxHealth * 100" />
    </article>
  </main>


  <!-- CONTRÔLE -->
  <footer v-if="app.character" class="fixed bottom-[25px] left-1/2 translate-x-[-50%]">
    <div class="flex space-x-4 text-white">
      <button @click="handleAttack()" class="flex-none px-3 py-2 rounded-xl font-semibold bg-red-500">Attaquer</button>
      <div v-if="app.character.name === 'magician'" class="relative flex-none">
        <div class="h-2 w-full absolute -top-[20px] flex-auto bg-yellow-700 rounded-full">
          <div
            :style="{ width: `${ app.character.mana / 100 * 100 }%` }"
            class="h-full bg-yellow-400 rounded-full"
          ></div>
        </div>
        <button
          @click="handleLaunch()"
          :disabled="!app.character.mana"
          :class="app.character.mana ? 'bg-yellow-400' : 'bg-yellow-700'"
          class="px-3 py-2 rounded-xl font-semibold"
        >Boule de feu</button>
      </div>
      <button @click="handleHeal()" class="flex-none px-3 py-2 rounded-xl font-semibold bg-green-500">Se soigner</button>
      <div class="relative flex-none">
        <div class="h-2 w-full absolute -top-[20px] flex-auto bg-sky-800 rounded-full">
          <div
            :style="{ width: `${ ((app.experience - ((level - 1) * 50)) / 50) * 100 }%` }"
            class="h-full bg-sky-500 rounded-full"
          ></div>
        </div>
        <button class="px-3 py-2 rounded-xl font-semibold bg-sky-500 cursor-default">Niveau {{ level }}</button>
      </div>
      <button class="flex-none px-3 py-2 rounded-xl font-semibold bg-rose-500 cursor-default">{{ app.kills }} kills</button>
    </div>
  </footer>
</template>