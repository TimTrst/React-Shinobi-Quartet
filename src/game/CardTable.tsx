import React from 'react';
import styled, { StyledProps } from 'styled-components';

import Shinobi from './Shinobi';
import { Td, Tr } from './CardTable.styles';

interface Props {
  shinobi: Shinobi;
  onSelectProperty?: (property: keyof Shinobi) => void;
  selectedProperty?: keyof Shinobi | '';
  darkMode: boolean;
  className?: string;
}

function CardTable({
  shinobi,
  onSelectProperty,
  selectedProperty,
  darkMode,
  className,
}: Props) {
  return (
    <table className={className}>
      <tbody>
        {Object.keys(Shinobi.properties).map((property, index) => {
          const shinobiProperty = Shinobi.properties[property];
          const propertyValue = shinobi[property as keyof Shinobi];
          return (
            <Tr
              darkMode={darkMode}
              active={selectedProperty === property}
              key={property}
              onClick={() => {
                onSelectProperty && onSelectProperty(property as keyof Shinobi);
              }}
              className={property}
            >
              <Td>{shinobiProperty.label}</Td>
              <Td>
                {propertyValue}&nbsp;{shinobiProperty.unit}
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default styled(CardTable)`
  width: 100%;
  border-collapse: collapse;
`;
