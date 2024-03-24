/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog } from "@airstack/frog";
import { handle } from "@airstack/frog/next";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@airstack/frog/serve-static";

const app = new Frog({
  apiKey: process.env.AIRSTACK_API_KEY as string,
  basePath: "/api",
});

app.frame("/", (c) => {
  const { buttonValue, status } = c;
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        {status === "initial"
          ? "Select your fruit!"
          : `Selected: ${buttonValue}`}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
