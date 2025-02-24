import { useState } from 'react';
import { Table, Button, Kbd } from '@chakra-ui/react';
import {
  ActionBarRoot,
  ActionBarContent,
  ActionBarSelectionTrigger
} from '../../ui/action-bar';

import { Checkbox } from '../../ui/checkbox';

const productItems = [
  { id: 1, name: 'Znaczek', category: 'Znaczki', price: 999.99 },
  { id: 2, name: 'Figurka', category: 'Figurki', price: 49.99 },
  { id: 3, name: 'Smycz', category: 'Smycze', price: 150.0 },
  { id: 4, name: 'Moneta', category: 'Monety', price: 799.99 }
];

const Products = () => {

  const [selection, setSelection] = useState([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < productItems.length;

  const productRows = productItems.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? '' : undefined}
      style={{ fontSize: '1.2rem', padding: '1rem' }}
    >
      <Table.Cell backgroundColor="white" color={'black'}>
        <Checkbox
          variant="subtle"
          colorPalette="orange" // Use `colorScheme` for Chakra UI colors
          size="lg"
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : selection.filter((id) => id !== item.id)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.name}
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.category}
      </Table.Cell>
      <Table.Cell backgroundColor="white" color={'black'}>
        {item.price} PLN
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row backgroundColor="gray.300">
            <Table.ColumnHeader>
              <Checkbox
                variant="subtle"
                top="1"
                aria-label="Select all rows"
                colorPalette="yellow" // Use `colorScheme` for Chakra UI colors
                size="lg"
                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? productItems.map((item) => item.id) : []
                  );
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              Product
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader fontSize="1.5rem" fontWeight="bold">
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{productRows}</Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          {/* <ActionBarSeparator /> */}
          <Button variant="surface" size="lg" colorScheme="red">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="surface" colorScheme="cyan" size="lg">
            Edit <Kbd>E</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  );
};

export default Products;
