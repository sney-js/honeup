import React, { useEffect, useState } from 'react';
import Accordion, { AccordionProps } from './Accordion';
import Container from '../container/Container';
import AccordionPanel, { AccordionPanelProps } from './AccordionPanel';

export default {
  title: 'Components/Accordion',
  component: Accordion
};

const AccordionPanelStory = (props: AccordionPanelProps & { i: number }) => {
  const { i, children, ...rest } = props;
  const [childrenCurr, setChildren] = useState(children);
  useEffect(() => {
    setTimeout(() => {
      if (i === 2) {
        setChildren(
          <span>
            <h3>Changed Content After 5 seconds</h3>
            Gallia est omnis divisa in partes tres, quarum. Inmensae
            subtilitatis, obscuris et malesuada fames. Ut enim ad minim veniam,
            quis nostrud exercitation. Curabitur est gravida et libero vitae
            dictum.
          </span>
        );
      }
    }, 5000);
  }, [children]);
  return <AccordionPanel {...rest}>{childrenCurr}</AccordionPanel>;
};

export const basic = (args: AccordionProps): React.ReactChild => {
  // Define Accordion component required Data

  const items = [
    {
      title: 'Salutantibus vitae elit libero, a pharetra augue?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Etiam habebis sem dicantur magna mollis euismod. Hi omnes lingua, institutis, legibus inter se differunt.'
    },
    {
      title: 'Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh?',
      content:
        'Praeterea iter est quasdam res quas ex communi. Tu quoque, Brute, fili mi, nihil timor populi, nihil! Cum ceteris in veneratione tui montes, nascetur mus. Curabitur blandit tempus ardua ridiculus sed magna.'
    },
    {
      title: 'Cras mattis iudicium purus sit amet fermentum?',
      content: (
        <span>
          <h5>Changing content in 5 seconds...</h5>
          Morbi fringilla convallis sapien, id pulvinar odio volutpat. Cras
          mattis iudicium purus sit amet fermentum. Mercedem aut nummos unde
          unde extricat, amaras.
        </span>
      )
    },
    {
      title:
        'Fictum, deserunt mollit anim laborum astutumque! Ab illo tempore, ab est sed immemorabili?',
      content:
        'Unam incolunt Belgae, aliam Aquitani, tertiam. Hi omnes lingua, institutis, legibus inter se differunt. Praeterea iter est quasdam res quas ex communi.'
    }
  ];

  const expandedPanels = args.expandedPanels?.map((e) => e | 0);

  return (
    <Container layout='maxWidth'>
      <Accordion
        {...args}
        expandedPanels={expandedPanels}
        onChange={console.log}
      >
        {items.map((it, j) => {
          const props: AccordionPanelProps = {
            title: it.title,
            children: it.content
          };
          return <AccordionPanelStory key={j} {...props} i={j} />;
        })}
      </Accordion>
    </Container>
  );
};

basic.story = {
  parameters: {
    jest: ['Accordion.spec.tsx']
  }
};

basic.args = {
  expandedPanels: ['0', '2'],
  allowMultiple: true
};
