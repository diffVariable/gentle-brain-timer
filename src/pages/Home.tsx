import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.css";
import SparkleCanvas from "../components/SparkleCanvas";
import Brain from "../components/Brain";
import { PRESET_TIMERS } from "../constants";

const Home = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const clockLabel = `${minutes}:${String(seconds).padStart(2, "0")}`;

  const startTimer = () => {
    navigate(
      `/timer?${hours !== 0 ? "h=" + hours : ""}m=${minutes}&s=${seconds}`,
    );
  };

  const pickPreset = (m: number, s: number, h = 0) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    navigate(`/timer?${h !== 0 ? "h=" + h : ""}m=${m}&s=${s}`);
  };

  return (
    <div className={styles.page}>
      <SparkleCanvas />
      <div className={styles.heroContent}>
        <div className={styles.brainWrap}>
          <Brain clockLabel={clockLabel} size={200} />
        </div>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Gentle Brain Timer</h1>
          <p className={styles.subtitle}>Timer for focus, study & chill</p>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Hours</label>
              <input
                type="number"
                min={0}
                max={99}
                value={hours}
                onChange={(e) =>
                  setHours(Math.max(0, Math.min(99, +e.target.value)))
                }
                className={styles.numInput}
              />
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.inputGroup}>
              <label>Minutes</label>
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(0, Math.min(99, +e.target.value)))
                }
                className={styles.numInput}
              />
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.inputGroup}>
              <label>Seconds</label>
              <input
                type="number"
                min={0}
                max={59}
                value={seconds}
                onChange={(e) =>
                  setSeconds(Math.max(0, Math.min(59, +e.target.value)))
                }
                className={styles.numInput}
              />
            </div>
            <button className={styles.startBtn} onClick={startTimer}>
              Start ▶
            </button>
          </div>

          <div className={styles.presets}>
            {PRESET_TIMERS.map((p) => (
              <button
                key={p.label}
                className={styles.presetBtn}
                onClick={() => pickPreset(p.minutes, p.seconds, p.hours)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
