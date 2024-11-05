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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
        <div style={{ fontSize: 40, marginTop: 50, color: "#e59eff" }}>
          Free to play
        </div>
        <div style={{ fontSize: 40, color: "#e59eff" }}>
          {`Tournament #${gameId}`}
        </div>
        {/* <div style={{ fontSize: 40, color: "#e59eff" }}>Win MOXIE</div> */}
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "20px",
          boxSizing: "border-box",
          textAlign: "center",
          fontSize: 30,
        }}
      >
        <div
          style={{ fontSize: 60, marginTop: 0, color: "#e59eff" }}
        >{`Round ${roundNumber}`}</div>
        <div
          style={{ fontSize: 40, marginTop: 30, color: "#e59eff" }}
        >{`${profileName}`}</div>
        <div
          style={{ fontSize: 40, marginTop: 0, color: "#e59eff" }}
        >{`vs`}</div>
        <div
          style={{ fontSize: 40, marginTop: 0, color: "#e59eff" }}
        >{`${opponentName}`}</div>
        <div
          style={{ fontSize: 40, marginTop: 40, color: "#e59eff" }}
        >{`Select your move`}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 60,
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
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              marginTop: "auto",
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
  let imgSrc;
  if (playerMove === "Rock") {
    imgSrc = "/rock.svg";
  } else if (playerMove === "Pepe") {
    imgSrc = "/pepe.svg";
  } else {
    imgSrc = "/slizards.svg";
  }
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
        <img
          src={imgSrc}
          alt="Rock"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
            display: "block",
            flexShrink: 1,
            padding: "20px",
          }}
        />
        <div style={{ fontSize: 30, color: "#e59eff" }}>
          Thanks for playing!
        </div>
        <div style={{ fontSize: 30, color: "#e59eff" }}>
          Check back soon for the next round
        </div>
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
          }}
        >
          {`Registration has not begun yet! Check back soon`}
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
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
  return {
    image: (
      <div
        style={{
          backgroundColor: "#2f0040",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
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

export const notRegistered = () => {
    return {
      image: (
        <div
          style={{
            backgroundColor: "#2f0040",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 60,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <HeroImage />
          <div
            style={{
              display: "flex",
              fontSize: 40,
              marginTop: 50,
              color: "#e59eff",
            }}
          >
            This game has started, but you're not registered ☹️
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              marginTop: 10,
              color: "#e59eff",
            }}
          >
            Please come back for the next game! 🙏
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 50,
            color: "#e59eff",
          }}
        >
          {`Welcome to round 1 ${userName}!`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
            color: "#e59eff",
          }}
        >
          {`You're matched up against ${opponentName}!`}
        </div>
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 50,
            color: "#e59eff",
          }}
        >
          {`Congratulations ${userName}!`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
            color: "#e59eff",
          }}
        >
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
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
            fontSize: 30,
            marginTop: 0,
            color: "#e59eff",
          }}
        >{`You lost in round 1 to @${opponentName}`}</div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
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

export const notVerified = () => {
    return {
      image: (
        <div
          style={{
            backgroundColor: "#2f0040",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 60,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <HeroImage />
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
              fontSize: 30,
              marginTop: 0,
              color: "#e59eff",
            }}
          >FID verification failed</div>
        </div>
      ),
    };
  };

export const gameOver = (gameId: string,winnerName: string) => {
  return {
    image: (
      <div
        style={{
          backgroundColor: "#2f0040",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeroImage />
        <div
          style={{ fontSize: 30, color: "#e59eff", marginTop: "80px" }}
        >{`Tournament #${gameId}`}</div>
        <div
          style={{ fontSize: 30, color: "#e59eff", marginTop: "10px" }}
        >{`was won by @${winnerName}!`}</div>
      </div>
    ),
  };
};

const HeroImage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 60,
      height: "50%",
      marginTop: "60px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        maxHeight: "100%",
        maxWidth: "100%",
        flexShrink: 1,
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
        }}
      />
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        maxHeight: "100%",
        maxWidth: "100%",
        flexShrink: 1,
      }}
    >
      <div style={{ color: "#bcffbb", margin: "0 10px" }}>Pepe</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pepe.svg"
        alt="Pepe"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          flexShrink: 1,
          padding: "10px",
        }}
      />
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        maxHeight: "100%",
        maxWidth: "100%",
        flexShrink: 1,
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
        }}
      />
    </div>
  </div>
);
