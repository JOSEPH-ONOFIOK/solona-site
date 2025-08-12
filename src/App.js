// src/CuteHackedLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import bannerImage from "./banner.jpeg";

export default function CuteHackedLanding() {
  const [shaking, setShaking] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const canvasRef = useRef(null);

  // Binary rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.random() * h);
    const binary = ["0", "1"];
    let raf;

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#00ff99";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        ctx.fillText(text, i * fontSize, drops[i]);
        if (drops[i] > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += fontSize;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function triggerHack() {
    setShaking(true);
    setGlitching(true);
    setTimeout(() => setShaking(false), 2200);
    setTimeout(() => setGlitching(false), 2400);
  }

  const steps = [
    { title: "Follow + turn on notis", btn: "Follow" },
    { title: "retweet + like", btn: "Like + RT" },
    // { title: "Make post", btn: "Prepare tweet" },
    { title: "Submit SOL wallet on this", btn: "Submit post" },
  ];

  const redirectToTwitter = () => {
    window.open("https://twitter.com", "_blank");
  };

  return (
    <div className={`cute-container ${shaking ? "shake" : ""}`}>
      {/* Background overlay */}
      <div
        className={`cute-bg ${shaking ? "shake" : ""}`}
        style={{
          backgroundImage:
            "",
        }}
        onClick={triggerHack}
      />

      {/* Binary canvas */}
      <canvas ref={canvasRef} className="binary-canvas" />

      {/* Banner image */}
      <div className="cute-banner">
        <img src={bannerImage} alt="Banner" />
      </div>

      {/* Main panel */}
      <div className={`cute-panel ${glitching ? "glitch" : ""}`}>
        <h1>
          You've been <span className="pink">hacked MOFO</span>..
        </h1>
        <p className="subtitle">(remember the name: MOFO) Pls click me</p>

        <pre className="code-box" onClick={triggerHack}>
{`// boot sequence: csrf=♥
import { follow, like, retweet, postTweet } from 'MOFO-retard-art'

async function infect() {
  await follow('@ProjectMofo')
  await likeAndRT(latest)
  const tweet = "I think I've been infected by this retarted MOFO ART. who knows, I may  have just made the mofolist, get yours punk"
  await postTweet(tweet)
}

infect().then(() => console.log('you"ve been MOFO hacked'))`}
        </pre>

        <div className="steps">
          {steps.map((s) => (
            <div key={s.title} className="step active">
              <div className="step-title">{s.title}</div>
              <button onClick={redirectToTwitter}>{s.btn}</button>
            </div>
          ))}
        </div>

        <div className="final-message">
          you a <span className="pink">SICKO</span> 💋💋
        </div>

        <div className="controls">
          <button onClick={redirectToTwitter}>Go to Twitter</button>
        </div>
      </div>
    </div>
  );
}
