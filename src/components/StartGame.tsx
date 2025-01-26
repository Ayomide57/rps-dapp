import { useState, useEffect, ActionDispatch } from "react";
import { IGameState, IMove } from "@/util/types";
import { Formik } from "formik";
import { Input } from "./input";
import { Button } from "@radix-ui/themes";
import { ActionType } from "@/util/reducers";

export interface IStartGame {
  playGame: (values: any, dispatch: any, move: number) => void;
  dispatch: ActionDispatch<[action: ActionType]>;
  move: number;
}

export default function StartGame({ playGame, dispatch, move }: IStartGame) {
  return (
    <div>
      <Formik
        initialValues={{
          player2: "",
          amount: 0,
        }}
        onSubmit={(values) => playGame(values, dispatch, move)}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          //isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Stake Eth"
              type="number"
              name="amount"
              step="any"
              min="0.0000001"
              onBlur={handleBlur}
              onChange={handleChange}
              className="border-primary m-5"
            />
            {errors.amount && touched.amount && errors.amount}
            <Input
              placeholder="Second Player Address"
              name="player2"
              onBlur={handleBlur}
              onChange={handleChange}
              className="border-primary m-5"
            />
            {errors.player2 && touched.player2 && errors.player2}
            <Button
              size="4"
              variant="soft"
              className="w-full bg-blue-500 rounded-md m-5 p-2"
              type="submit"
            >
              Start Game
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
