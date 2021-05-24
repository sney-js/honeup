import React, { FC, useContext } from 'react';
import { makeClass, WINDOW } from '../../utils/helpers';
import Button from '../../elements/Button/';
import { ButtonProps } from '../../elements/Button/Button';
import SvgIcChevronDown from '../../elements/SvgElements/IcChevronDown';
import { AccordionContext } from './Accordion';

export type AccordionPanelProps = {
  /**
   * Determines the title of the Accordion
   */
  title: JSX.Element | string;
  /**
   * Determines the content of the Accordion
   */
  children: React.ReactChild;
  /**
   * Use this to disable this accordion click
   */
  disabled?: boolean;
  /**
   * Used to change the indicator icon. Use CSS to overwrite expand animation
   */
  icon?: ButtonProps['icon'];
  /**
   * Set internally by parent
   */
  _index?: number;
} & React.HTMLAttributes<HTMLDivElement>;
/**
 * Use `AccordionPanel` to highlight key info with a predefined status.
 */
const AccordionPanel: FC<AccordionPanelProps> = (
  props: AccordionPanelProps
) => {
  const { _index = 0, title, children, disabled, icon } = props;

  const [height, setHeight] = React.useState(0);
  const context = useContext(AccordionContext);

  const activeTab = context.expandedPanels.includes(_index);
  const panelBody = React.useRef(null);
  const innerHeight = {
    height: `${activeTab ? height : 0}px`
  };
  const classes = makeClass([
    'd-accordion-panel',
    activeTab && 'active',
    disabled && 'disabled'
  ]);

  React.useEffect(() => {
    const panelBodyHeght = (panelBody as any).current.scrollHeight;
    WINDOW.setTimeout(() => {
      setHeight(panelBodyHeght);
    }, 200);
  }, [children]);

  return (
    <React.Fragment>
      <div className={classes} role='tablist' aria-expanded={activeTab}>
        <Button
          disabled={disabled}
          type='button'
          appearance='invisible'
          className='d-accordion-panel__label'
          role='tab'
          onClick={() => {
            if (!disabled) {
              context.toggle(_index);
            }
          }}
        >
          {title}
          <Button
            className={makeClass([
              'd-accordion-panel-icn',
              activeTab && 'active'
            ])}
            disabled={disabled}
            appearance='invisible'
            icon={icon}
          />
        </Button>
        <div
          className='d-accordion-panel__inner'
          style={innerHeight}
          ref={panelBody}
          aria-hidden={!activeTab}
        >
          <div className='d-accordion-panel-content'>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

AccordionPanel.displayName = 'AccordionPanel';
AccordionPanel.defaultProps = {
  icon: <SvgIcChevronDown />
};

export default AccordionPanel;
