import pokemons from '../data';

const getRegex = (pattern) => new RegExp(pattern, 'i');
const pokemonsDisplayed = (pokemon) => {
  const { name, type, averageWeight, image } = pokemon;
  const { value, measurementUnit } = averageWeight
  
  const pokemonObj = {
    name: getRegex(name),
    type: getRegex(type),
    averageWeight: getRegex(`average weight: ${value} ${measurementUnit}`),
    img: getRegex(`${name} sprite`),
    imgSrc: image,
  }

  return pokemonObj;
}

const filterPokemonsByType = (typePokemon) => {
  const filteredByType = pokemons.filter(({ type }) => type === typePokemon);
  return filteredByType.map(pokemonsDisplayed);
};

const allPokemons = pokemons.map(pokemonsDisplayed);

export const appData = {
  links: [
    {
      linkName: getRegex('home'),
      linkPath: '/',
    },
    {
      linkName: getRegex('about'),
      linkPath: '/about',
    },
    {
      linkName: getRegex('favorite pokémons'),
      linkPath: '/favorites',
    },
  ],
};

export const aboutData = {
  pokedexInfos: [
    getRegex('this application simulates a pokédex'),
    getRegex('One can filter Pokémons by type'),
  ],
  imgSrc:
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
};

export const favoritedPokemonsData = {
  favoritedPokemon: [
    getRegex('Pikachu'), 
    getRegex('Electric'), 
    getRegex('Average weight: 6.0 kg')
  ],
  imgSrc: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
}

export const notFoundData = {
  imgSrc: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
}

export const pokedexData = {
  filteredPokemons: {
    All: allPokemons,
    Electric: filterPokemonsByType('Electric'),
    Fire: filterPokemonsByType('Fire'),
    Bug: filterPokemonsByType('Bug'),
    Poison: filterPokemonsByType('Poison'),
    Psychic: filterPokemonsByType('Psychic'),
    Normal: filterPokemonsByType('Normal'),
    Dragon: filterPokemonsByType('Dragon'),
  },
  types: [
    'All', 'Electric', 
    'Fire', 'Bug', 
    'Poison', 'Psychic', 
    'Normal', 'Dragon',
  ],
  typesRegex: [
    getRegex('all'), getRegex('electric'), 
    getRegex('fire'), getRegex('bug'), 
    getRegex('poison'), getRegex('psychic'), 
    getRegex('normal'), getRegex('dragon'),
  ]
}

export const pokemonData = {
  pokemonDisplayed: {
    pokemonInfo: [
      {
        testId: 'pokemon-name',
        textContent: getRegex('Pikachu'),
      },
      {
        testId: 'pokemon-type',
        textContent: getRegex('Electric'),
      },
      {
        testId: 'pokemon-weight',
        textContent: getRegex('Average weight: 6.0 kg'),
      }
    ],
    pokemonImg: {
      alt: getRegex('pikachu sprite'),
      src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }
  },
}