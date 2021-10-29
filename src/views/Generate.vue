<template>
  <div class="about">
    <v-btn elevation="2" @click="findSongs">Generate Boomy Playlist</v-btn>
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
        const response = await store.getBoomyTracks();
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
        console.log('Success');
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    },
    getRandomEmoji() {
      var result = "";
      var characters =
        "🤖🎃🌙🌨🍋🥞🍪🏀🏆🥇🎬🎤🎧🎼🎹🥁🛸🎙💎🔮🧲💿🏝🚨🎸🧂";
      const rndInt = this.randomIntFromInterval(1, characters.length);
      result = characters.charAt(rndInt);
      return result;
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>
