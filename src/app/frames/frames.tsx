/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog, TextInput } from "@airstack/frog";

const backgroundColor = "#16101e";
const fontColor = "#c282ff";

export const createGameStart = () => {
  return {
    action: `/createmoxie`,
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
      </div>
    ),
    intents: [<Button>Launch Tournament</Button>],
    title: `Rock Pepe Slizards`,
  };
};

export const createGameMoxieAmount = () => {
    return {
      action: `/createfinal`,
      image: (
        <div
          style={{
            fontFamily: "Anton",
            backgroundColor,
            color: fontColor,
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
          <div style={{ fontSize: 40, marginTop: 10 }}>
            Enter Moxie sponsorship amount
        </div>
        </div>
      ),
      intents: [
        <Button value="1000">1,000 Moxie</Button>,
        <Button value="2500">2,500 Moxie</Button>,
        <Button value="5000">5,000 Moxie</Button>,
        <Button value="10000">10,000 Moxie</Button>,
    ],
      title: `Rock Pepe Slizards`,
    };
  };

  export const createGameAnnouncement = (moxieAmount: string, castUrl: string) => {
    return {
      image: (
        <div
          style={{
            fontFamily: "Anton",
            backgroundColor,
            color: fontColor,
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
          <div style={{ fontSize: 40, marginTop: 10 }}>
            {`${moxieAmount} Moxie sponsorship!`}
        </div>
          <div style={{ fontSize: 40, marginTop: 10 }}>
            Announce the tournament below!
        </div>
        </div>
      ),
      intents: [
        <Button.Link href={castUrl}>
          Announce Tournament
        </Button.Link>
    ],
      title: `Rock Pepe Slizards`,
    };
  };

// export const createGameStatus = (
//   canLaunch: boolean,
//   minutesUntilStart: number
// ) => {
//   return {
//     action: `/created`,
//     image: (
//       <div
//         style={{
//           fontFamily: "Anton",
//           backgroundColor,
//           color: fontColor,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           fontSize: 60,
//           width: "100%",
//           height: "100%",
//           boxSizing: "border-box",
//         }}
//       >
//         <HeroImage />
//         {canLaunch ? (
//           <>
//             <div style={{ fontSize: 40, marginTop: 10 }}>
//               Registration will start immediately
//             </div>
//             <div style={{ fontSize: 40, marginTop: 10 }}>
//               Round 1 will start in ~30 minutes
//             </div>
//             <div style={{ fontSize: 40, marginTop: 10 }}>
//               Launch tournament below!
//             </div>
//           </>
//         ) : (
//             <>
//             <div style={{ fontSize: 40, marginTop: 10 }}>
//               Another tournament was recently launched
//             </div>
//             <div style={{ fontSize: 40, marginTop: 10 }}>
//               {`Please launch tournament in ${minutesUntilStart} minutes`}
//             </div>
//           </>
//         )}
//       </div>
//     ),
//     intents: [<Button>Launch Tournament</Button>],
//     title: `Rock Pepe Slizards`,
//   };
// };

export const createdGame = () => {
    return {
      image: (
        <div
          style={{
            fontFamily: "Anton",
            backgroundColor,
            color: fontColor,
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
              <div style={{ fontSize: 40, marginTop: 10 }}>
                Tournament created!
              </div>
        </div>
      ),
      title: `Rock Pepe Slizards`,
    };
  };

export const homeFrame = (gameId: string) => {
  return {
    action: `/game/${gameId}/play`,
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
        <div style={{ fontSize: 40, marginTop: 50 }}>Free to play</div>
        <div style={{ fontSize: 40 }}>{`Tournament #${gameId}`}</div>
      </div>
    ),
    intents: [
      <Button>Play</Button>,
      <Button.Link href={`https://rps-bracketer.vercel.app/bracket/${gameId}`}>
        Bracket
      </Button.Link>,
    ],
    title: `Rock Pepe Slizards`,
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
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          style={{ fontSize: 60, marginTop: 0 }}
        >{`Round ${roundNumber}`}</div>
        <div style={{ fontSize: 40, marginTop: 30 }}>{`${profileName}`}</div>
        <div style={{ fontSize: 40, marginTop: 0 }}>{`vs`}</div>
        <div style={{ fontSize: 40, marginTop: 0 }}>{`${opponentName}`}</div>
        <div style={{ fontSize: 40, marginTop: 40 }}>{`Select your move`}</div>
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
            src="/rpsMoves.svg"
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
    title: `Rock Pepe Slizards`,
  };
};

export const played = (
  gameId: string,
  gameStartString: string,
  playerMove: string
) => {
  const now = new Date().getTime();
  const gameStartTime = new Date(gameStartString).getTime();
  const minutesUntilStart = Math.floor((gameStartTime - now) / (1000 * 60));
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
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
        <div style={{ fontSize: 30 }}>{`You played ${playerMove}!`}</div>
        <div style={{ fontSize: 30 }}>
          {`Next match in ${minutesUntilStart} minutes`}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://rps-bracketer.vercel.app/bracket/${gameId}`}>
        Bracket
      </Button.Link>,
    ],
    title: `Rock Pepe Slizards`,
  };
};

export const registrationNotStarted = () => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
    title: `Rock Pepe Slizards`,
  };
};

export const registrationFull = () => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          Registration is full
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          Please come back for the next game! 🙏
        </div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
  };
};

