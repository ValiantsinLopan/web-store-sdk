import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Footer from 'src/components/common/Footer/Footer';
import Header from 'src/components/common/Header/Header';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.wrapper}>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
