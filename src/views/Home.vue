<script lang="ts" setup>
  import { ref } from "vue";
  import { useLocalStore } from "@/store/local"

  const maxChars = [
    (v: string) => v.length <= 240 || "Maximal 240 Zeichen!!"
  ]
  const localStore = useLocalStore();
  let input = ref(localStore.tweet);

  function check() {
    if(input.value.length > 240) {
      input.value = input.value.substring(0,240);
    }
  }

  function submit() {
    localStore.save(input.value);
    console.log(input.value);
    console.log(localStore.tweet)
  }
  console.log(localStore.tweet)

</script>
<template>
  <v-container>
    <v-row>
      <v-col align="center" class="text-h2">
        Twitter-Gewitter
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="text-h6">
        Ich würde dir die Veranstaltung Auswirkungen der Informatik empfehlen, wenn du...
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align="center" justify="center" cols="3">
        <v-textarea
          counter
          label="Deine Gedanken"
          @keyup="check()"
          v-model="input"
          :rules="maxChars">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align="center">
        <v-btn prepend-icon="mdi-twitter" @click="submit" :disabled="input.length <= 0">
          Zwitschern!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
    
</template>
