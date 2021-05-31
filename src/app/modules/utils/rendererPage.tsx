import * as React from 'react';
import { IPage } from '../../../contentful/@types/contentful';

export const SPECIAL_PAGES = ['early-access'];

// Add all new contentful modules here.
export const renderPageContent = ({ page }: { page: IPage }) => {
  switch (page.fields.name) {
    case 'early-access': {
      const typeformIframe = `<html> <head> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> <title>Early Access Sign up</title> <style type="text/css"> html{ margin: 0; height: 100%; overflow: hidden; } iframe{ position: absolute; left:0; right:0; bottom:0; top:0; border:0; } </style> </head> <body> <iframe id="typeform-full" width="100%" height="100%" frameborder="0" allow="camera; microphone; autoplay; encrypted-media;" src="https://form.typeform.com/to/wNNcb1AU?typeform-medium=embed-snippet"></iframe> <script type="text/javascript" src="https://embed.typeform.com/embed.js"></script> </body> </html>`;
      return <div dangerouslySetInnerHTML={{ __html: typeformIframe }} />;
    }
    default:
      return null;
  }
};

export const isSpecialPage = (page: IPage) =>
  SPECIAL_PAGES.includes(page.fields.name);
