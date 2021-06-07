import { INumberedListFields } from '../../../contentful/@types/contentful';
import Container from '../../components/container';
import Grid from '../../components/Grid';
import RichText from '../../elements/rich-text/RichText';
import React from 'react';
const style = require('./numberedList.module.scss');

export const NumberedList = ({ item }: { item: INumberedListFields }) => (
  <Container
    className={style.dNumberedList}
    background='white'
    animateIn
    theme='light'
  >
    <Container background='Secondary' pad='All'>
      <Container layout='maxWidthNarrow'>
        <h2 className='color-text-primary'>{item.title}</h2>
      </Container>
    </Container>
    <Container layout='maxWidth' pad='All'>
      <Grid
        template='repeat(auto-fill, 350px)'
        style={{ justifyContent: 'center' }}
        gap='var(--spacing-gap)'
      >
        {item.entriesText?.map((rt, i) => (
          <div key={i}>
            <h2 className={style.number}>{i + 1}</h2>
            <br />
            <RichText document={rt.fields.content} />
          </div>
        ))}
      </Grid>
    </Container>
  </Container>
);
