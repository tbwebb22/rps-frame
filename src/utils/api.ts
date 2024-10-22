import { getFarcasterUserDetails, FarcasterUserDetailsOutput } from "@airstack/frog";
import { GameData } from "../types/types";

export async function fetchGameData(gameId: string, fid: string): Promise<GameData> {
  const response = await fetch(
    `http://localhost:3000/api/games/${gameId}/status/${fid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function fetchUserData(fid: number) {
  const { data, error }: FarcasterUserDetailsOutput =
    await getFarcasterUserDetails({
      fid: fid,
    });

  if (error) throw new Error(error);

  return data;
}

export const getUsersLastMatch = (gameData: GameData) => {
  for (let i = gameData.rounds.length - 1; i >= 0; i--) {
    if (gameData.rounds[i].match !== undefined) {
      return { match: gameData.rounds[i].match, roundLost: i + 1 };
    }
  }
  return undefined; // Return undefined if no match is found
}
