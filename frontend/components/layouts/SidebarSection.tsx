import { List, ListSubheader } from '@mui/material';
import SidebarItem, { Item } from './SidebarItem';
import React from 'react';

interface Props {
  items: Item[];
  path: string;
  title: string;
  [key: string]: unknown;
}

const renderNavItems = (items: Item[], path: string, depth = 0) => (
  <List disablePadding>
    {items.reduce((acc, item) => reduceChildRoutes(acc, depth, item, path), [] as JSX.Element[])}
  </List>
);

function reduceChildRoutes(
  acc: JSX.Element[], depth: number, item: Item, path: string
) {
  const key = `${item.title}-${depth}`;
  const partialMatch = item.path ? path.includes(item.path) : false;
  const exactMatch = path.split('?')[0] === item.path; // We don't compare query params

  if (item.children) {
    acc.push(
      <SidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
        disabled={item.disabled}
      >
        {renderNavItems(item.children, path, depth + 1)}
      </SidebarItem>
    );
  } else {
    acc.push(
      <SidebarItem
        active={exactMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
        disabled={item.disabled}
      />
    );
  }

  return acc;
};

export default function SidebarSection({
  items, path, title, ...other
}: Props) {
  return (
    <List
      subheader={(
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 2.5,
            ml: 4,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </ListSubheader>
      )}
      {...other}>
      {renderNavItems(items, path)}
    </List>
  );
};
