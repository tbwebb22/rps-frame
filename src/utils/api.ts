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

export async function fetchUserData(fid: number | null) {
    if (!fid) return null;

    const { data, error }: FarcasterUserDetailsOutput =
        await getFarcasterUserDetails({
            fid: fid,
        });

    if (error) throw new Error(error);

    return data;
}

export async function registerUserForGame(fid: number, gameId: number): Promise<any> {
    console.log(`registering user for game ${gameId} with fid ${fid}`);
    const response = await fetch('http://localhost:3000/api/games/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fid, gameId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function makePlay(matchId: number, fid: number, move: number): Promise<any> {
    console.log('body: ', JSON.stringify({ matchId, fid, move }));
    const response = await fetch('http://localhost:3000/api/games/play', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matchId, fid, move }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const getUsersLastMatch = (gameData: GameData) => {
    for (let i = gameData.rounds.length - 1; i >= 0; i--) {
        // console.log("i: ", i, "undefined: ", gameData.rounds[i].match !== undefined);
        if (gameData.rounds[i].match && gameData.rounds[i].id !== gameData.currentRoundId) {
            return { match: gameData.rounds[i].match, roundLost: i + 1 };
        }
    }
    return undefined;
}

export const getMoveString = (move: number) => {
    return move === 0 ? "Rock" : move === 1 ? "Pepe" : "Slizards";
}

export const getMoveNumber = (move: string) => {
    return move === "Rock" ? 0 : move === "Pepe" ? 1 : 2;
}