<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { ref } from 'vue';
	import { useAPIStore } from '@/store/api';

	const supabaseStore = useAPIStore();
	const supabase = supabaseStore.getSupabaseObject();
	const route = useRoute();
	const result = route.params.tutorium;

	const tweets = ref((await supabaseStore.getAll(result == "1")).reduce((a,v) => ({...a, [v.id]:v}), {}));
	console.log(tweets.value);
	
	const twitterGewitter = supabase.channel('any')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'twitter-gewitter', filter: `tutorium=eq.${result}`},
    (payload) => {
			tweets.value[payload.new.id] = payload.new;
    }
  )
  .subscribe()
</script>
<template>
	<v-container>
		<v-col cols="auto" v-if="result">
			<router-link to="/results/" class="text-decoration-none">
				<v-btn icon="mdi-arrow-left"/>
			</router-link>
		</v-col>
		<v-row>
			<v-col class="text-h2" align="center">
				Tweets
			</v-col>
		</v-row>
		<v-row align="center" v-if="result">
			<v-col align="center" v-for="tweet in tweets">
				<v-card width="450" height="250">
					<template v-slot:text>
						<div class="text-h6">{{ tweet.tweet}}</div>
					</template>
				</v-card>
			</v-col>
		</v-row>
		<v-row v-else justify="center">
			<v-col cols="auto" class="text-h4">
				<router-link to="/results/0" class="text-decoration-none">
					<v-card>
						<v-card-title>
							Tutorium 1
						</v-card-title>
					</v-card>
				</router-link>
			</v-col>
			<v-col cols="auto" class="text-h4">
				<router-link to="/results/1" class="text-decoration-none">
					<v-card>
						<v-card-title>
							Tutorium 2
						</v-card-title>
					</v-card>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>