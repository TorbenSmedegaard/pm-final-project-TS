import React, { useEffect, useMemo, useRef, useState } from "react";
import { SPOTLIGHT_COLLECTION, ALGORITHMIC_RAILS } from "./data";

const SPOTLIGHT_SOURCE = "spotlight";

// Duplicate guard (edge case): only unique curated ids/titles may enter the rail.
function dedupe(collection) {
  const seenId = new Set();
  const seenTitle = new Set();
  return collection.filter((item) => {
    const titleKey = item.title.trim().toLowerCase();
    if (seenId.has(item.id) || seenTitle.has(titleKey)) return false;
    seenId.add(item.id);
    seenTitle.add(titleKey);
    return true;
  });
}

function Artwork({ item, size }) {
  const [failed, setFailed] = useState(false);
  // Missing artwork edge case: no src, or a load failure, falls back to placeholder art.
  if (!item.artworkUrl || failed) {
    return (
      <div className={`art art-${size} art-placeholder`} style={{ background: item.tone }}>
        <span className="art-mark">{item.title.slice(0, 1)}</span>
        {failed && <span className="art-fallback-label">Artwork unavailable</span>}
      </div>
    );
  }
  return (
    <img
      className={`art art-${size}`}
      src={item.artworkUrl}
      alt={item.title}
      onError={() => setFailed(true)}
    />
  );
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home | detail | playback
  const [selected, setSelected] = useState(null);
  const [discoverySource, setDiscoverySource] = useState(null);
  const [events, setEvents] = useState([]);
  const [collectionState, setCollectionState] = useState("loaded"); // loaded | empty | failed
  const [showAnalytics, setShowAnalytics] = useState(true);
  const railRef = useRef(null);
  const sentinelRef = useRef(null);
  const impressionSent = useRef(false);

  // FR2 / safety guard: Spotlight renders only from the editorial collection.
  // Empty or failed collection states both resolve to "no rail", never an error state.
  const spotlightTitles = useMemo(
    () => (collectionState === "loaded" ? dedupe(SPOTLIGHT_COLLECTION).slice(0, 20) : []),
    [collectionState]
  );
  const spotlightVisible = spotlightTitles.length >= 10;

  function track(type, payload = {}) {
    setEvents((prev) => [
      ...prev,
      {
        seq: prev.length + 1,
        type,
        source: SPOTLIGHT_SOURCE,
        at: new Date().toLocaleTimeString([], { hour12: false }),
        ...payload,
      },
    ]);
  }

  // FR5: record a Spotlight impression when the rail is actually viewed, once per session.
  useEffect(() => {
    if (!spotlightVisible || screen !== "home") return;
    const node = sentinelRef.current;
    if (!node || impressionSent.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !impressionSent.current) {
          impressionSent.current = true;
          track("spotlight_impression", { titlesVisible: spotlightTitles.length });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [spotlightVisible, screen, spotlightTitles.length]);

  function scrollRail(direction) {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  }

  // FR6: Spotlight click event, then navigate to title details.
  function openSpotlightTitle(item) {
    track("spotlight_title_click", { titleId: item.id, title: item.title });
    setSelected(item);
    setDiscoverySource(SPOTLIGHT_SOURCE);
    setScreen("detail");
  }

  // FR7 / FR8: playback start attributed to its discovery source.
  function startPlayback() {
    if (!selected) return;
    setEvents((prev) => [
      ...prev,
      {
        seq: prev.length + 1,
        type: "playback_start",
        source: discoverySource || "algorithmic",
        titleId: selected.id,
        title: selected.title,
        at: new Date().toLocaleTimeString([], { hour12: false }),
      },
    ]);
    setScreen("playback");
  }

  function backToHome() {
    setScreen("home");
    setSelected(null);
    setDiscoverySource(null);
  }

  const counts = useMemo(() => {
    const spotlight = events.filter((e) => e.source === SPOTLIGHT_SOURCE);
    return {
      impressions: spotlight.filter((e) => e.type === "spotlight_impression").length,
      clicks: spotlight.filter((e) => e.type === "spotlight_title_click").length,
      plays: spotlight.filter((e) => e.type === "playback_start").length,
      otherPlays: events.filter(
        (e) => e.type === "playback_start" && e.source !== SPOTLIGHT_SOURCE
      ).length,
    };
  }, [events]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">▶</span> StreamLine
        </div>
        <nav className="topnav">
          <button className="navlink active" onClick={backToHome}>
            Home
          </button>
          <span className="navlink">Series</span>
          <span className="navlink">Films</span>
          <span className="navlink">My List</span>
        </nav>
        <div className="topbar-right">
          <button className="ghost-btn" onClick={() => setShowAnalytics((v) => !v)}>
            {showAnalytics ? "Hide" : "Show"} event log
          </button>
          <div className="avatar" aria-hidden="true" />
        </div>
      </header>

      {screen === "home" && (
        <main className="page">
          {spotlightVisible ? (
            <section className="spotlight" ref={sentinelRef} aria-labelledby="spotlight-heading">
              <div className="spotlight-head">
                <div>
                  <span className="spotlight-tag">Spotlight · Editor picks</span>
                  <h1 id="spotlight-heading">Hand-picked by StreamLine editors</h1>
                  <p className="spotlight-intro">
                    A small, curated set — {spotlightTitles.length} titles, no algorithm. Reviewed
                    this week by our editorial team.
                  </p>
                </div>
                <div className="rail-controls">
                  <button
                    className="rail-btn"
                    onClick={() => scrollRail(-1)}
                    aria-label="Previous Spotlight titles"
                  >
                    ‹
                  </button>
                  <button
                    className="rail-btn"
                    onClick={() => scrollRail(1)}
                    aria-label="Next Spotlight titles"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="rail" ref={railRef}>
                {spotlightTitles.map((item) => (
                  <button
                    key={item.id}
                    className="card spotlight-card"
                    onClick={() => openSpotlightTitle(item)}
                  >
                    <Artwork item={item} size="card" />
                    {item.hiddenGem && <span className="gem-badge">Hidden Gem</span>}
                    <div className="card-body">
                      <span className="card-title">{item.title}</span>
                      <span className="card-meta">
                        {item.genre} · {item.year}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <div className="spotlight-absent">
              Spotlight is not available right now — the standard homepage continues below.
            </div>
          )}

          {ALGORITHMIC_RAILS.map((rail) => (
            <section className="algo-rail" key={rail.id}>
              <h2 className="algo-heading">{rail.label}</h2>
              <div className="rail rail-plain">
                {rail.titles.map((title) => (
                  <div className="card algo-card" key={title}>
                    <div className="art art-card art-algo">
                      <span className="art-mark">{title.slice(0, 1)}</span>
                    </div>
                    <div className="card-body">
                      <span className="card-title">{title}</span>
                      <span className="card-meta">Recommended for you</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      {screen === "detail" && selected && (
        <main className="page detail">
          <button className="back-btn" onClick={backToHome}>
            ‹ Back to home
          </button>
          <div className="detail-grid">
            <Artwork item={selected} size="hero" />
            <div className="detail-copy">
              {discoverySource === SPOTLIGHT_SOURCE && (
                <span className="attribution">From Spotlight · Editor pick</span>
              )}
              <h1>{selected.title}</h1>
              <p className="detail-meta">
                {selected.year} · {selected.runtime} · {selected.genre}
                {selected.hiddenGem ? " · Hidden Gem" : ""}
              </p>
              <p className="synopsis">{selected.synopsis}</p>
              <div className="cta-row">
                <button className="play-btn" onClick={startPlayback}>
                  ▶ Play
                </button>
                <button className="ghost-btn" onClick={backToHome}>
                  Back to Spotlight
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {screen === "playback" && selected && (
        <main className="page playback">
          <div className="player">
            <div className="player-stage" style={{ background: selected.tone }}>
              <span className="player-live">● Now playing</span>
            </div>
            <div className="player-copy">
              <span className="attribution">Playback attributed to Spotlight</span>
              <h1>{selected.title}</h1>
              <p className="synopsis">Playback started. Discovery source: {discoverySource}.</p>
              <div className="cta-row">
                <button className="play-btn" onClick={backToHome}>
                  Back to home
                </button>
                <button className="ghost-btn" onClick={() => setScreen("detail")}>
                  Title details
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {showAnalytics && (
        <aside className="analytics">
          <div className="analytics-head">
            <h2>Spotlight instrumentation</h2>
            <span className="analytics-note">Local prototype state only</span>
          </div>
          <div className="metric-grid">
            <div className="metric">
              <span className="metric-value">{counts.impressions}</span>
              <span className="metric-label">Impressions</span>
            </div>
            <div className="metric">
              <span className="metric-value">{counts.clicks}</span>
              <span className="metric-label">Title clicks</span>
            </div>
            <div className="metric">
              <span className="metric-value">{counts.plays}</span>
              <span className="metric-label">Spotlight plays</span>
            </div>
            <div className="metric">
              <span className="metric-value">{counts.otherPlays}</span>
              <span className="metric-label">Other-source plays</span>
            </div>
          </div>

          <div className="state-switch">
            <span className="state-label">Spotlight collection state</span>
            <div className="state-buttons">
              {[
                ["loaded", "Loaded"],
                ["empty", "Empty"],
                ["failed", "Load failed"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={`state-btn ${collectionState === value ? "on" : ""}`}
                  onClick={() => {
                    setCollectionState(value);
                    backToHome();
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ol className="event-log">
            {events.length === 0 && <li className="event empty">No events recorded yet.</li>}
            {[...events].reverse().map((e) => (
              <li className="event" key={e.seq}>
                <span className="event-type">{e.type}</span>
                <span className="event-detail">
                  {e.title ? `${e.title} · ` : ""}source={e.source} · {e.at}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      )}
    </div>
  );
}
