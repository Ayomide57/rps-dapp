// Types goes here// Types goes here

import { BigNumberish } from "ethers";
import { ActionDispatch } from "react";
import { ActionType } from "../reducers";

export interface IMove {
    move: number;
    setMove: (move: number) => void
}

export interface IPlayer {
  move: number;
    data: any;
  dispatch: ActionDispatch<[action: ActionType]>;
}


export interface IGameState {
    m1: number;
    m2: number;
    player1: string;
    player2: string;
    contract_address: string;
    amount: BigNumberish;
}

export interface ICreateVideo {
    title: string;
    description: string;
    videolink: string;
    thumbnailLink: string;
    tag: string;
    category: string;
    user: string | undefined;
    videoUUid: string;
    duration: number | undefined;
}


