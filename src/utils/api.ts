import { getFarcasterUserDetails, FarcasterUserDetailsOutput } from "@airstack/frog";
import { GameData, CreateGameStatus } from "../types/types";
import { ethers } from "ethers";
import { moxieAbi } from "../abis/moxieAbi";
import { escrowAbi } from "../abis/escrowAbi";


export async function getMoxieAllowance(ownerAddress: string, spendAddress: string) {
    console.log("getting moxie allowance");
    console.log("ownerAddress: ", ownerAddress);
    console.log("spendAddress: ", spendAddress);
    const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
    const moxieContract = new ethers.Contract(process.env.MOXIE_ADDRESS, moxieAbi, provider);
    const allowance = await moxieContract.allowance(ownerAddress, spendAddress);

    return allowance;
}

export async function checkDeposit(fid: number) {
    console.log("checking deposit for fid: ", fid);
    const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
    const escrowContract = new ethers.Contract(
        process.env.ESCROW_ADDRESS!,
        escrowAbi,
        provider
    );
    
    // Get events from last 1000 blocks
    const filter = escrowContract.filters.Deposit(null, fid);
    const blockNumber = await provider.getBlockNumber();
    const events = await escrowContract.queryFilter(filter, blockNumber - 100, blockNumber);
    if (events.length > 0) {
        const event = events[0];
        // topics[0] is event signature, topics[1] is depositId, topics[2] is fid
        const depositId = parseInt(event.topics[1], 16);
        const fid = parseInt(event.topics[2], 16);
        // amount is non-indexed, so it's in data
        const amount = BigInt(event.data);
        
        console.log("Deposit event values:", { 
            depositId, 
            fid, 
            amount: amount.toString() // Convert to string for logging
        });
        return { depositId, fid, amount };
    }
    return null;
}


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

export async function fetchCreateGameStatus(): Promise<CreateGameStatus> {
    const url = `${process.env.BACKEND_URL}/api/games/createStatus`;
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

export async function createGamePost(minutesToStart: number, maxRounds: number, sponsorId: number, winnerReward: number, depositId: number, roundLengthMinutes: number): Promise<any> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/games/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.BACKEND_API_KEY || '',
        },
        body: JSON.stringify({ minutesToStart, maxRounds, sponsorId, winnerReward, depositId, roundLengthMinutes }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
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