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

const app = new Frog({
  imageAspectRatio: '1:1',
  apiKey: process.env.AIRSTACK_API_KEY as string,
  basePath: "/api",
  assetsPath: "/",
});

app.frame("/game/:gameId", (c) => {
  const { gameId } = c.req.param();

  return c.res({
    action: `/game/${gameId}/play`,
    image: (
      <div
        style={{
          backgroundColor: '#2f0040',
          color: "white", // Changed text color to improve visibility
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',    // Center content vertically
          alignItems: 'center',        // Center content horizontally
          fontSize: 60,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center', // Center items in the row
            alignItems: 'center',     // Center items vertically
            fontSize: 60,
          }}
        >
          <div style={{ color: "#ffb19f", margin: '0 10px' }}>Rock</div>
          <div style={{ color: "#bcffbb", margin: '0 10px' }}>Pepe</div>
          <div style={{ color: "#b3c8ff", margin: '0 10px' }}>Slizzards</div>
        </div>
        {/* <div>{`Welcome to game #${gameId}`}</div> */}
        <img
          src="/pepe.svg"
          alt="Pepe"
          width="200"
          height="200"
          style={{ marginTop: 20 }}
        />
      </div>
    ),
    intents: [<Button>Play</Button>],
  });
});

app.frame("/game/:gameId/play", async (c) => {
  const { gameId } = c.req.param();
  const { frameData, verified } = c;
  const fid = frameData?.fid;

  if (!fid) throw new Error();

  const input: FarcasterUserDetailsInput = {
    fid: fid,
  };

  console.log("fid: ", fid);

  const { data, error }: FarcasterUserDetailsOutput =
    await getFarcasterUserDetails(input);

  console.log("data: ", data);
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
        <div>{`Welcome to game #${gameId} ${profileName}!`}</div>
        <div>Select your move!</div>
      </div>
    ),
    intents: [
      <Button value="rock">rock</Button>,
      <Button value="pepe">pepe</Button>,
      <Button value="slizards">slizards</Button>,
    ],
  });
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
