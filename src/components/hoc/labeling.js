import React from 'react';

/* eslint-disable react/prop-types */
export default function customLabeling(ns) {
  // ...and returns another component...
  return WrappedComponent =>
    class extends React.Component {
      constructor(props) {
        super(props);
        this.addTranslations();
      }
      componentDidUpdate(prevProps) {
        if (prevProps.labels !== this.props.labels) {
          this.addTranslations();
        }
      }
      addTranslations() {
        const { labels, i18n } = this.props;
        if (!labels) return false;
        if (typeof i18n === 'undefined') return false;
        Object.keys(labels).forEach(key => {
          const value = labels[key];
          i18n.addResourceBundle(key, ns, value, true, true);
        });
        return true;
      }
      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return <WrappedComponent {...this.props} />;
      }
    };
}
