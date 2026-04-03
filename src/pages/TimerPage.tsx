import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Brain from "../components/Brain";
import SparkleCanvas from "../components/SparkleCanvas";
import styles from "./styles/TimerPage.module.css";
import { playDoneAlarm } from "../utils";

const TimerPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const seconds = +(params.get("s") ?? 0);
  const minutesInSecs = +(params.get("m") ?? 0) * 60;
  const hoursInSecs = +(params.get("h") ?? 0) * 60 * 60;
  const totalSeconds = Math.max(1, seconds + minutesInSecs + hoursInSecs);

  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmPlayed = useRef(false);

  const hh = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const mm = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const clockLabel = `${hh !== "00" ? hh + ":" : ""}${mm}:${ss}`;
  const progress = 1 - remaining / totalSeconds;

  useEffect(() => {
    setRemaining(totalSeconds);
    setRunning(true);
    alarmPlayed.current = false;
  }, [totalSeconds]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (remaining === 0 && running) {
      setRunning(false);
    }
  }, [remaining, running]);

  useEffect(() => {
    if (remaining === 0 && !alarmPlayed.current) {
      alarmPlayed.current = true;
      playDoneAlarm();
    }
  }, [remaining]);

  const handleToggle = () => {
    if (remaining <= 0) return;
    setRunning((r) => !r);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRemaining(totalSeconds);
    setRunning(false);
    alarmPlayed.current = false;
  };

  const done = remaining === 0;

  return (
    <div className={styles.page}>
      <SparkleCanvas />

      <div className={styles.content}>
        <div className={`${styles.brainWrap} ${done ? styles.celebrate : ""}`}>
          <Brain clockLabel={done ? "0:00" : clockLabel} size={220} />
        </div>

        <div className={styles.timeDisplay}>
          <span className={styles.digits}>
            {hh !== "00" && (
              <>
                {hh}
                <span
                  className={styles.colon}
                  style={{ opacity: running && remaining % 2 === 0 ? 1 : 0.2 }}
                >
                  :
                </span>
              </>
            )}
            {mm}
            <span
              className={styles.colon}
              style={{ opacity: running && remaining % 2 === 0 ? 1 : 0.2 }}
            >
              :
            </span>
            {ss}
          </span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {done ? (
          <div className={styles.doneMsg}>
            <span>🎉</span> Time's up! Great job~
          </div>
        ) : null}

        <div className={styles.controls}>
          <button className={styles.ctrlBtn} onClick={handleToggle}>
            {running ? "⏸ Pause" : "▶ Resume"}
          </button>
          <button className={styles.ctrlBtn} onClick={handleReset}>
            ↺ Reset
          </button>
          <button
            className={`${styles.ctrlBtn} ${styles.backBtn}`}
            onClick={() => navigate("/")}
          >
            ← New Timer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
