import { ActionBar, Portal, Flex, useBreakpointValue } from '@chakra-ui/react';
import { CloseButton } from './close-button';
import * as React from 'react';

// Define ActionBarContent with responsive styles
export const ActionBarContent = React.forwardRef(
  function ActionBarContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      size = 'lg',
      ...rest
    } = props;

    // Use responsive styles based on breakpoints
    const fontSize = useBreakpointValue({
      base: '1rem',
      md: '1.2rem',
      lg: '1.5rem'
    });
    const padding = useBreakpointValue({
      base: '1rem',
      md: '1.5rem',
      lg: '2rem'
    });
    const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const gap = useBreakpointValue({ base: '0.5rem', md: '1rem' });

    const contentStyle = {
      fontSize,
      padding,
      backgroundColor: 'gray.100',
      borderRadius: 'md',
      boxShadow: 'lg'
    };

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ActionBar.Positioner>
          <ActionBar.Content
            ref={ref}
            {...rest}
            asChild={false}
            style={contentStyle} // Apply responsive styles
          >
            <Flex
              align="center"
              justify="space-between"
              direction={flexDirection} // Responsive layout
              gap={gap}
            >
              {children}
            </Flex>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    );
  }
);

// Define ActionBarCloseTrigger with responsive sizes
export const ActionBarCloseTrigger = React.forwardRef(
  function ActionBarCloseTrigger(props, ref) {
    const { size = 'lg', ...rest } = props;

    // Use responsive size for the CloseButton
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    return (
      <ActionBar.CloseTrigger {...rest} asChild ref={ref}>
        <CloseButton size={buttonSize} aria-label="Close" />
      </ActionBar.CloseTrigger>
    );
  }
);

// Re-exports for consistency
export const ActionBarRoot = ActionBar.Root;
export const ActionBarSelectionTrigger = ActionBar.SelectionTrigger;
export const ActionBarSeparator = ActionBar.Separator;
