/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog } from "@airstack/frog";
import { handle } from "@airstack/frog/next";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@airstack/frog/serve-static";
import {
  getFarcasterUserDetails,
  FarcasterUserDetailsInput,
  FarcasterUserDetailsOutput,
} from "@airstack/frog";
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

// const app = new Frog({
//   imageAspectRatio: "1:1",
//   apiKey: process.env.AIRSTACK_API_KEY as string,
//   basePath: "/api",
//   assetsPath: "/",
// });

const app = new Frog({
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY as string,
      }
    }
  },
  imageAspectRatio: "1:1",
  apiKey: process.env.AIRSTACK_API_KEY as string,
  basePath: "/api",
  assetsPath: "/",
});

app.frame("/game/:gameId", (c) => {
  const { gameId } = c.req.param();

  return c.res(homeFrame(gameId));
});

app.frame("/game/:gameId/play", async (c) => {
  const { gameId } = c.req.param();
  const { frameData, verified } = c;
  const fid = frameData?.fid;

  console.log("verified: ", verified);

  if (!fid) throw new Error("FID not found");

  const userData = await fetchUserData(fid);
  const gameData = await fetchGameData(gameId, fid.toString());
  const currentRoundNumber = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  )?.round_number;
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
      return c.res(register(gameId, userData.profileName));
    }
  } else if (gameData.gameState === 2) {
    // game is active
    if (currentRound.match && currentRound.match.playerMove !== null) {
      // player already played
      return c.res(
        played(gameId, getMoveString(currentRound.match.playerMove))
      );
      // TODO: add case for no opponent
    } else if (currentRoundNumber === 1) {
      // round one
      const opponentData = await fetchUserData(currentRound.match.opponentId);

      return c.res(
        roundOne(
          gameId,
          currentRound.match.id.toString(),
          userData.profileName,
          opponentData ? opponentData.profileName : null
        )
      );
    } else if (!gameData.rounds[currentRoundNumber - 1].match) {
      // user lost in last round or a previous round

      const lastMatchAndRound = getUsersLastMatch(gameData);
      const opponentData = await fetchUserData(
        lastMatchAndRound.match.opponentId
      );

      return c.res(lost(lastMatchAndRound.roundLost, opponentData.profileName));
    } else {
      // user is in the current round
      const lastMatch = getUsersLastMatch(gameData);

      const opponentName = lastMatch.match.opponentId
        ? (await fetchUserData(lastMatch.match.opponentId)).profileName
        : "null";

      return c.res(
        wonLastRound(
          gameId,
          currentRound.match.id.toString(),
          userData.profileName,
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
  const { frameData, verified } = c;
  const fid = frameData?.fid;

  await registerUserForGame(fid, Number(gameId));
  return c.res(registered(gameId));
});

app.frame("/game/:gameId/:matchId/selectplay", async (c) => {
  console.log("inside selectplay");
  const { gameId, matchId } = c.req.param();
  const { frameData, verified } = c;
  // const { buttonValue, status } = c;
  const fid = frameData?.fid;

  if (!fid) throw new Error();

  const input: FarcasterUserDetailsInput = {
    fid: fid,
  };

  const { data, error }: FarcasterUserDetailsOutput =
    await getFarcasterUserDetails(input);

  if (error) throw new Error(error);

  const profileName = data.profileName;

  const gameData = await fetchGameData(gameId, fid.toString());
  const currentRoundNumber = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  )?.round_number;
  const currentRound = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  );

  const {
    data: opponentData,
    error: opponentError,
  }: FarcasterUserDetailsOutput = await getFarcasterUserDetails({
    fid: currentRound.match.opponentId,
  } as FarcasterUserDetailsInput);

  if (opponentError) throw new Error(opponentError);

  return c.res(
    selectPlay(
      gameId,
      matchId,
      profileName,
      currentRound.round_number.toString(),
      opponentData.profileName
    )
  );
});

app.frame("/game/:gameId/:matchId/played", async (c) => {
  const { gameId, matchId } = c.req.param();
  const { frameData, verified } = c;
  const { buttonValue, status } = c;
  const fid = frameData?.fid;

  await makePlay(Number(matchId), fid, getMoveNumber(buttonValue));

  return c.res(played(gameId, buttonValue));
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
