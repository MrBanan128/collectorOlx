import { useEffect, useState } from 'react';
import { Button, Kbd, Table, Box } from '@chakra-ui/react';
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator
} from '../../ui/action-bar';

import { Checkbox } from '../../ui/checkbox';

import axios from 'axios';

const adminItems = [
  {
    id: 1,
    name: 'Test1',
    status: 'User',
    email: 'Test@user.pl',
    password: 'User123'
  },
  { id: 2, name: 'Test2', status: 'Admin', email: 'Test@admin.pl' },
  { id: 3, name: 'Test3', status: 'Znawca', email: 'Test@znawca.pl' }
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < adminItems.length;

  useEffect(() => {
    axios
      .get('http://localhost:10000/users')
      .then((users) => setUsers(users.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(users.data);

  const adminRows = adminItems.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? '' : undefined}
      style={{ fontSize: '1.2rem', padding: '1rem' }}
    >
      <Table.Cell backgroundColor="white" color={'black'}>
        <Checkbox
          variant="subtle"
          colorPalette="orange"
          size="lg"
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : prev.filter((id) => id !== item.id)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.name}
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.status}
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.email}
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row backgroundColor="gray.300">
            <Table.ColumnHeader>
              <Checkbox
                variant="subtle"
                top="1"
                aria-label="Select all rows"
                colorPalette="yellow"
                size="lg"
                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? adminItems.map((item) => item.id) : []
                  );
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              User
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              Email
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{adminRows}</Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </Box>
  );
};

export default Users;
