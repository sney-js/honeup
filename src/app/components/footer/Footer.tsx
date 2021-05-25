import React from 'react';
import Container from '../container';
import LinkWrap from '../../modules/link/linkWrap';
import { LinkData } from '../../models/LinkData';
import Grid from '../Grid';
import './footer.scss';
import Button from '../../elements/Button';
import IcFacebook from '../../elements/SvgElements/IcFacebook';
import IcInstagram from '../../elements/SvgElements/IcInstagram';
import IcTwitter from '../../elements/SvgElements/IcTwitter';

export type FooterProps = {
  links?: Array<LinkData>;
  content?: React.ReactText;
};

const Footer = ({ content, links }: FooterProps) => (
  <footer className='d-footer'>
    <Container
      layout='maxWidth'
      pad='All'
      theme='dark'
      className='text-align-left'
    >
      <div className='links'>
        <Grid template='1fr 1fr 1fr' templateMobile='1fr'>
          {links?.map((l, i) => (
            <LinkWrap key={`footer${i}`} {...l} />
          ))}
        </Grid>
      </div>
      <br />
      <br />
      <Grid template='1fr 1fr' templateMobile='1fr'>
        <span>{content}</span>
        <Grid
          className='text-align-right'
          template='48px 48px 48px'
          style={{ justifyContent: 'end' }}
        >
          <LinkWrap path='https://facebook.com' isExternal newTab>
            <Button icon={<IcFacebook />} asDiv />
          </LinkWrap>
          <LinkWrap path='https://instagram.com' isExternal newTab>
            <Button icon={<IcInstagram />} asDiv />
          </LinkWrap>
          <LinkWrap path='https://twitter.com' isExternal newTab>
            <Button icon={<IcTwitter />} asDiv />
          </LinkWrap>
        </Grid>
      </Grid>
    </Container>
  </footer>
);
export default Footer;
