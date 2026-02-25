import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="card">
        <h1 className="h1">Try Before You Install</h1>
        <p className="p">
          OPENOS lets you explore Linux distributions safely from the browser.
          No installation, no system changes, and no risk to your personal device.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          <Link className="btn" to="/signup">Launch Demo</Link>
          <Link className="btn secondary" to="/about">Learn More</Link>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 className="sectionTitle">Popular Distributions</h2>
        <p className="p muted" style={{ marginTop: 0 }}>
          Choose a path based on your experience level.
        </p>

        <div className="row" style={{ marginTop: 10 }}>
          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Linux_Mint_logo_without_wordmark.svg"
              alt="Linux Mint"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Beginner</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Linux Mint</h2>
              <p className="p">Friendly entry point for new users.</p>
            </div>
          </div>

          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg"
              alt="Ubuntu"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Intermediate</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Ubuntu</h2>
              <p className="p">General-purpose distro with huge community support.</p>
            </div>
          </div>

          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Arch_Linux_%22Crystal%22_icon.svg/3840px-Arch_Linux_%22Crystal%22_icon.svg.png"
              alt="Arch Linux"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Advanced</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Arch Linux</h2>
              <p className="p">Powerful and customizable for experienced users.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <h2 className="sectionTitle">Eco-Friendly Learning</h2>
        <p className="p muted" style={{ marginTop: 0 }}>
          Learn efficiently and reduce waste by testing first.
        </p>

        <div className="row" style={{ marginTop: 10 }}>
          <div className="card featureCard">
            <div className="emojiIcon">🌱</div>
            <div>
              <div className="badge">Less Waste</div>
              <h3 className="h2" style={{ marginTop: 10, fontSize: 18 }}>Reduce e-waste</h3>
              <p className="p">
                Test distributions without reinstalling or swapping hardware.
              </p>
            </div>
          </div>

          <div className="card featureCard">
            <div className="emojiIcon">⚡</div>
            <div>
              <div className="badge">Smarter Testing</div>
              <h3 className="h2" style={{ marginTop: 10, fontSize: 18 }}>Save time and energy</h3>
              <p className="p">
                Compare options quickly, then install only what fits your needs.
              </p>
            </div>
          </div>

          <div className="card featureCard">
            <div className="emojiIcon">🖥️</div>
            <div>
              <div className="badge">Confidence</div>
              <h3 className="h2" style={{ marginTop: 10, fontSize: 18 }}>Learn by doing</h3>
              <p className="p">
                Explore the desktop and tools before making a permanent change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}