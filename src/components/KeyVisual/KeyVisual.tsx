import Icon from "./Icon";
import s from "./KeyVisual.module.scss";
import { Type } from "types/api";

interface PokemonProps {
  id?: number;
  koName?: string;
  enName?: string;
  types?: Type[];
}

export default function KeyVisual(props: PokemonProps) {
  const { id, koName, enName, types } = props;

  return (
    <div className={s.wrap}>
      <div className={s.ko_name}>
        <span className={s.num}>#{id?.toString().padStart(3, "0")}</span>
        {koName}
      </div>
      <div className={s.box_thumb}>
        <p className={s.en_name}>{enName}</p>
        <div className={s.box_type}>
          {types?.map((item: Type, index: number) => (
            <div key={index} className={s.type}>
              <Icon name={item.type.name} />
              <span className="blind">{item.type.name}</span>
            </div>
          ))}
        </div>
        <div className={s.thumb}>
          <img src={`${process.env.REACT_APP_POKEMON_IMAGE_URL}${id}.png`} alt="" />
        </div>
      </div>
    </div>
  );
}
