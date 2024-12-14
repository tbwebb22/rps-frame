/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Frog } from "@airstack/frog";
import { handle } from "@airstack/frog/next";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@airstack/frog/serve-static";
import { moxieAbi } from "../../../abis/moxieAbi";
import {
  fetchGameData,
  fetchUserData,
  getUsersLastMatch,
  makePlay,
  registerUserForGame,
  getMoveString,
  getMoveNumber,
  isUserInFirstRound,
  fetchCreateGameStatus,
  createGamePost,
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
  notVerified,
  notRegistered,
  createdGame,
  createGameMoxieAmount,
  createGameAnnouncement,
  createGameStart,
  approveMoxie,
  approvedMoxie,
} from "../../frames/frames";
import { GameData } from "../../../types/types";

type State = {
  game: GameData | null;
};

const app = new Frog<{ State: State }>({
  title: "Rock Pepe Slizards",
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY as string,
      },
    },
  },
  imageAspectRatio: "1:1",
  apiKey: process.env.AIRSTACK_API_KEY as string,
  basePath: "/api",
  assetsPath: "/",
  initialState: {
    game: null,
  },
  imageOptions: {
    fonts: [
      {
        name: 'Anton',
        weight: 400,
        source: 'google',
      },
    ],
  },
});

app.frame("/create", (c) => {
  return c.res(createGameStart());
});

app.frame("/createmoxie", async (c) => {
  const { frameData, verified } = c;
  const fid = frameData?.fid;
  if ((process.env.VERIFY === "true" && !verified) || !fid) {
    return c.res(notVerified());
  }

  return c.res(createGameMoxieAmount());
});

app.frame("/createfinal", async (c) => {
  const { frameData, verified, buttonValue } = c;
  const fid = frameData?.fid;

  if ((process.env.VERIFY === "true" && !verified) || !fid) {
    return c.res(notVerified());
  }
  const gameId = 1;
  const moxiePrize = 1000;

  const castUrl = `https://warpcast.com/~/compose?text=I'm%20sponsoring%20Rock%20Pepe%20Slizards%20Tournament%20%23${gameId}!%0A%0A${moxiePrize}%20Moxie%20prize%20to%20the%20winner%20💰%0A%0AEasy%20to%20play%20(it's%20just%20rock%20paper%20scissors)%2C%20impossible%20to%20master%20(it's%20all%20luck)%0A%0A🗿%20Rock%20beats%20Slizards%20🦎%0A🐸%20Pepe%20beats%20Rock%20🗿%0A🦎%20Slizards%20beats%20Pepe%20🐸%0A%0AIf%20you%20want%20to%20play%3A%0A1)%20Follow%20%40rps-referee%20-%20this%20bot%20will%20notify%20you%20when%20you%20need%20to%20make%20a%20play%0A2)%20Register%20in%20the%20frame%20below%20-%20first%2032%20to%20register%20get%20to%20play%0A3)%20All%20players%20get%20placed%20into%20a%20bracket%20and%20matched%20up%20against%20opponents%20in%2015%20minute%20matches%20until%20we%20have%20a%20winner%0A%0AMay%20the%20odds%20be%20ever%20in%20your%20favor%20🙏%0A%0A🗿%20🐸%20🦎&embeds[]=https://rps-frame.vercel.app/api/game/${gameId}&channelKey=rockpepeslizards`;

  return c.res(createGameAnnouncement(buttonValue, castUrl));
});

app.frame("/approvemoxie", (c) => {
  const moxieAmount = 1000;

  return c.res(approveMoxie());
});

app.frame("/approvedmoxie", (c) => {
  const { transactionId } = c
  return c.res(approvedMoxie(transactionId));
});

app.transaction('/approvemoxietx', (c) => {
  // const { inputText } = c
  // Contract transaction response.
  const moxieAddress = '0x8C9037D1Ef5c6D1f6816278C7AAF5491d24CD527';
  const spenderAddress = '0x1eF03652a1361A9F965b12bE2d75cd71ed0F5065';
  const approvalAmount = BigInt(100);

  return c.contract({
    abi: moxieAbi,
    chainId: 'eip155:8453',
    functionName: 'approve',
    args: [spenderAddress, approvalAmount],
    to: moxieAddress,
    value: BigInt(0)
  })
});

