<style scoped>
@import "@/assets/Home.css";
</style>
<template>

  <div id="container">
    <div id="image" :style="`background-image: url(src/assets/Images/hangman${inGame.errors}.png)`"></div>
    <span id="tip" ref="tip">Category: {{ inGame.sorted.tip }}</span>
    <div id="keyword" ref="keyword">{{ inGame.hidden }}</div>

    <section id="keyboard">
      <button
        :class="(disabledBtn.find(e => e == item) == item ? 'btKeyDesabled': 'btKey') + ' '
        + (inGame.hits.find(e => e == item) == item ? 'hit': '')"
        type="button"
        v-for="(item, index) in keys"
        :key="index"
        :id="item"
        :ref="item"
        :disabled="disabledBtn.find(e => e == item) == item"
        v-on:click="gaming(item)"
      >
        {{ item }}
      </button>
    </section>
  </div>

  <div class="endGameContainer" v-show="gameover">
    <div class="endGame">
      <div :class="result">
        <h1>You {{ result == 'win' ? 'win!' : 'lose..'}}</h1>
        <h2>The secret word is: <b> {{ inGame.sorted.name }} </b></h2>
      </div>
      <button v-on:click="playAgain()">Play Again</button>
    </div>
  </div>

</template>

<script>
import secretWords from "@/assets/secretWords.json";

export default {
  data() {
    return {
      keys: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      inGame: {
        errors: 0,
        sorted: '',
        usedWords: '',
        hits: [],
        hidden: '',
      },
      disabledBtn: [],
      gameover: false,
      result: '',
    };
  },
  methods: {
    getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    setSecretWord(){
      const rnd = this.getRandomNumber(0, secretWords.length);
      this.inGame.sorted = secretWords[rnd];

      let hiddenUnderlines = this.inGame.sorted.name.split(' ')
      hiddenUnderlines.forEach((item, index) => {
        this.inGame.hidden += '_'.repeat(item.length);
        if(index < hiddenUnderlines.length) this.inGame.hidden += ' ';
      });
    },
    gaming(e) {
      this.disabledBtn.push(e);
      let sortedWord = this.inGame.sorted.name.toLowerCase().split('');
      let hiddenTransformed = this.inGame.hidden.split('');

      if (sortedWord.find(item => item == e) == e) {
        this.inGame.hits.push(e)

        sortedWord.forEach((item, index) => {
          if (item == e) {
            hiddenTransformed[index] = e
            this.inGame.hidden = hiddenTransformed.toString().replaceAll(',','').toUpperCase()
          }
        })

        if (this.inGame.hidden == this.inGame.sorted.name.toUpperCase()) {
          this.result = 'win'
          this.gameover = true;
        }
        return;
      }
      this.inGame.errors += 1;

      if (this.inGame.errors >= 6) {
        this.result = 'lose'
        this.gameover = true;
        return;
      }
    },
    playAgain() {
      this.inGame = {
        errors: 0,
        sorted: '',
        usedWords: '',
        hits: [],
        hidden: '',
      };
      this.gameover = false;
      this.result = '';
      this.disabledBtn = [];

      this.setSecretWord();
    },
  },
  mounted() {
    this.setSecretWord()
  }
};
</script>
