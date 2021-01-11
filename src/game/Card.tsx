import React, { useContext } from 'react';
import classNames from 'classnames';

import './Card.scss';
import Shinobi from './Shinobi';
import DarkMode from './DarkMode';
import CardTable from './CardTable';

interface Props {
  shinobi: Shinobi;
  uncovered: boolean;
  onSelectProperty?: (property: keyof Shinobi) => void;
  selectedProperty?: keyof Shinobi | '';
}

export default function Card({
  shinobi,
  uncovered,
  onSelectProperty,
  selectedProperty,
}: Props) {
  const darkMode = useContext(DarkMode);
  const front = (
    <>
      <h1>{shinobi.name ? shinobi.name : 'Unbekannt'}</h1>
      {shinobi.image && (
        <img
          alt={shinobi.name}
          src={`${process.env.PUBLIC_URL}/${shinobi.image}`}
          height="200"
          width="200"
        />
      )}
      <CardTable
        shinobi={shinobi}
        onSelectProperty={onSelectProperty}
        selectedProperty={selectedProperty}
        darkMode={darkMode}
      />
    </>
  );

  const cardClasses = classNames('card', {
    back: !uncovered,
    light: !darkMode,
    dark: darkMode,
  });

  return <div className={cardClasses}>{uncovered ? front : ''}</div>;
}
