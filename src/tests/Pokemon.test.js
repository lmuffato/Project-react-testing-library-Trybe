import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { pokemonType } from '../types';

const Pokemon = ({ pokemon, showDetailsLink, isFavorite }) => {
  const { averageWeight, id, image, name, type } = pokemon;
  const { measurementUnit, value } = averageWeight;

  return (
    <div>
      <div>
        <p data-testid="pokemon-name">{`${name}`}</p>
        <p data-testid="pokemon-type">{`${type}`}</p>
        <p data-testid="pokemon-weight">
          {`Average weight: ${value} ${measurementUnit}`}
        </p>
        {showDetailsLink && <Link to={ `pokemons/${id}` }>More details</Link>}
      </div>
      <img src={ `${image}` } alt={ `${name} sprite` } />
      {isFavorite && (
        <img
          src="/star-icon.svg"
          alt={ `${name} is marked as favorite` }
        />
      )}
    </div>
  );
};

Pokemon.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  pokemon: pokemonType.isRequired,
  showDetailsLink: PropTypes.bool,
};

Pokemon.defaultProps = {
  showDetailsLink: true,
};

export default Pokemon;
