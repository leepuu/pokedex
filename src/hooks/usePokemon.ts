import { useQuery } from "@tanstack/react-query";
import axios from "utils/axios";

async function getPokemon(name: string) {
  const res = await axios.get(`/pokemon/${name}`);
  if (res.status < 200 && res.status >= 300) {
    throw new Error("Pokemon Not Found");
  }
  return res.data;
}

async function getPokemonSpecies(name: string | number) {
  const res = await axios.get(`/pokemon-species/${name}`);
  if (res.status < 200 && res.status >= 300) {
    throw new Error("Pokemon Detail Not Found");
  }
  return res.data;
}
async function getPokemonAbility(name: string) {
  const res = await axios.get(`/ability/${name}`);
  if (res.status < 200 && res.status >= 300) {
    throw new Error("Pokemon Ability Not Found");
  }
  return res.data;
}

async function getPokemonEvloution(url: string) {
  const res = await axios.get(`/${url}`);
  if (res.status < 200 && res.status >= 300) {
    throw new Error("Pokemon Ability Not Found");
  }
  return res.data;
}

export function usePokemon(name: string) {
  return useQuery(["pokemon", name], () => getPokemon(name));
}

export function usePokemonSpecies(name: string | number) {
  return useQuery(["pokemon-species", name], () => getPokemonSpecies(name));
}

export function usePokemonAbility(name: string) {
  return useQuery(["ability", name], () => getPokemonAbility(name));
}

export function PokemonEvloution(url: string) {
  return useQuery(["evolution", url], () => getPokemonEvloution(url));
}
