import { defineStore } from "pinia";

export const useLocalStore = defineStore('local', {
	state: () => {
		return { tweet: localStorage.getItem("tweet") || ""}
	},

	actions: {
		save(text: string) {
			this.tweet = text;
			localStorage.setItem("tweet", text);
		}
	}
})