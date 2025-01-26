import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";
import { createThirdwebClient } from "thirdweb";
import { generateRandomIntegerNumber, RandomReader } from "@oslojs/crypto/random";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const clientId = process.env.NEXT_PUBLIC_ClIENT_ID2 || "";

export const client = createThirdwebClient({
  clientId: clientId,
});

export function getRandomInt(loopNum: number) {       
  const random: RandomReader = {
    read(bytes: Uint8Array): void {
      crypto.getRandomValues(bytes);
    }
  };
  const randval = [];
  for (let index = 0; index < loopNum; index++) {
    const num: number = generateRandomIntegerNumber(random, 100);
    randval.push(num);
  }
  return randval.join('');
}

