import React from "react";
import PropTypes from "prop-types";
import s from "./Stats.module.scss";
interface StatProps {
  name?: string;
  baseStat?: number;
}
function StatName(name: string) {
  switch (name) {
    case "hp":
      return "HP";
    case "attack":
      return "ATK";
    case "defense":
      return "DEF";
    case "special-attack":
      return "S.ATK";
    case "special-defense":
      return "S.DEF";
    case "speed":
      return "SPD";
    default:
      return "";
  }
}

export default function StatsItem(props: StatProps) {
  const { name, baseStat } = props;
  return (
    <div className={s.stat}>
      <strong className={s.title}>{StatName(name!)}</strong>
      <span className={s.num}>{baseStat}</span>
      <div className={s.progress_bar}>
        <span className={s.bar} style={{ width: `${baseStat}%` }}></span>
      </div>
    </div>
  );
}

StatsItem.propTypes = {
  name: PropTypes.string,
  baseStat: PropTypes.number,
};
