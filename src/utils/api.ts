import { getFarcasterUserDetails, FarcasterUserDetailsOutput } from "@airstack/frog";
import { GameData } from "../types/types";

export async function fetchGameData(gameId: string, fid: string): Promise<GameData> {
    const url = `${process.env.BACKEND_URL}/api/games/${gameId}/status/${fid}`;
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.BACKEND_API_KEY || '',
    };

    const response = await fetch(url, {
        method: "GET",
        headers,
    });

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
    const response = await fetch(`${process.env.BACKEND_URL}/api/games/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.BACKEND_API_KEY || '',
        },
        body: JSON.stringify({ fid, gameId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function makePlay(matchId: number, fid: number, move: number): Promise<any> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/games/play`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.BACKEND_API_KEY || '',
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
        if (gameData.rounds[i].match && gameData.rounds[i].id !== gameData.currentRoundId) {
            return { match: gameData.rounds[i].match, roundLost: gameData.rounds[i].round_number };
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

export const isUserInFirstRound = (gameData: GameData) => {
    return (
        gameData.rounds?.[0]?.match != null
    );
}