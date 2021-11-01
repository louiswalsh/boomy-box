<template>
  <div class="about">
    <h1>Generate Playlist</h1>
    <v-divider class="divider"></v-divider>
    <v-btn elevation="2" @click="findSongs" class="button"
      >Click here - 🚀</v-btn
    >
  </div>
</template>

<script>
import store from "@/store/store.js";

export default {
  data: () => ({
    queryString: "",
    responseSongs: null,
    playlistID: null
  }),
  methods: {
    async findSongs() {
      try {
        const response = await store.getBoomyTracks(this.randomIntFromInterval(0, 400));
        this.responseSongs = response.data.tracks.items.map((a) => a.uri);
        this.createPlaylist();
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    },
    async createPlaylist() {
      try {
        const response = await store.createUserPlaylist(this.getRandomEmoji());
        this.playlistID = response.data.id;
        this.populatePlaylist();
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    },
    async populatePlaylist() {
      try {
        await store.populatePlaylist(
          { uris: this.responseSongs },
          this.playlistID
        );
        console.log("Success");
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    },
    getRandomEmoji() {
      var result = "";
      var characters = ["🤖","🎃","🌙","🌨","🍋","🥞","🍪","🏀","🏆","🥇","🎬","🎤","🎧","🎼","🎹","🥁","🛸","🎙","💎","🔮","🧲","💿","🏝","🚨","🎸","🧂"];
      const rndInt = this.randomIntFromInterval(1, characters.length);
      result = characters[rndInt];
      return result;
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 10vh;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.about {
  text-align: center;
}

.button {
  min-height: 100px;
  width: 400px;
}

p {
  text-align: justify;
  font-size: 3vh;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.divider {
  border-width: 2px !important;
  border-color: white !important;
  height: 100%;
}
</style>
