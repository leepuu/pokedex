import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "assets/images/logo.png";

export default function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.logo}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </h1>
    </header>
  );
}