export const register = (gameId: string, userName: string) => {
  return {
    action: `/game/${gameId}/registered`,
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >{`Welcome ${userName}!`}</div>
        <div style={{ display: "flex", fontSize: 30 }}>
          Register below to play
        </div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
    intents: [<Button value="register">Register</Button>],
  };
};

export const registered = (gameId: string, gameStartString: string) => {
  const now = new Date().getTime();
  const gameStartTime = new Date(gameStartString).getTime();
  const minutesUntilStart = Math.floor((gameStartTime - now) / (1000 * 60));
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          You are registered 🎉
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 10,
          }}
        >{`The game starts in ${minutesUntilStart} minutes!`}</div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
  };
};

export const notRegistered = (gameId: string) => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          This tournament has already started
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          Please come back for the next one! 🙏
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://rps-bracketer.vercel.app/bracket/${gameId}`}>
        Bracket
      </Button.Link>,
    ],
    title: `Rock Pepe Slizards`,
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
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          {`Welcome to round 1 ${userName}!`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
          }}
        >
          {`You are matched up against ${opponentName}!`}
        </div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
    intents: [<Button value="play">Play</Button>],
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
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          {`Congratulations ${userName}!`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
          }}
        >
          {opponentName
            ? `You won your last match against ${opponentName}`
            : `You won your last match!`}
        </div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
    intents: [<Button value="play">Next Match</Button>],
  };
};

export const lost = (
  gameId: string,
  roundNumber: number,
  opponentName: string
) => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          ☹️
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
          }}
        >{`You lost in round ${roundNumber} to @${opponentName}`}</div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
          }}
        >
          Better luck next game!
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://rps-bracketer.vercel.app/bracket/${gameId}`}>
        Bracket
      </Button.Link>,
    ],
    title: `Rock Pepe Slizards`,
  };
};

export const notVerified = () => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          }}
        >
          ☹️
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 0,
          }}
        >
          FID verification failed
        </div>
      </div>
    ),
    title: `Rock Pepe Slizards`,
  };
};

export const gameOver = (gameId: string, winnerName: string) => {
  return {
    image: (
      <div
        style={{
          fontFamily: "Anton",
          backgroundColor,
          color: fontColor,
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
          style={{ fontSize: 30, marginTop: "80px" }}
        >{`This tournament has ended`}</div>
        <div
          style={{ fontSize: 30, marginTop: "10px" }}
        >{`@${winnerName} won it all!`}</div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://rps-bracketer.vercel.app/bracket/${gameId}`}>
        Bracket
      </Button.Link>,
    ],
    title: `Rock Pepe Slizards`,
  };
};

const HeroImage = () => (
  <div
    style={{
      fontFamily: "Anton",
      backgroundColor,
      color: fontColor,
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
          width: "105%",
          height: "105%",
          objectFit: "contain",
          display: "block",
          flexShrink: 1,
          padding: "20px",
          marginLeft: "-10px",
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
          width: "108%",
          height: "108%",
          objectFit: "contain",
          display: "block",
          flexShrink: 1,
          padding: "40px",
          marginTop: "30px",
          marginLeft: "-10px",
        }}
      />
    </div>
  </div>
);
