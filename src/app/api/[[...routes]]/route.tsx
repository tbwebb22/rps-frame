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
} from "../../../utils/api";
import {
  homeFrame,
  register,
  prePlay,
  registered,
  registrationFull,
  selectPlay,
  registrationNotStarted,
  lost,
  gameOver,
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
    if (!gameData.rounds[currentRoundNumber - 1].match) {
      // user is not in the current round
      const lastMatchAndRound = getUsersLastMatch(gameData);
      return c.res(
        lost(
          lastMatchAndRound.roundLost,
          lastMatchAndRound.match.opponentId.toString()
        )
      );
    } else {
      // user is in the current round
      return c.res(prePlay());
    }
  } else {
    // game is over
    return c.res(gameOver('taylorwebb.eth'));
  }
});

app.frame("/game/:gameId/registered", async (c) => {
  const { gameId } = c.req.param();
  console.log("gameID: ", gameId);
  return c.res(registered(gameId));
});

app.frame("/game/:gameId/played", async (c) => {
  const { gameId } = c.req.param();
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

  return c.res({
    action: `/game/${gameId}/played`,
    image: (
      <div
        style={{
          color: "red",
          display: "flex",
          flexDirection: "column",
          fontSize: 60,
        }}
      >
        <div>{`You played ${buttonValue}!`}</div>
        <div>Next round starts in 3 hours!</div>
      </div>
    ),
  });
});

// app.frame("/", (c) => {
//   const { buttonValue, status } = c;
//   return c.res({
//     image: (
//       <div style={{ color: "white", display: "flex", fontSize: 60 }}>
//         {status === "initial"
//           ? "Select your fruit!"
//           : `Selected: ${buttonValue}`}
//       </div>
//     ),
//     intents: [
//       <Button value="apple">Apple</Button>,
//       <Button value="banana">Banana</Button>,
//       <Button value="mango">Mango</Button>,
//     ],
//   });
// });

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