// app.frame("/created", async (c) => {
//   const { frameData, verified, deriveState } = c;
//   const fid = frameData?.fid;

//   if ((process.env.VERIFY === "true" && !verified) || !fid) {
//     return c.res(notVerified());
//   }

//   const minutesToStart = 30;
//   const maxRounds = 5;
//   const roundLengthMinutes = 15;

//   await createGamePost(minutesToStart, maxRounds, fid, roundLengthMinutes);

//   return c.res(createdGame());
// });

app.frame("/game/:gameId", (c) => {
  const { gameId } = c.req.param();

  return c.res(homeFrame(gameId));
});

app.frame("/game/:gameId/play", async (c) => {
  const { gameId } = c.req.param();
  const { frameData, verified, deriveState } = c;
  const fid = frameData?.fid;

  console.log(`FID: ${fid}, Verified: ${verified}`);

  if (!fid) throw new Error("FID not found");

  const gameData = await fetchGameData(gameId, fid.toString());

  console.log("gameData: ", gameData);

  deriveState((state) => {
    state.game = gameData;
  });

  const currentRound = gameData.rounds.find(
    (round) => round.id === gameData.currentRoundId
  );

  if ((process.env.VERIFY === "true" && !verified) || !fid) {
    return c.res(notVerified());
  } else if (gameData.gameState === 0) {
    // registration not started
    return c.res(registrationNotStarted());
  } else if (gameData.gameState === 1) {
    // registration is active
    if (gameData.userRegistered) {
      // user is already registered
      return c.res(registered(gameId, gameData.gameStart));
    } else if (gameData.currentRegistrations >= gameData.maxRegistrations) {
      // registration is full
      return c.res(registrationFull());
    } else {
      // user is not registered
      return c.res(register(gameId, gameData.userName));
    }
  } else if (gameData.gameState === 2) {
    // game is active
    if (!isUserInFirstRound(gameData)) {
      // user is not registered

      return c.res(notRegistered(gameId));
    } else if (currentRound.match && currentRound.match.playerMove !== null) {
      // player already played

      return c.res(
        played(
          gameId,
          currentRound.end_time,
          getMoveString(currentRound.match.playerMove)
        )
      );
    } else if (currentRound.round_number === 1) {
      // round one

      const opponentData = await fetchUserData(currentRound.match.opponentId);
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

      return c.res(lost(gameId, lastMatchAndRound.roundLost, opponentData.profileName));
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
    return c.res(gameOver(gameId, winnerData.profileName));
  }
});

app.frame("/game/:gameId/registered", async (c) => {
  const { gameId } = c.req.param();
  const { frameData, verified, deriveState } = c;
  const fid = frameData?.fid;

  if ((process.env.VERIFY === "true" && !verified) || !fid)
    throw new Error("User not verified");

  let game: GameData;
  deriveState((state) => {
    game = state.game;
  });

  await registerUserForGame(fid, Number(gameId));
  return c.res(registered(gameId, game.gameStart));
});

app.frame("/game/:gameId/:matchId/selectplay", async (c) => {
  const { gameId, matchId } = c.req.param();
  const { frameData, verified, deriveState } = c;
  const fid = frameData?.fid;

  if ((process.env.VERIFY === "true" && !verified) || !fid)
    throw new Error("User not verified");

  let game: GameData;
  deriveState((state) => {
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
  const { frameData, buttonValue, verified, deriveState } = c;
  const fid = frameData?.fid;

  if ((process.env.VERIFY === "true" && !verified) || !fid)
    throw new Error("User not verified");

  let game: GameData;
  deriveState((state) => {
    game = state.game;
  });

  await makePlay(Number(matchId), fid, getMoveNumber(buttonValue));

  const currentRound = game.rounds.find(
    (round) => round.id === game.currentRoundId
  );

  return c.res(played(gameId, currentRound.end_time, buttonValue));
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
