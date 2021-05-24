import React from 'react';
import Accordion from './Accordion';
import Container from '../container/Container';
import AccordionPanel, { AccordionPanelProps } from './AccordionPanel';

export default {
  title: 'Components/Accordion/AccordionPanel',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: AccordionPanel
};

export const single = (args: AccordionPanelProps): React.ReactChild => {
  return (
    <Container layout='maxWidth'>
      <Accordion>
        <AccordionPanel {...args}>
          <span>
            At nos hinc posthac, sitientis piros Afros. Plura mihi bona sunt,
            inclinet, amari petere vellent. Ambitioni dedisse scripsisse
            iudicaretur. Morbi fringilla convallis sapien, id pulvinar odio
            volutpat. Sed haec quis possit intrepidus aestimare tellus.
            Pellentesque habitant morbi tristique senectus et netus. Ut enim ad
            minim veniam, quis nostrud exercitation. Cras mattis iudicium purus
            sit amet fermentum. Excepteur sint obcaecat cupiditat non proident
            culpa.
          </span>
        </AccordionPanel>
      </Accordion>
    </Container>
  );
};

single.args = {
  title: 'Qui ipsorum lingua Celtae, nostra Galli appellantur.'
};
