import { createClient } from "@supabase/supabase-js"
import { defineStore } from "pinia";
type Record = {
	id: string,
	content: string
}
const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL || "", 
	import.meta.env.VITE_SUPABASE_KEY || ""
);

export const useAPIStore = defineStore({
	id: "supabase",
	actions: {
		/**
		 * Inserts new Tweet into database
		 * @param tweet The text of the tweet
		 * @param tutorium Describes Tutorium. 0 = early, 1 = late
		 * @returns Id and content of inserted row
		 */
		async insert(tweet: string, tutorium: boolean): Promise<Record> {
			const { data, error } = await supabase.from("twitter-gewitter").insert({
				tweet: tweet,
				tutorium: tutorium
			})
			.select();
			if(data && !error) {
				return { id: data[0].id, content: data[0].tweet };
			}
			else {
				return { id: "", content: ""};
			}
		}
	}
})
