import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [fly, setFly] = useState(false);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [final, setFinal] = useState(false);

  // 🎉 Confetti on page 2
  useEffect(() => {
    if (page === 2) {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [page]);

  // 🎵 Page 4 animation FIXED
  const lines = [
    "Hey Meri Nainu…",
    "I need you to know how much you matter to me.",
    "How much I value you in my life",
    "I really am not able to show it much but its a never ending and forvever lasting care that I will have for you.",
    "I was never this excited…for someone else's birthday.",
    "Not even mine kasam se. But yeah, you are special Naina.",
    "You came into my life when I needed someone and helped,",
    "In ways I didn't even know I needed without ever making me feel like a burden.",
    "Thank you so much for that.",
    "Thank you for always being there NAINU.",
    "Happiest of Birthdays to you Naina.",
    "(Please don't mind the song, it just vibes with your behaviour [I think so])",
  ];

useEffect(() => {
  if (page === 4 && start) {
    let i = 0;

    setIndex(0);

    const interval = setInterval(() => {
      i++;

      if (i < lines.length) {
        setIndex(i);
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }
}, [page, start]);

  const handleMove = (e) => {
  const koalas = document.querySelectorAll(".koala");

  koalas.forEach((k) => {
    const rect = k.getBoundingClientRect();

    const koalaX = rect.left + rect.width / 2;
    const koalaY = rect.top + rect.height / 2;

    const dx = koalaX - e.clientX;
    const dy = koalaY - e.clientY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const threshold = 120;

    if (distance < threshold) {
      const force = (threshold - distance) / threshold;

      const moveX = (dx / distance) * force * 60;
      const moveY = (dy / distance) * force * 60;

      k.style.setProperty("--x", `${moveX}px`);
      k.style.setProperty("--y", `${moveY}px`);
    } else {
      k.style.setProperty("--x", `0px`);
      k.style.setProperty("--y", `0px`);
    }
  });
};

  const moveNo = (e) => {
    const btn = e.target;

    btn.style.position = "fixed";
    btn.style.top = Math.random() * 80 + "vh";
    btn.style.left = Math.random() * 80 + "vw";
  };

  // ---------------- PAGE 1 ----------------
  if (page === 1) {
    return (
      <div className="page" onMouseMove={handleMove}>
        <div className="card">
          <h1>DO YOU WANT TO CONTINUE ?</h1>

          <div className="buttons">
            <button className="yes" onClick={() => setPage(2)}>
              YES
            </button>

            <button className="no" onClick={moveNo}>
              NO
            </button>
          </div>

          <p className="small">
            Please don’t say no….. (the button might have other plans anyway 🐨).
            I made it with all my heart (and obviously grinded my ass for it. Yeh meri experstise nai hai na 😔)
          </p>
        </div>

        {Array.from({ length: 120 }).map((_, i) => (
  <div
    key={i}
    className="koala"
    style={{
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      animationDuration: (4 + Math.random() * 4) + "s",
      animationDelay: Math.random() * 5 + "s",
      fontSize: (16 + Math.random() * 12) + "px"
    }}
  >
    🐨
  </div>
))}
      </div>
    );
  }

  // ---------------- PAGE 2 ----------------
  if (page === 2) {
  return (
    <div className="page page2">

      <h1 className="title">
        I KNEW YOU WOULDN’T SAY NO 😏
        (Please scroll thoda down)
      </h1>

      <img
        src={process.env.PUBLIC_URL + "/shoaib.JPG"}
        alt="memory"
        className="image"
      />

      <p className="subtitle">
        Chalo fir, let’s continue
      </p>

      <button
        className={`plane ${fly ? "fly" : ""}`}
        onClick={() => {
          setFly(true);
          setTimeout(() => {
            setPage(3);
            setFly(false);
          }, 800);
        }}
      >
        ✈️
      </button>

    </div>
  );
}

  // ---------------- PAGE 3 ----------------
  if (page === 3) {
    return (
      <div className="page spain">
        <div className="card">
          <h1>Happy Birthday Meri Spain Fanatic</h1>
          <p>
            I hope all your wishes come true……no matter how big or small they are.
            <br />
            I wish you are always surrounded by people you love and cherish Nainu.
            And you never face anything alone. I am always going to be there for you.
            No matter what happens to anyone in the world. I will never change and never leave your side.
          </p>
        </div>

        <button onClick={() => setPage(4)}>🐨🇪🇸</button>

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          >
            ✨
          </div>
        ))}
      </div>
    );
  }

  // ---------------- PAGE 4 ----------------
  if (page === 4) {
    return (
      <div className="page music">

        {!start && (
          <button
            className="start-btn"
            onClick={() => {
              setStart(true);
              setIndex(0); // ✅ IMPORTANT
            }}
          >
            Tap to start ✨✨
          </button>
        )}

        {start && (
          <>
            <audio autoPlay loop>
              <source src="/music.mp3" type="audio/mpeg" />
            </audio>
            {Array.from({ length: 10 }).map((_, i) => (
  <div
    key={i}
    className="cloud"
    style={{
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      animationDelay: Math.random() * 10 + "s"
    }}
  />
))}

<div className="text-container">
  {start && lines[index] && (
    <p style={{ fontSize: "24px", color: "white" }}>
  {lines[index]}
</p>
  )}
</div>

            {index === lines.length - 1 && start && (
              <button
                className="next-btn"
                onClick={() => setPage(5)}
              >
                And lastly →
              </button>
            )}
          </>
        )}

      </div>
    );
  }
// ---------------- PAGE 5 ----------------
if (page === 5) {
  return (
    <div className="page final">

      {!final && (
        <>
          <p className="final-text">
            I am sorry, I am not sure if this reached your expectations but I promise I will get better overtime.
          </p>

          <button
            className="final-btn"
            onClick={() => setFinal(true)}
          >
            SHUT UP BUDHU, this is good enough.
          </button>
        </>
      )}

      {final && (
        <div className="final-message">
          <p>Again, Happy Birthday Nainu</p>
          <p>I really miss you a lot</p>
          <p>TE AMO NAINU ❤️</p>
        </div>
      )}

    </div>
  );
}
  return null;
}