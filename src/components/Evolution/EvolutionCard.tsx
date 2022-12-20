import { Link } from "react-router-dom";
import s from "./Evolution.module.scss";
import { usePokemonSpecies } from "hooks/usePokemon";
import { NameType } from "types/api";

interface CardProps {
  name?: string;
}

export default function EvolutionCard(props: CardProps) {
  const { name } = props;
  const { data: pokemonSpecies } = usePokemonSpecies(name!);

  return (
    <>
      {pokemonSpecies && (
        <Link to={`/pokemon/${name}`} className={s.item}>
          <div className={s.thumb}>
            <img
              src={`${process.env.REACT_APP_POKEMON_IMAGE_URL}${pokemonSpecies.id}.png`}
              alt={name}
            />
          </div>
          <strong className={s.name}>
            {pokemonSpecies.names.filter((item: NameType) => item.language?.name == "ko")[0].name}
          </strong>
        </Link>
      )}
    </>
  );
}
