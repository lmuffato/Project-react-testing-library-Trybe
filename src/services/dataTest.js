/**
 * Consutei o dataTest do Renzo Sevilha para este requisito.
 * Link: https://github.com/tryber/sd-010-a-project-react-testing-library/blob/c364287f50ba28cd493c346141338c074f7aaea0/src/services/dataTest.js
 */
const getRegex = (pattern) => new RegExp(pattern, 'i');

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
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
};

export const favoritedPokemonsData = {
  favoritedPokemon: [
    getRegex('Pikachu'), 
    getRegex('Electric'), 
    getRegex('Average weight: 6.0 kg')
  ],
  imgSrc: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
}