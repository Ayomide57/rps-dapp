import { j2Timeout, solve } from "@/util";
import { database } from "@/util/reducers";
import { IPlayer } from "@/util/types";
import { Button } from "@radix-ui/themes";
import { useActiveAccount } from "thirdweb/react";




const Player1 = ({ move, data, dispatch }: IPlayer) => {
      const smartAccount = useActiveAccount();
    
    return (
      <>
        {data != undefined && data.player1 === smartAccount?.address && (
          <div className="">
            {data.m2 == 0 && (
              <p className="text-lg p-5 text-center">
                Player 2 is Yet to make a move
              </p>
            )}
            {data.m2 === 0 && data.winner === null && (
              <div>
                {" "}
                <p className="text-lg p-5 text-center">
                  {`Note** Game Time Out is 5 minuites After player make his/her move`}
                </p>
                <Button
                  size="4"
                  variant="soft"
                  className="w-full bg-blue-500 rounded-md m-5 p-2"
                  onClick={() => {
                    j2Timeout(data.player1, data.contract_address, dispatch);
                  }}
                >
                  Timeout Claim Fund
                </Button>
              </div>
            )}

            {data.m2 != 0 && data.winner === null && (
              <div>
                <p className="text-lg p-5 text-center">
                  Please select your previous move, To Pick Winner
                </p>
                <Button
                  size="4"
                  variant="soft"
                  className="w-full bg-blue-500 rounded-md m-5 p-2"
                  onClick={() => {
                    solve(data.player1, move, data.contract_address, dispatch);
                    setTimeout(() => {
                      window.location.reload();
                    }, 50000);
                    setTimeout(() => {
                    window.location.reload();
                    }, 20000);

                  }}
                >
                  End Game, Pick Winner
                </Button>
              </div>
            )}
            {data.m2 != 0 && data.winner != null && (
              <div>
                {data.winner === data.player1 && (
                  <p className="text-lg p-5 text-center">
                    Congratulation, You are the winner
                  </p>
                )}
                {data.winner === data.player2 && (
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
                        data.winner === data.player1 ? "Price" : ""
                      } ${data.winner === "Tie" ? "Refund" : ""}`}
                    </p>
                  ))}

                            {data.game_end === false && <Button
                                size="4"
                                variant="soft"
                                className="w-full bg-blue-500 rounded-md m-5 p-2"
                                onClick={() => {
                                    database.update_game_end(true, data.contract_address);
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 20000);
                                                        setTimeout(() => {
                                                          window.location.reload();
                                                        }, 20000);

                                }}
                            >
                                Start a New Game
                            </Button>}
              </div>
            )}
          </div>
        )}
      </>
    );
}

export default Player1