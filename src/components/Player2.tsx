import { j1Timeout, playGame } from "@/util";
import { database } from "@/util/reducers";
import { IPlayer } from "@/util/types";
import { Button } from "@radix-ui/themes";
import { useActiveAccount } from "thirdweb/react";

const Player2 = ({ move, data, dispatch }: IPlayer) => {
  const smartAccount = useActiveAccount();

    return (
      <>
        {data != undefined && data.player2 === smartAccount?.address && (
          <div>
            {data.winner === null && (
              <div>
                <p className="text-lg p-5 text-center">
                  Welcome player 2, Kindly select your move
                </p>
                <p className="text-lg p-5 text-center">
                  {`Note** You need ${data.amount} eth to play your move`}
                </p>
                <p className="text-lg p-5 text-center">
                  {`Note** Game Time Out is 5 minuites`}
                </p>
              </div>
            )}
            {data.m2 == 0 && (
              <Button
                size="4"
                variant="soft"
                className="w-full bg-blue-500 rounded-md m-5 p-2"
                onClick={() => {
                  playGame(
                    data.player2,
                    move,
                    data.contract_address,
                    data.amount,
                    dispatch
                  );
                  setTimeout(() => {
                    window.location.reload();
                  }, 20000);
                }}
              >
                Play Game
              </Button>
            )}
            {data.m2 != 0 && data.winner != null && (
              <div>
                {data.winner === data.player2 && (
                  <p className="text-lg p-5 text-center">
                    Congratulation, You are the winner
                  </p>
                )}
                {data.winner === data.player1 && (
                  <p className="text-lg p-5 text-center">You lost, Try again</p>
                )}

                {data.winner === "Tie" && (
                  <p className="text-lg p-5 text-center">It is a Tie</p>
                )}

                <br />
                {data.winner === data.player2 ||
                  (data.winner === "Tie" && (
                    <p className="text-lg p-5 text-center">
                      {`Please check Your account For Your ${
                        data.winner === data.player2 ? "Price" : ""
                      } ${data.winner === "Tie" ? "Refund" : ""}`}
                    </p>
                  ))}
                <Button
                  size="4"
                  variant="soft"
                  className="w-full bg-blue-500 rounded-md m-5 p-2"
                  onClick={() => {
                    database.update_game_end(true, data.contract_address);
                    setTimeout(() => {
                      window.location.reload();
                    }, 20000);
                  }}
                >
                  Start a New Game
                </Button>
              </div>
            )}

            {data.m2 != 0 && data.winner === null && (
              <Button
                size="4"
                variant="soft"
                className="w-full bg-blue-500 rounded-md m-5 p-2"
                onClick={() => {
                    j1Timeout(data.player2, data.contract_address, dispatch);
                                        setTimeout(() => {
                                          window.location.reload();
                                        }, 50000);

                }}
              >
                Timeout Claim Fund
              </Button>
            )}
          </div>
        )}
      </>
    );
}
export default Player2;
