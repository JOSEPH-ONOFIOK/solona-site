// src/CuteHackedLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import bannerImage from "./banner.jpeg";

export default function CuteHackedLanding() {
  const [stage, setStage] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [sol, setSol] = useState("");
  const [posted, setPosted] = useState(false);
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

  function nextStage() {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 900);
    setStage((s) => Math.min(4, s + 1));
  }

  function prevStage() {
    setStage((s) => Math.max(0, s - 1));
  }

  function submitPost() {
    setPosted(true);
    nextStage();
  }

  function submitSol() {
    if (!sol || sol.length < 32) {
      alert("Please enter a valid Solana address");
      return;
    }
    nextStage();
  }

  const steps = [
    { title: "Follow + turn on notis", btn: "Follow" },
    { title: "Like + RT", btn: "Like + RT" },
    { title: "Make post", btn: "Prepare tweet" },
    { title: "Submit post", btn: "Submit post" },
    { title: "Submit SOL addy", btn: "Submit" },
  ];

  return (
    <div className={`cute-container ${shaking ? "shake" : ""}`}>
      {/* Background overlay */}
      <div
        className={`cute-bg ${shaking ? "shake" : ""}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1950&q=80')",
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
          You've been <span className="pink">cutely hacked</span>..
        </h1>
        <p className="subtitle">(remember the name: cutie) Pls click me</p>

        <pre className="code-box" onClick={triggerHack}>
{`// boot sequence: csrf=♥
import { follow, like, retweet, postTweet } from 'cute-retard-art'

async function infect() {
  await follow('@ProjectCutie')
  await likeAndRT(latest)
  const tweet = "I think I've been infected by this cute retarded art. who knows, I might have just gotten a wl, go get yours here -> <link>"
  await postTweet(tweet)
}

infect().then(() => console.log('you are adorable'))`}
        </pre>

        <div className="steps">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`step ${i === stage ? "active" : ""}`}
            >
              <div className="step-title">
                Step {i + 1}: {s.title}
              </div>
              {i < 2 && (
                <button onClick={() => i === stage && nextStage()}>
                  {s.btn}
                </button>
              )}
              {i === 2 && (
                <>
                  <textarea defaultValue={`I think I've been infected by this cute retarded art. who knows, I might have just gotten a wl, go get yours here -> https://example.com/wl`} />
                  <button
                    onClick={() => {
                      setPosted(false);
                      nextStage();
                    }}
                  >
                    Prepare
                  </button>
                </>
              )}
              {i === 3 && (
                <>
                  <div className="preview">
                    I think I've been infected by this cute retarded art. who
                    knows, I might have just gotten a wl, go get yours here -{" "}
                    https://example.com/wl
                  </div>
                  <button onClick={submitPost}>Submit post</button>
                </>
              )}
              {i === 4 && (
                <>
                  <input
                    value={sol}
                    onChange={(e) => setSol(e.target.value)}
                    placeholder="Your SOL public address"
                  />
                  <button onClick={submitSol}>Submit</button>
                </>
              )}
            </div>
          ))}
        </div>

        {stage === 4 && (
          <div className="final-message">
            you are <span className="pink">cuteeeee</span> 💋💋
          </div>
        )}

        <div className="controls">
          <button onClick={prevStage}>Back</button>
          <button onClick={() => setStage(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
}
