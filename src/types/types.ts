export interface Match {
    id: number;
    opponentId: number | null;
    opponentMove: number | null;
    playerMove: number | null;
    playerWon: boolean;
}

export interface Round {
    id: number;
    round_number: number;
    start_time: string;
    end_time: string;
    match: Match | null;
}

export interface GameData {
    gameId: number;
    currentRoundId: number | null;
    currentRoundNumber: number | null; // Add this line
    gameState: 0 | 1 | 2 | 3;
    registrationStart: string;
    gameStart: string;
    maxRegistrations: number;
    currentRegistrations: number;
    userRegistered: boolean;
    rounds: Round[];
}
