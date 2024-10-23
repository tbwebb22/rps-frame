/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog } from "@airstack/frog";

// register
// roundOne
// wonLastRound
// lostLastRound
// notSelected
// played
// gameOver

export const homeFrame = (gameId: string) => {
  return {
    action: `/game/${gameId}/play`,
    image: (
      <div
        style={{
          backgroundColor: "#2f0040",
          color: "white", // Changed text color to improve visibility
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center", // Center content vertically
          alignItems: "center", // Center content horizontally
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          // border: "2px solid yellow",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", // Center items in the row
            alignItems: "center", // Center items vertically
            fontSize: 60,
            // border: "2px solid red",
            height: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center items in the row
              alignItems: "center", // Center items vertically
              fontSize: 60,
              maxHeight: "100%", // Add this line
              maxWidth: "100%", // Add this line
              flexShrink: 1, // Allow it to shrink
            }}
          >
            <div style={{ color: "#ffb19f", margin: "0 10px" }}>Rock</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rock.svg"
              alt="Rock"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                flexShrink: 1,
                padding: "20px",
                // margin: "5%"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center items in the row
              alignItems: "center", // Center items vertically
              fontSize: 60,
              maxHeight: "100%", // Add this line
              maxWidth: "100%", // Add this line
              flexShrink: 1, // Allow it to shrink
            }}
          >
            <div style={{ color: "#bcffbb", margin: "0 10px" }}>Pepe</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pepe.svg"
              alt="Pepe"
              // width="200"
              // height="200"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                flexShrink: 1,
                padding: "10px",
                // margin: "5%"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center items in the row
              alignItems: "center", // Center items vertically
              fontSize: 60,
              maxHeight: "100%", // Add this line
              maxWidth: "100%", // Add this line
              flexShrink: 1, // Allow it to shrink
            }}
          >
            <div style={{ color: "#b3c8ff", margin: "0 10px" }}>Slizards</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slizards.svg"
              alt="Pepe"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                flexShrink: 1,
                padding: "40px",
                // margin: "5%"
              }}
            />
          </div>
        </div>
        <div style={{ fontSize: 40, marginTop: 10, color: "#e59eff" }}>
          {`Game #${gameId}`}
        </div>
        <div style={{ fontSize: 40, color: "#e59eff" }}>Play for free</div>
        <div style={{ fontSize: 40, color: "#e59eff" }}>Win 10,000 MOXIE</div>
      </div>
    ),
    intents: [<Button>Play</Button>],
  };
};

export const selectPlay = (
  gameId: string,
  matchId: string,
  profileName: string
) => {
  return {
    action: `/game/${gameId}/${matchId}/played`,
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
        <div>Select your move!</div>
      </div>
    ),
    intents: [
      <Button value="Rock">rock</Button>,
      <Button value="Pepe">pepe</Button>,
      <Button value="Slizards">slizards</Button>,
    ],
  };
};

export const played = (gameId: string, playerMove: string) => {
  return {
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
        <div>{`You played ${playerMove}!`}</div>
      </div>
    ),
  };
};

export const registrationNotStarted = () => {
  return {
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
        }}
      >
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
          }}
        >
          {`Registration is has not begun yet! Check back soon`}
        </div>
      </div>
    ),
  };
};

export const registrationFull = () => {
  return {
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
        }}
      >
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
          }}
        >
          {`Registration is full!\nCheck back soon for the next game!`}
        </div>
      </div>
    ),
  };
};

export const register = (gameId: string, userName: string) => {
  return {
    action: `/game/${gameId}/registered`,
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
        <div>{`Welcome ${userName}!`}</div>
        <div>{`Register for game #${gameId} below`}</div>
      </div>
    ),
    intents: [<Button value="register">register</Button>],
  };
};

export const registered = (gameId: string) => {
  console.log("gameId: ", gameId);
  return {
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
        }}
      >
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
          }}
        >
          {`You're registered for game #${gameId}!`}
        </div>
      </div>
    ),
  };
};

export const roundOne = (
  gameId: string,
  matchId: string,
  userName: string,
  opponentName: string
) => {
  return {
    action: `/game/${gameId}/${matchId}/selectplay`,
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
        <div>{`Welcome to round 1 ${userName}!`}</div>
        <div>{`You're matched up against ${opponentName}!`}</div>
      </div>
    ),
    intents: [<Button value="play">play</Button>],
  };
};

export const wonLastRound = (
  gameId: string,
  matchId: string,
  lastRoundPlayerMove: number
) => {
  return {
    action: `/game/${gameId}/${matchId}/selectplay`,
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
        <div>{`You won last round by playing ${lastRoundPlayerMove}!`}</div>
      </div>
    ),
    intents: [<Button value="play">play</Button>],
  };
};

export const lost = (roundNumber: number, opponentName: string) => {
  return {
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
        <div>{`You lost in round ${roundNumber} to ${opponentName}!`}</div>
      </div>
    ),
  };
};

export const gameOver = (winnerName: string) => {
  return {
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
        <div>{`The game was won by ${winnerName}!`}</div>
      </div>
    ),
  };
};
