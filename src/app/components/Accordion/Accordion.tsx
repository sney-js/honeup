import React, { FC, useEffect, useState } from 'react';
import { makeClass } from '../../utils/helpers';
import { AccordionPanelProps } from './AccordionPanel';
import './Accordion.scss';

export type AccordionProps = {
  /**
   * Determines whether multiple tabs should open on clicking the title.
   */
  allowMultiple?: boolean;
  /**
   * Change this value to overwrite user action.
   */
  expandedPanels?: number[];
  /**
   * provides currently expanded panels list
   * @param expandedPanels
   */
  onChange?(expandedPanels: number[]): void;
  /**
   * Must be children of type `<AccordionPanel>`
   */
  children?:
    | React.ReactElement<AccordionPanelProps>
    | React.ReactElement<AccordionPanelProps>[];
} & React.HTMLAttributes<HTMLDivElement>;

export type AccordionContext = {
  expandedPanels: number[];
  toggle(index: number): void;
};

export const AccordionContext = React.createContext<AccordionContext>({
  expandedPanels: [],
  toggle(): void {}
});
/**
 * Use `Accordion` to highlight key info with a predefined status.
 */
const Accordion: FC<AccordionProps> = (props: AccordionProps) => {
  const { allowMultiple, children, onChange } = props;

  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);

  useEffect(() => {
    if (props.expandedPanels) {
      setExpandedPanels(props.expandedPanels);
    }
  }, [props.expandedPanels]);

  const defaultValue = {
    expandedPanels: [],
    toggle(index: number): void {
      if (!expandedPanels.includes(index)) {
        if (allowMultiple) {
          setExpandedPanels((arr) => arr.concat([index]));
        } else {
          setExpandedPanels([index]);
        }
      } else {
        if (allowMultiple) {
          setExpandedPanels((arr) => arr.filter((val) => val !== index));
        } else {
          setExpandedPanels([]);
        }
      }
    }
  };

  useEffect(() => {
    onChange && onChange(expandedPanels);
  }, [expandedPanels]);

  const classes = makeClass(['d-accordion', props.className]);

  return (
    <div className={classes}>
      <AccordionContext.Provider value={{ ...defaultValue, expandedPanels }}>
        {React.Children.map(children, (child, _index) => {
          if (!React.isValidElement<AccordionPanelProps>(child)) {
            return null;
          }
          return React.cloneElement(child, {
            _index
          });
        })}
      </AccordionContext.Provider>
    </div>
  );
};

Accordion.displayName = 'Accordion';
Accordion.defaultProps = {};

export default Accordion;
