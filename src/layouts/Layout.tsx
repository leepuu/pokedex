import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
export default function Layout() {
  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <div className={s.inner}>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
