import React from 'react';
import Layout from '../../components/common/Layout';
import Init from './Init';

const title = 'Cleeng Checkout';

function action() {
  return {
    chunks: ['init'],
    title,
    component: (
      <Layout>
        <Init title={title} />
      </Layout>
    ),
  };
}

export default action;
