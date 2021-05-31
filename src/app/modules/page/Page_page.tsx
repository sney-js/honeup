import React from 'react';
import { useRouteData } from 'react-static';
import './page.scss';
import Layout, { MetaData } from '../../components/layout/Layout';
import { renderContentContainer } from '../utils/renderer';
import { parse } from 'flatted';
import { IPage } from '../../../contentful/@types/contentful';
import { isSpecialPage, renderPageContent } from '../utils/rendererPage';

type PageProps = {
  changeTheme?: Function;
  changeLocale?: Function;
  path?: string;
  routeData?: any;
};

const Page_page = (props: PageProps) => {
  const routeData = useRouteData();
  const page: IPage = parse(routeData.page);
  const locale = routeData.locale;
  const pageFields = page.fields;
  const metaData = pageFields.metaData ? pageFields.metaData.fields : '';
  return (
    <Layout locale={locale}>
      <MetaData {...metaData} />
      {isSpecialPage(page)
        ? renderPageContent({ page })
        : pageFields.content?.map((item, index) =>
            renderContentContainer({ item, key: index })
          )}
    </Layout>
  );
};

export default Page_page;
