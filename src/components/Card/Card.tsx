import { Link } from "react-router-dom";
import s from "./Card.module.scss";
import Color from "color-thief-react";
import { usePokemonSpecies } from "hooks/usePokemon";
import { NameType } from "types/api";

interface CardProps {
  name?: string | number;
}

export default function Card(props: CardProps) {
  const { name } = props;
  const { data: pokemonSpecies } = usePokemonSpecies(name!);

  return (
    <div className={s.card}>
      {pokemonSpecies && (
        <Color
          src={`${process.env.REACT_APP_POKEMON_IMAGE_URL}${pokemonSpecies.id}.png`}
          crossOrigin="anonymous"
          format="hex"
        >
          {({ data }) => (
            <Link to={`/pokemon/${name}`} className={s.link} style={{ background: data }}>
              <img
                src={`${process.env.REACT_APP_POKEMON_IMAGE_URL}${pokemonSpecies.id}.png`}
                alt={pokemonSpecies.name}
              />
              <strong className={s.name}>
                {
                  pokemonSpecies.names.filter((item: NameType) => item.language?.name == "ko")[0]
                    .name
                }
              </strong>
              <span className={s.num}>{pokemonSpecies.id.toString().padStart(3, "0")}</span>
            </Link>
          )}
        </Color>
      )}
    </div>
  );
}
