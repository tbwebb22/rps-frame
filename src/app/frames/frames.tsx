/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog } from "@airstack/frog";

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
            marginTop: "60px",
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
        <div style={{ fontSize: 40, marginTop: 50, color: "#e59eff" }}>
          Free to play
        </div>
        <div style={{ fontSize: 40, color: "#e59eff" }}>
          {`Tournament #${gameId}`}
        </div>
        {/* <div style={{ fontSize: 40, color: "#e59eff" }}>Win 10,000 MOXIE</div> */}
      </div>
    ),
    intents: [<Button>Play</Button>],
  };
};

export const selectPlay = (
  gameId: string,
  matchId: string,
  profileName: string,
  roundNumber: string,
  opponentName: string
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
        justifyContent: "space-between", // This will push content to top and bottom
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        boxSizing: "border-box",
        textAlign: "center",
        fontSize: 30,
      }}
      >
        <div style={{ fontSize: 60, marginTop: 0, color: "#e59eff" }}>{`Round ${roundNumber}`}</div>
        <div style={{ fontSize: 40, marginTop: 30, color: "#e59eff" }}>{`${profileName}`}</div>
        <div style={{ fontSize: 40, marginTop: 0, color: "#e59eff" }}>{`vs`}</div>
        <div style={{ fontSize: 40, marginTop: 0, color: "#e59eff" }}>{`${opponentName}`}</div>
        <div style={{ fontSize: 40, marginTop: 40, color: "#e59eff" }}>{`Select your move`}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", // Center items in the row
            alignItems: "center", // Center items vertically
            fontSize: 60,
            // border: "2px solid red",
            height: "30%",
            marginTop: "60px",
          }}
        >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rpsMoves2.svg"
          alt="Pepe"
          style={{
            maxWidth: "100%",
            maxHeight: "100%", // Limit height to ensure it doesn't overflow
            objectFit: "contain",
            display: "block",
            marginTop: "auto", // This pushes the image to the bottom
          }}
        />
        </div>
      </div>
    ),
    intents: [
      <Button value="Rock">Rock</Button>,
      <Button value="Pepe">Pepe</Button>,
      <Button value="Slizards">Slizards</Button>,
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
            marginTop: "60px",
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
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 50,
            color: "#e59eff",
          }}
        >{`Welcome ${userName}!`}</div>
        <div style={{ display: "flex", fontSize: 40, color: "#e59eff" }}>
          Register below to play
        </div>
        {/* <div style={{ fontSize: 40, color: "#e59eff" }}>Win 10,000 MOXIE</div> */}
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
            marginTop: "60px",
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
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 50,
            color: "#e59eff",
          }}
        >
          Thanks for registering!
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
          fontSize: 60,
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
  userName: string,
  opponentName: string,
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
        <div>{`Congratulations ${userName}!`}</div>
        <div>
          {opponentName
            ? `You won your last match against ${opponentName}`
            : `You won your last match!`}
        </div>
      </div>
    ),
    intents: [<Button value="play">Next Match</Button>],
  };
};

export const lost = (roundNumber: number, opponentName: string) => {
  return {
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
            marginTop: "60px",
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
        <div
          style={{
            display: "flex",
            fontSize: 80,
            marginTop: 0,
            color: "#e59eff",
          }}
        >
          ☹️
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 0,
            color: "#e59eff",
          }}
        >{`You lost in round 1 to @${opponentName}`}</div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 0,
            color: "#e59eff",
          }}
        >
          Better luck next game!
        </div>
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
        <div>{`The game was won by @${winnerName}!`}</div>
      </div>
    ),
  };
};

