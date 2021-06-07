import React from 'react';
import RichText from '../../elements/rich-text/RichText';
import { RespImage } from '../../utils/RespImage';
import Container from '../../components/container';
import ListContainer from '../list/ListContainer';
import {
  CONTENT_TYPE,
  IFaqFields,
  IHeroFields,
  IImageFields,
  INumberedListFields
} from '../../../contentful/@types/contentful';
import LinkElement from '../../elements/link/LinkElement';
import Grid from '../../components/Grid';
import Accordion, { AccordionPanel } from '../../components/Accordion';
import { Image } from '../ImageText/ImageText';

// Add all new contentful modules here.
export const renderContentContainer = ({ item, key, ...rest }) => {
  console.log(item.type, 'item.type');
  switch (item.type as CONTENT_TYPE) {
    case 'rich-text':
      return (
        <Container key={key} pad='All' layout='maxWidth' animateIn>
          <Container
            layout='maxWidthNarrow'
            className='text-align-left margin-left-0'
          >
            <RichText document={item.fields.content} />
          </Container>
        </Container>
      );
    case 'image': {
      const imageFields = item.fields as IImageFields;
      return <Image key={key} fields={imageFields} />;
    }
    case 'hero': {
      const heroFields = item.fields as IHeroFields;
      return (
        <Container
          key={key}
          animateIn
          pad='All'
          background='Primary'
          theme='dark'
        >
          <Container layout='maxWidthNarrow' pad='Vertical'>
            <Grid template='1fr' gap='var(--spacing-gap-m)'>
              <RespImage image={heroFields.image} />
              {heroFields.title && <h1>{heroFields.title}</h1>}
              <RichText document={heroFields.description} />
              {heroFields.cta && (
                <LinkElement {...heroFields.cta} appearance='primary' />
              )}
            </Grid>
          </Container>
        </Container>
      );
    }
    case 'faq': {
      const faqFields = item.fields as IFaqFields;
      return (
        <Container
          key={key}
          pad='All'
          theme='light'
          background='white'
          className='text-align-left'
          animateIn
        >
          <Container layout='maxWidth'>
            <Container layout='columns'>
              <h1>{faqFields.title}</h1>
              <div>
                <Accordion allowMultiple>
                  {faqFields.textItems.map((rt, i) => (
                    <AccordionPanel title={rt.fields.title} key={i}>
                      <RichText document={rt.fields.content} />
                    </AccordionPanel>
                  ))}
                </Accordion>
              </div>
            </Container>
          </Container>
        </Container>
      );
    }
    case 'numberedList': {
      const numLFields = item.fields as INumberedListFields;
      return (
        <Container key={key} background='white' animateIn theme='light'>
          <Container background='Secondary' pad='All'>
            <Container layout='maxWidthNarrow'>
              <h2 className='color-text-primary'>{numLFields.title}</h2>
            </Container>
          </Container>
          <Container layout='maxWidth' pad='All'>
            <Grid
              template='repeat(auto-fill, 350px)'
              style={{ justifyContent: 'center' }}
              gap='var(--spacing-gap)'
            >
              {numLFields.entriesText?.map((rt, i) => (
                <div key={i}>
                  <h2>{i + 1}</h2>
                  <br />
                  <RichText document={rt.fields.content} />
                </div>
              ))}
            </Grid>
          </Container>
        </Container>
      );
    }
    case 'list':
      return <ListContainer key={key} item={item.fields} />;
    default:
      return null;
  }
};
