<script lang="ts" setup>
  import { ref } from "vue";
  import { useLocalStore } from "@/store/local"
  import { useAPIStore } from "@/store/api";

  //Shows error
  const maxChars = [
    (v: string) => v.length <= 240 || "Maximal 240 Zeichen!!"
  ]

  //Stores 
  const localStore = useLocalStore();
  const api = useAPIStore();

  //Models
  let input = ref(localStore.tweet);

  //Enforces 240 Char Rule
  function check() {
    if(input.value.length > 240) {
      input.value = input.value.substring(0,240);
    }
  }
  
  //Determines if tweet should be updated or inserted new
  async function submit() {
    let { id, content } = await api.insert(input.value, true)
    localStore.save(content, id);
  }

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
      <v-col align="center" justify="center" cols="auto">
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
