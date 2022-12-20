import { StatsType } from "types/api";
import s from "./Stats.module.scss";
import StatsItem from "./StatsItem";
interface StatsProps {
  stats?: StatsType[];
}
export default function Stats(props: StatsProps) {
  const { stats } = props;
  return (
    <div className={s.stats}>
      {stats?.map((item, index) => (
        <StatsItem key={index} name={item.stat?.name} baseStat={item.base_stat} />
      ))}
    </div>
  );
}
