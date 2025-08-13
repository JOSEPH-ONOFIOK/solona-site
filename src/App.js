// src/CuteHackedLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import bannerImage from "./banner.jpeg";

export default function CuteHackedLanding() {
  const [shaking, setShaking] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [clickedSteps, setClickedSteps] = useState([]); // Track clicked steps
  const [showModal, setShowModal] = useState(false); // Modal state
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

  // Trigger shake/glitch animation
  function triggerHack() {
    setShaking(true);
    setGlitching(true);
    setTimeout(() => setShaking(false), 2200);
    setTimeout(() => setGlitching(false), 2400);
  }

  // Steps to complete
  const steps = [
    { title: "Follow + turn on notis", btn: "Follow" },
    { title: "retweet + like", btn: "Like + RT" },
    { title: "Submit SOL wallet on this", btn: "Submit post" },
  ];

  // Handle clicking on step buttons
  const handleStepClick = (title) => {
    if (!clickedSteps.includes(title)) {
      const updatedSteps = [...clickedSteps, title];
      setClickedSteps(updatedSteps);

      // If all steps clicked, show modal
      if (updatedSteps.length === steps.length) {
        setTimeout(() => {
          setShowModal(true);
        }, 500);
      }
    }

    redirectToTwitter();
  };

  // Open Twitter link
  const redirectToTwitter = () => {
    window.open("https://x.com/mofoxyz?s=11", "_blank");
  };

  return (
    <div className={`cute-container ${shaking ? "shake" : ""}`}>
      {/* Background overlay */}
      <div
        className={`cute-bg ${shaking ? "shake" : ""}`}
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
  const tweet = "I think I've been infected by this retarted MOFO ART. who knows, I may have just made the mofolist, get yours punk"
  await postTweet(tweet)
}

infect().then(() => console.log('you"ve been MOFO hacked'))`}
        </pre>

        {/* Steps list */}
        <div className="steps">
          {steps.map((s) => (
            <div
              key={s.title}
              className={`step ${clickedSteps.includes(s.title) ? "done" : ""}`}
            >
              <div className="step-title">
                {s.title}{" "}
                {clickedSteps.includes(s.title) && (
                  <span className="checkmark">✔</span>
                )}
              </div>
              <button
                onClick={() => handleStepClick(s.title)}
                disabled={clickedSteps.includes(s.title)}
              >
                {s.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              you may have successfully been white listed mofo
            </h2>
            <div className="final-message">
              you a <span className="pink">SICKO</span> 💋💋
            </div>
            <div className="controls">
              <button onClick={redirectToTwitter}>Go to Twitter</button>
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
