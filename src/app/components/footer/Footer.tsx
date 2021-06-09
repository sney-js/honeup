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
import { ReactElement } from 'react-markdown';
import IcYoutube from '../../elements/SvgElements/IcYoutube';

type SupportedSocials = 'facebook' | 'instagram' | 'twitter' | 'youtube';
export type FooterProps = {
  links?: Array<LinkData>;
  content?: React.ReactText;
  social: {
    [key in SupportedSocials]?: string | null;
  };
};

const socialIcons: { [key in SupportedSocials]: ReactElement } = {
  facebook: <IcFacebook />,
  instagram: <IcInstagram />,
  twitter: <IcTwitter />,
  youtube: <IcYoutube />
};

const Footer = ({ content, links, social }: FooterProps) => (
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
          template='repeat(auto-fit, 48px)'
          style={{ justifyContent: 'end' }}
        >
          {social &&
            Object.keys(social).map((sc) => {
              if (!social[sc]) return null;
              return (
                <LinkWrap key={sc} path={social[sc]} isExternal newTab>
                  <Button icon={socialIcons[sc]} appearance='invisible' />
                </LinkWrap>
              );
            })}
        </Grid>
      </Grid>
    </Container>
  </footer>
);
export default Footer;
