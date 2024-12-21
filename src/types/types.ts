export interface Match {
    id: number;
    opponentId: number | null;
    opponentName: string | null;
    opponentDisplayName: string | null;
    opponentImage: string | null;
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
    userName: string;
    userDisplayName: string;
    userImage: string | null;
    currentRoundId: number | null;
    currentRoundNumber: number | null;
    gameState: 0 | 1 | 2 | 3;
    registrationStart: string;
    gameStart: string;
    maxRegistrations: number;
    currentRegistrations: number;
    userRegistered: boolean;
    rounds: Round[];
    winnerId: number | null;
    castHash: string | null;
}

export interface CreateGameStatus {
    canCreate: boolean;
    waitTimeMinutes: number;
}
