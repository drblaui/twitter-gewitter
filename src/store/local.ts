import { defineStore } from "pinia";

export const useLocalStore = defineStore('local', {
	state: () => {
		let tweet = JSON.parse(localStorage.getItem("tweet") || "{}");

		return { tweet: tweet.content || "", id: tweet.id || ""}
	},

	actions: {
		save(text: string, id: string) {
			this.tweet = text;
			let locStore = {
				id: id, 
				content: text 
			}
			localStorage.setItem("tweet", JSON.stringify(locStore));
		}
	}
})