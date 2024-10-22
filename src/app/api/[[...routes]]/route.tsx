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

const app = new Frog({
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

  if (!fid) throw new Error("FID not found");

  const userData = await fetchUserData(fid);
  const gameData = await fetchGameData(gameId, fid.toString());
  const currentRoundNumber = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  )?.round_number;
  const currentRound = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  );

  console.log("fid: ", fid);
  console.log("userData:", userData);
  console.log("gameData:", gameData);
  console.log("currentRoundNumber:", currentRoundNumber);

  if (gameData.gameState === 0) {
    // registration not started
    console.log("registration not started");
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
      return c.res(register(gameId));
    }
  } else if (gameData.gameState === 2) {
    // game is active
    console.log("currentRound: ", currentRound);
    if (currentRound.match && currentRound.match.playerMove !== null) {
      // player already played
      return c.res(played(gameId, getMoveString(currentRound.match.playerMove)));
    } else if (currentRoundNumber === 1) {
      // round one
      return c.res(roundOne(gameId));
    } else if (!gameData.rounds[currentRoundNumber - 1].match) {
      // user lost is last round or a previous round
      const lastMatchAndRound = getUsersLastMatch(gameData);
      return c.res(
        lost(
          lastMatchAndRound.roundLost,
          lastMatchAndRound.match.opponentId.toString()
        )
      );
    } else {
      // user is in the current round
      return c.res(
        wonLastRound(
          gameId,
          currentRound.match.id.toString(),
          currentRound.match.playerMove
        )
      );
    }
  } else {
    // game is over
    return c.res(gameOver(gameData.winnerId.toString()));
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
  const { buttonValue, status } = c;
  const fid = frameData?.fid;

  if (!fid) throw new Error();

  const input: FarcasterUserDetailsInput = {
    fid: fid,
  };

  const { data, error }: FarcasterUserDetailsOutput =
    await getFarcasterUserDetails(input);

  const profileName = data.profileName;

  if (error) throw new Error(error);

  return c.res(selectPlay(gameId, matchId, profileName));
});

app.frame("/game/:gameId/:matchId/played", async (c) => {
  const { gameId, matchId } = c.req.param();
  const { frameData, verified } = c;
  const { buttonValue, status } = c;
  const fid = frameData?.fid;

  console.log("played buttonValue: ", buttonValue);

  await makePlay(Number(matchId), fid, getMoveNumber(buttonValue));

  // return c.res(played(gameId, buttonValue));
  return c.res(
    {
      image: (
        <div
          style={{
            backgroundColor: "#2f0040",
            color: "#e59eff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "20px",
            boxSizing: "border-box",
            textAlign: "center",
            fontSize: 30,
          }}
        >
          <div>{`You played rock!`}</div>
        </div>
      )
    }
  );
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
