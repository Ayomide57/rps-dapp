
import { rpsAbi, hasherAbi, hasherAddress, rpsContractByteCode } from "./constants";
import {  BrowserProvider, Contract, ContractFactory, parseEther } from "ethers";
import { IGameState } from "./types";
import { getRandomInt } from "@/lib/utils";
import { ActionDispatch } from "react";
import { ActionType } from "./reducers";

import toast from "react-hot-toast";
import { getData, setData } from "@/lib/localStorage";


export const playGame = async (
  player2: string,
  move: number,
  contract_address: string,
  amount: string,
  dispatch: ActionDispatch<[action: ActionType]>
) => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (signerAddress != player2)
    throw {
      error: {
        message: "Please sign in as player 2",
      },
    };
      if (move === 0) {
        toast.error("Please select a move");
        throw {
          error: {
            message: "Please select a move",
          },
        };
      }  
  try {
    const contract = new Contract(contract_address, rpsAbi, signer);
      const response = await contract.play(move, {
        value: parseEther(`${amount}`),
      });
     await response;
      dispatch({
        type: "UPDATE_GAME_MOVE",
        payload: {
          m2: move,
          contract_address: contract_address,
        },
      });
          dispatch({
            type: "GET_GAME_BY_USER_ADDRESS",
            payload: { player: signerAddress },
          });

        toast.success("Your move has been registered player 2");
  } catch (error) {
    console.log(error);
    toast.error("Transaction Failed");
  }

};

export const solve = async (
  player1: string,
  move: number, //player 1 move
  contract_address: string,
  dispatch: ActionDispatch<[action: ActionType]>
) => {
  let winner;
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (signerAddress != player1) {
    toast.error("Please sign in as player 2");
    throw {
      error: {
        message: "Please sign in as player 2",
      },
    };
  }
    if (move === 0) {
      toast.error("Please select a move");
      throw {
        error: {
          message: "Please select a move",
        },
      };
    }

  const salt = getData("secretSalt");
  try {
      const contract = new Contract(contract_address, rpsAbi, signer);
      const response = await contract.solve(move, salt);
    await response;
      const gameRecord = getData("gameRecord");
        const checkWinner1 = await contract.win(move, gameRecord.m2);
        const winnerTx = await checkWinner1;
            const checkWinner2 = await contract.win(gameRecord.m2, move);
            const winnerTx2 = await checkWinner2;
    if (winnerTx2 === winnerTx) {
      winner = "Tie";
    } else {
      winner = winnerTx && player1;
      winner = winnerTx2 && gameRecord.player2;
    }
          dispatch({
            type: "UPDATE_GAME_WINNER",
            payload: {
              player: winner,
              contract_address: contract_address,
            },
          });

    if (winner === "Tie") { 
      toast.success("It's a Tie, Check your balance for refund") 
    } else {
      toast.success(`Winner: ${winner}`);
    }
  } catch (error) {
    console.log(error);
    toast.error("Transaction Failed");
  }

};



export const startGame = async (
  values: { player2: string; amount: number },
  dispatch: ActionDispatch<[action: ActionType]>,
  move: number
) => {
  const randomNum = getRandomInt(10);
  setData("secretSalt", randomNum);
  if (move === 0) {
        toast.error("Please select a move");
    throw {
      error: {
        message: "Please select a move",
      },
    };
}
      
  const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
  if (signerAddress === values.player2) {
            toast.error(
              "You can't use the same address as the signer address."
            );

    throw {
      error: {
        message: "You can't use the same address as the signer address.",
      },
    };
  }
try {
  const contract = new Contract(hasherAddress, hasherAbi, signer);
  const response = await contract.hash(move, BigInt(`${randomNum}`));
  const hasherTx = await response;
  console.log("hashTx", hasherTx);
  const contractFactory = new ContractFactory(
    rpsAbi,
    rpsContractByteCode,
    signer
  );
  const rpsContract = await contractFactory.deploy(hasherTx, values.player2, {
    value: parseEther(`${values.amount}`),
  });
  await rpsContract.waitForDeployment();
  await rpsContract.deploymentTransaction()?.wait();
  const contract_address = await rpsContract.getAddress();

  const payload: IGameState = {
    m1: move,
    m2: 0,
    player1: signerAddress,
    player2: values.player2,
    contract_address: contract_address,
    amount: values.amount,
  };
  dispatch({ type: "ADD_GAME", payload: payload });
  toast.success(
    "The game has begun, and your move has been successfully recorded"
  );
} catch (error) {
    console.log(error);
  toast.error("Transaction Failed");
}
    };

export const j1Timeout = async (
  player2: string,
  contract_address: string,
  dispatch: ActionDispatch<[action: ActionType]>
) => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (signerAddress != player2)
    throw {
      error: {
        message: "Please sign in as player 2",
      },
    };
  try {
    const contract = new Contract(contract_address, rpsAbi, signer);
    const response = await contract.j1Timeout();
    const rpsTx = await response;
    console.log("rpsTx =====", rpsTx);
    dispatch({
      type: "UPDATE_GAME_WINNER",
      payload: {
        player: player2,
        contract_address: contract_address,
      },
    });
    toast.success("Player 2: Your account has been refunded");
  } catch (error) {
    console.log(error);
    toast.error("Timeout time has passed");
  }
};

export const j2Timeout = async (
  player1: string,
  contract_address: string,
  dispatch: ActionDispatch<[action: ActionType]>
) => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (signerAddress != player1)
    throw {
      error: {
        message: "Please sign in as player 1",
      },
    };
  try {
    const contract = new Contract(contract_address, rpsAbi, signer);
    const response = await contract.j2Timeout();
    await response;
    dispatch({
      type: "UPDATE_GAME_WINNER",
      payload: {
        player: player1,
        contract_address: contract_address,
      },
    });
    toast.success("Player 1: Your account has been refunded");
  } catch (error) {
    console.log(error);
    toast.error("Timeout time has passed");
  }
};

export const winner = async (
  contract_address: string,
) => {
  const gameRecord = getData("gameRecord");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  try {
    const contract = new Contract(contract_address, rpsAbi, signer);
    const response = await contract.win(2, gameRecord.m2);
    const rpsTx = await response;
    console.log("rpsTx ======", rpsTx);
    //toast.success("Player 1: Your account has been refunded");
  } catch (error) {
    toast.error(error);
  }
};


