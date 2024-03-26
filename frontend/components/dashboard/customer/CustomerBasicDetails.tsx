import { Card, Theme, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';
import { ReactNode } from 'react';

interface Props {
  details: Record<string, ReactNode>;
}

export const CustomerBasicDetails = ({ details }: Props) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  const entries = Object.entries(details);

  return (
    <Card sx={{ border: 1, borderColor: "divider" }}>
      <PropertyList>
        {entries.map(([label, value], index) => (
          <PropertyListItem
            key={index}
            align={align}
            divider={index !== entries.length - 1}
            label={label}
            value={value}
          />
        ))}
      </PropertyList>
    </Card>
  );
};
