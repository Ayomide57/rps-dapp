import { IGameState } from "@/util/types";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


export default class DatabaseService {

    async save_game({ m1, m2, player1, player2, contract_address, amount }: IGameState) {
        try {
            const { data, error } = await supabase.from('game_record')
                .insert({ m1, m2, player1, player2, contract_address, amount });  
            if (error) console.log("fail", error);
            return data;
        } catch (error) {
            console.log("Error", error)
        }
    }

    async update_move(m2: number, contract_address: string) {
        try {
            const { error } = await supabase.from('game_record')
                .update({ m2: m2 })
                .eq('contract_address', contract_address);
            if (error) console.log("fail", error);
            return true;
        } catch (error) {
            console.log("Error", error)
        }
    }

    async update_winner(player: string, contract_address: string) {
        try {
            const { error } = await supabase.from('game_record')
                .update({ winner: player })
                .eq('contract_address', contract_address);
            if (error) console.log("fail", error);
            return true;
        } catch (error) {
            console.log("Error", error)
        }
    }

    async update_game_end(game_end: boolean, contract_address: string) {
        try {
            const { error } = await supabase.from('game_record')
                .update({ game_end: game_end })
                .eq('contract_address', contract_address);
            if (error) console.log("fail", error);
            return true;
        } catch (error) {
            console.log("Error", error)
        }
    }

    async getGameInformation(contract_address: string) {
        try {
            const { data, error } = await supabase
            .from('game_record')
                .select('m2, player1, player2, contract_address, amount, winner, game_end')
                  .limit(1)
                .eq('contract_address', contract_address);
            if (error) console.log("fail", error);
            return data;
        } catch (error) {
            console.log("Error", error)
        }
    }

    async getGameInformationByUserAddress(player: string) {
        try {
            const { data, error } = await supabase
            .from('game_record')
                .select('m2, player1, player2, contract_address, amount, winner, game_end')
                                  .limit(1)
                .or(`player1.eq.${player},player2.eq.${player}`);
            if (error) console.log("fail", error);
            return data;
        } catch (error) {
            console.log("Error", error)
        }
    }

}