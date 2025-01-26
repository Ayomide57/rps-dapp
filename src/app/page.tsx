"use client";
import { client } from "@/lib/utils";
import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useState, useReducer, useCallback} from "react";
import { initialState, reducer } from "@/util/reducers";
import Move from "@/components/Move";
import StartGame from "@/components/StartGame";
import { startGame } from "@/util";
import { getData } from "@/lib/localStorage";
import Player1 from "@/components/Player1";
import Player2 from "@/components/Player2";


export default function Home() {
  const [game, dispatch] = useReducer(reducer, initialState);
  const [data, updateData] = useState<any>();
    const [move, setMove] = useState<number>(0);
  const smartAccount = useActiveAccount();

  const getGameInfo = useCallback(() => {
    if (smartAccount?.address) {
      dispatch({
        type: "GET_GAME_BY_USER_ADDRESS",
        payload: { player: smartAccount?.address },
      });
    }
  }, [smartAccount?.address]);

  useEffect(() => {
    if (smartAccount?.address && initialState === game) {
      getGameInfo();
      updateData(getData("gameRecord"));
    }
    console.log("data",data);
  }, [move, data, game, smartAccount?.address, getGameInfo]);
    
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-5 gap-16  font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ConnectButton client={client} />
      </div>
      <main className="items-center sm:items-start w-1/3">
        <h1 className="text-2xl p-5 text-center">
          Rock Paper Scissors Extension
        </h1>
        <Move setMove={setMove} move={move} />
        {data == undefined && (
          <StartGame move={move} dispatch={dispatch} playGame={startGame} />
        )}
        <Player1 data={data} move={move} dispatch={dispatch} />
        <Player2 data={data} move={move} dispatch={dispatch} />
      </main>
    </div>
  );
}
