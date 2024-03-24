# Get Started

## Step 1: Environment Variables

Copy `.env.example` to create a new file `.env.local` and input the [Airstack API key](https://docs.airstack.xyz/airstack-docs-and-faqs/get-started/get-api-key) as an environment variable:

```
AIRSTACK_API_KEY=xxx
```

## Step 2: Install dependencies

Install the necessary dependencies using `npm` or other package managers:

```sh
npm install
```

## Step 3: Run Development Server

To start the development server, run the following command:

```sh
npm run dev
```

Once, the development server is up, you can access your Frame at `http://localhost:3000`.

For testing your Frame, you can run the Frog Devtools by running the following command:

```sh
npm run devtools
```

From there, you can open `http://localhost:5173` and input `http://localhost:3000` to the text input to start testing.
