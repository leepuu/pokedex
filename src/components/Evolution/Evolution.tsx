import { useState, useEffect } from "react";
import { PokemonEvloution } from "hooks/usePokemon";
import s from "./Evolution.module.scss";
import EvolutionCard from "./EvolutionCard";
interface EvolutionProps {
  url?: string;
}

type EvolvesType = {
  [key: string]: string;
};

type ChainType = {
  name?: string;
  url?: string;
};

export default function Evolution(props: EvolutionProps) {
  const { url } = props;
  const regExr = /(evolution.*$)/gi;
  const match = url?.match(regExr);
  const matchUrl = match && match[0];
  const [chain, setChain] = useState<ChainType[]>([]);
  let evolvesTo;
  const { data: evolution } = PokemonEvloution(matchUrl!);

  useEffect(() => {
    if (evolution) {
      const { species, evolves_to } = evolution.chain;
      const pokemonFirst: ChainType = species;
      evolvesTo = evolves_to[0];

      setChain([pokemonFirst]);
      if (evolves_to.length > 1) {
        evolves_to.map((item: EvolvesType) => {
          const pokemonSecond = item;
          setChain((item) => [...item, { name: pokemonSecond.name }]);
        });
      } else {
        do {
          const pokemonSecond = evolvesTo.species;
          setChain((item) => [...item, { name: pokemonSecond.name }]);

          evolvesTo = evolvesTo.evolves_to[0];
        } while (!!evolvesTo && Object.prototype.hasOwnProperty.call(evolvesTo, "evolves_to"));
      }
    }
  }, [evolution]);
  return (
    <>
      {chain && (
        <div className={s.evolution}>
          {chain.map((item: ChainType, index: number) => (
            <EvolutionCard name={item.name} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
