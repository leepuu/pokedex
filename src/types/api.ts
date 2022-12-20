export interface NameType {
  language?: {
    name?: string;
  };
  name?: string;
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface TabType {
  text?: string;
}

export interface GenusType {
  genus?: string;
  language?: {
    name?: string;
  };
}

export interface AbilityType {
  name?: string;
  url?: string;
}

export interface AbilitesType {
  ability?: AbilityType;
  is_hidden: boolean;
  slot: number;
}

export interface SpeciesType {
  flavor_text?: string;
  language?: {
    name?: string;
    url?: string;
  };
  version?: {
    name?: string;
    url?: string;
  };
}

export interface StatsType {
  base_stat?: number;
  effort?: number;
  stat?: {
    name?: string;
    url?: string;
  };
}
