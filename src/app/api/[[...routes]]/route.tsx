/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Frog } from "@airstack/frog";
import { handle } from "@airstack/frog/next";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@airstack/frog/serve-static";
import {
  fetchGameData,
  fetchUserData,
  getUsersLastMatch,
  makePlay,
  registerUserForGame,
  getMoveString,
  getMoveNumber,
} from "../../../utils/api";
import {
  homeFrame,
  register,
  roundOne,
  registered,
  registrationFull,
  selectPlay,
  registrationNotStarted,
  lost,
  gameOver,
  wonLastRound,
  played,
} from "../../frames/frames";
import { GameData } from "../../../types/types";

type State = {
  game: GameData | null;
}

const app = new Frog<{ State: State }>({ 
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY as string,
      }
    }
  },
  imageAspectRatio: "1:1",
  //TODO: is this apiKey needed?
  apiKey: process.env.AIRSTACK_API_KEY as string,
  basePath: "/api",
  assetsPath: "/",
  initialState: {
    game: null,
  },
});

app.frame("/game/:gameId", (c) => {
  const { gameId } = c.req.param();

  return c.res(homeFrame(gameId));
});

app.frame("/game/:gameId/play", async (c) => {
  const { gameId } = c.req.param();
  const { frameData, verified, deriveState } = c;
  const fid = frameData?.fid;

  console.log("verified: ", verified);

  if (!fid) throw new Error("FID not found");

  const gameData = await fetchGameData(gameId, fid.toString());

  deriveState(state => {
    state.game = gameData;
  });
  
  const currentRound = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  );

  if (gameData.gameState === 0) {
    // registration not started
    return c.res(registrationNotStarted());
  } else if (gameData.gameState === 1) {
    // registration is active
    if (gameData.currentRegistrations >= gameData.maxRegistrations) {
      // registration is full
      return c.res(registrationFull());
    } else if (gameData.userRegistered) {
      // user is already registered
      return c.res(registered(gameId));
    } else {
      // user is not registered
      return c.res(register(gameId, gameData.userName));
    }
  } else if (gameData.gameState === 2) {
    // game is active
    if (currentRound.match && currentRound.match.playerMove !== null) {
      // player already played
      return c.res(
        played(gameId, getMoveString(currentRound.match.playerMove))
      );
      // TODO: add case for no opponent
    } else if (currentRound.round_number === 1) {
      // round one
      console.log("getting opponent data");
      const opponentData = await fetchUserData(currentRound.match.opponentId);
      console.log("opponentData: ", opponentData);
      return c.res(
        roundOne(
          gameId,
          currentRound.match.id.toString(),
          gameData.userName,
          opponentData ? opponentData.profileName : null
        )
      );
    } else if (!gameData.rounds[currentRound.round_number - 1].match) {
      // user lost in last round or a previous round

      const lastMatchAndRound = getUsersLastMatch(gameData);
      const opponentData = await fetchUserData(
        lastMatchAndRound.match.opponentId
      );

      return c.res(lost(lastMatchAndRound.roundLost, opponentData.profileName));
    } else {
      // user is in the current round
      const lastMatch = getUsersLastMatch(gameData);

      const opponentName = lastMatch.match.opponentName
        ? lastMatch.match.opponentName
        : "null";

      return c.res(
        wonLastRound(
          gameId,
          currentRound.match.id.toString(),
          gameData.userName,
          opponentName,
          lastMatch.match.playerMove
        )
      );
    }
  } else {
    // game is over
    const winnerData = await fetchUserData(gameData.winnerId);
    return c.res(gameOver(winnerData.profileName));
  }
});

app.frame("/game/:gameId/registered", async (c) => {
  const { gameId } = c.req.param();
  const { frameData } = c;
  const fid = frameData?.fid;

  await registerUserForGame(fid, Number(gameId));
  return c.res(registered(gameId));
});

app.frame("/game/:gameId/:matchId/selectplay", async (c) => {
  const { gameId, matchId } = c.req.param();
  const { frameData, deriveState } = c;
  const fid = frameData?.fid;

  if (!fid) throw new Error();

  let game: GameData;
  deriveState(state => {
    game = state.game;
  });

  const currentRound = game.rounds.find(
    (round) => round.id === game.currentRoundId
  );

  return c.res(
    selectPlay(
      gameId,
      matchId,
      game.userName,
      currentRound.round_number.toString(),
      currentRound.match.opponentName ? currentRound.match.opponentName : null
    )
  );
});

app.frame("/game/:gameId/:matchId/played", async (c) => {
  const { gameId, matchId } = c.req.param();
  const { frameData, buttonValue } = c;
  const fid = frameData?.fid;

  await makePlay(Number(matchId), fid, getMoveNumber(buttonValue));

  return c.res(played(gameId, buttonValue));
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
