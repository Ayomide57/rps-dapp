/* eslint-disable @typescript-eslint/no-explicit-any */
import DatabaseService from "@/lib/Database";
import { IGameState } from "./types";
import { setData } from "@/lib/localStorage";

export type ActionType =
  | {type: 'ADD_GAME'; payload: IGameState}
    | { type: 'GET_GAME'; payload: any }
  | { type: 'UPDATE_GAME'; payload: any }
      | {type: 'UPDATE_GAME_MOVE'; payload: any}
      | {type: 'UPDATE_GAME_WINNER'; payload: any}
    | {type: 'GET_GAME_BY_USER_ADDRESS'; payload: any}

export const initialState = {
  m1: 0,
  m2: 0,
  player1: "",
  player2: "",
  contract_address: "",
  amount: 0,
};


export const database = new DatabaseService();

export async function  reducer(state: any, action: ActionType ) {
  switch (action.type) {
    case 'ADD_GAME': {
          await database.save_game({
              m1: action.payload.m1,
              m2: action.payload.m2,
              player1: action.payload.player1,
              player2: action.payload.player2,
              contract_address: action.payload.contract_address,
              amount: action.payload.amount
          });
          return { ...state, ...action.payload };
      }
    case 'UPDATE_GAME_MOVE': {
          await database.update_move(action.payload.m2, action.payload.contract_address);
          return { ...state, ...action.payload };
    }
      case 'UPDATE_GAME_WINNER': {
          await database.update_winner(action.payload.player, action.payload.contract_address);
          return { ...state, ...action.payload };
      }
    case 'GET_GAME': {
      const payload = await database.getGameInformation(action.payload.contract_address);
        return { ...state, ...payload };

      }
    case 'GET_GAME_BY_USER_ADDRESS': {
        const payload = await database.getGameInformationByUserAddress(action.payload.player);
      if (payload && payload.length > 0) {
          setData("gameRecord", payload[0] )
          return { ...payload[0] };
        } else {
          return { ...initialState };
        }
      }
    default: 
        throw Error('Unknown action: ');

  }
}


