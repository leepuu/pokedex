import { usePokemonAbility } from "hooks/usePokemon";
import { AbilitesType, NameType } from "types/api";
import s from "./About.module.scss";
interface AboutProps {
  genus?: string;
  height?: number;
  weight?: number;
  abilities?: AbilitesType;
  species?: string;
}
export default function About(props: AboutProps) {
  const { genus, height, weight, abilities, species } = props;
  const name = abilities?.ability?.name;
  const { data: pokemonAbility } = usePokemonAbility(name!);

  return (
    <>
      {pokemonAbility && (
        <>
          <dl className={s.list_info}>
            <div className={s.item}>
              <dt className={s.title}>Genus</dt>
              <dd className={s.desc}>{genus?.slice(0, -3)}</dd>
            </div>
            <div className={s.item}>
              <dt className={s.title}>Height</dt>
              <dd className={s.desc}>{height}m</dd>
            </div>
            <div className={s.item}>
              <dt className={s.title}>Weight</dt>
              <dd className={s.desc}>{weight}kg</dd>
            </div>
            <div className={s.item}>
              <dt className={s.title}>ability</dt>
              <dd className={s.desc}>
                {
                  pokemonAbility.names.filter((item: NameType) => item.language?.name == "ko")[0]
                    .name
                }
              </dd>
            </div>
          </dl>
          <strong className={s.title}>Species</strong>
          <p className={s.desc}>{species}</p>
        </>
      )}
    </>
  );
}
