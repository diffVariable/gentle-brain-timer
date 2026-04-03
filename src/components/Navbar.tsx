import { Link, useLocation } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        {pathname !== "/" && (
          <Link to="/" className={styles.link}>
            New Timer
          </Link>
        )}
        <a
          href="https://youtube.com/@GentleBrainTimer"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ytBtn}
        >
          ▶ Subscribe
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
