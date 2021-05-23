import * as React from 'react';
import Card, { CardProps } from './Card';
import Container from '../container/Container';
import { INFO_TILE_PROPS } from '../Infotile/InfotileHelper';

export default {
  title: 'Components/Card',
  parameters: {
    componentSubtitle: 'Atom'
  },
  component: Card
};

export const basic = (args: CardProps): React.ReactChild => {
  return (
    <Container>
      <Container layoutType='grid' gridColumn='350px' gridColumnTablet='1fr'>
        <Card
          image={<img src='images/card1.jpeg' alt='Alt Text' />}
          {...args}
          link={args.link?.title ? args.link : undefined}
        >
          {args.children && (
            <div>
              <br />
              <small>*Terms and Conditions apply</small>
            </div>
          )}
        </Card>
      </Container>
    </Container>
  );
};

const CARD_SAMPLE_PROPS = {
  ...INFO_TILE_PROPS,
  linkSecondary: undefined,
  image: <img src='images/card1.jpeg' />,
  appearance: 'normal'
};

basic.args = {
  ...CARD_SAMPLE_PROPS
};
