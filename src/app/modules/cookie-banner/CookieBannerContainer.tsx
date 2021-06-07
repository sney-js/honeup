import React from 'react';
import CookieBanner from '../../components/cookie-banner/CookieBanner';
import LinkElement from '../../elements/link/LinkElement';

// Add all new contentful modules here.
export default () => {
  return (
    <CookieBanner
      caption={
        <span className={'d-rich-text'}>
          We use cookies.{' '}
          <LinkElement path='/privacy-policy' title='Learn More' />
        </span>
      }
    />
  );
};
