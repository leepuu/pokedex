import { useState } from "react";
import s from "assets/styles/pages/Detail.module.scss";
import KeyVisual from "components/KeyVisual";
import { usePokemon, usePokemonSpecies } from "hooks/usePokemon";
import { useParams } from "react-router-dom";
import cx from "classnames";
import { GenusType, NameType, SpeciesType } from "types/api";
import About from "components/About";
import Stats from "components/Stats";
import Evolution from "components/Evolution";
import Loading from "components/Loading";

export default function Detail() {
  const { pokemonName } = useParams();
  const [tab, setTab] = useState<string>("about");

  const { data: pokemon, isLoading } = usePokemon(pokemonName!);
  const { data: pokemonSpecies } = usePokemonSpecies(pokemonName!);

  return (
    <>
      {isLoading ? (
        <div className={s.loading}>
          <Loading />
        </div>
      ) : (
        pokemon &&
        pokemonSpecies && (
          <div className={cx(s.wrap, s[pokemonSpecies.color.name])}>
            <div className={s.inner}>
              <KeyVisual
                id={pokemon.id}
                koName={
                  pokemonSpecies.names.filter((item: NameType) => item.language?.name == "ko")[0]
                    .name
                }
                enName={pokemon.name}
                types={pokemon.types}
              />
              <div className={s.tab_list}>
                <button
                  className={cx(s.tab, tab == "about" && s.is_active)}
                  type="button"
                  onClick={() => setTab("about")}
                >
                  About
                </button>
                <button
                  className={cx(s.tab, tab == "stats" && s.is_active)}
                  type="button"
                  onClick={() => setTab("stats")}
                >
                  Stats
                </button>
                <button
                  className={cx(s.tab, tab == "evolution" && s.is_active)}
                  type="button"
                  onClick={() => setTab("evolution")}
                >
                  Evolution
                </button>
              </div>
              <div className={s.tab_content}>
                {tab == "about" ? (
                  <About
                    genus={
                      pokemonSpecies.genera.filter(
                        (item: GenusType) => item.language?.name == "ko"
                      )[0].genus
                    }
                    height={pokemon.height}
                    weight={pokemon.weight}
                    abilities={pokemon.abilities[0]}
                    species={
                      pokemonSpecies.flavor_text_entries.filter(
                        (item: SpeciesType) =>
                          item.language?.name == "ko" && item.version?.name == "y"
                      )[0].flavor_text
                    }
                  />
                ) : tab == "stats" ? (
                  <Stats stats={pokemon.stats} />
                ) : tab == "evolution" ? (
                  <Evolution url={pokemonSpecies.evolution_chain.url} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
