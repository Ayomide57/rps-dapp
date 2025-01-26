import { IMove } from "@/util/types";
import { faHandBackFist, faHandFist, faHandLizard, faHandSpock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScissorsIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import * as React from "react";



const Move = ({ move, setMove }: IMove) => {
  return (
    <div className="flex items-center justify-between">
      <IconButton
        color="gray"
        variant="classic"
        onClick={() => setMove(1)}
        className={`flex items-center text-center border-2 border-white rounded-lg p-1 m-2 ${
          move === 1 && "bg-gray-600"
        }`}
      >
        <FontAwesomeIcon
          icon={faHandBackFist}
          width="18"
          height="18"
          className="mr-2"
        />
        Rock
      </IconButton>
      <IconButton
        color="gray"
        variant="classic"
        onClick={() => setMove(2)}
        className={`flex items-center text-center border-2 border-white rounded-lg p-1 m-2 ${
          move === 2 && "bg-gray-600"
        }`}
      >
        <FontAwesomeIcon
          icon={faHandFist}
          width="18"
          height="18"
          className="mr-2"
        />
        Paper
      </IconButton>
      <IconButton
        color="gray"
        variant="classic"
        onClick={() => setMove(3)}
        className={`flex items-center text-center border-2 border-white rounded-lg p-1 m-2 ${
          move === 3 && "bg-gray-600"
        }`}
      >
        <ScissorsIcon width="18" height="18" className="mr-2" />
        Scissors
      </IconButton>
      <IconButton
        color="gray"
        variant="classic"
        onClick={() => setMove(4)}
        className={`flex items-center text-center border-2 border-white rounded-lg p-1 m-2 ${
          move === 4 && "bg-gray-600"
        }`}
      >
        <FontAwesomeIcon
          icon={faHandLizard}
          width="18"
          height="18"
          className="mr-2"
        />
        Lizard
      </IconButton>
      <IconButton
        color="gray"
        variant="classic"
        onClick={() => setMove(5)}
        className={`flex items-center text-center border-2 border-white rounded-lg p-1 m-2 ${
          move === 5 && "bg-gray-600"
        }`}
      >
        <FontAwesomeIcon
          icon={faHandSpock}
          width="18"
          height="18"
          className="mr-2"
        />{" "}
        Spock
      </IconButton>
    </div>
  );
};

export default Move;