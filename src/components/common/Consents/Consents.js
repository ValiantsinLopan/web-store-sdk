import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';
import Loader from 'src/components/common/Loader/Loader';
import Checkbox from 'src/components/common/Checkbox';
import Authentication from 'src/services/authentication';

import s from './Consents.css';

const name = 'LocalAuth';
const regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
const regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);

export class LocalAuth extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    error: PropTypes.string,
    sendConsents: PropTypes.bool,
    onChangeFn: PropTypes.func,
    email: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    t: () => {},
    error: '',
    sendConsents: false,
    onChangeFn: () => {},
    email: '',
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      consentDefinitions: [],
      checked: [],
      consentsLabels: [],
      consentLoaded: false,
    };
  }

  componentDidMount() {
    this.getConsents().then(() => {
      this.processConsentsContent();
      this.validateConsents();
    });
  }

  componentDidUpdate(prevProps) {
    const { consentDefinitions } = this.state;
    const { email, sendConsents } = this.props;
    if (!prevProps.sendConsents && sendConsents) {
      const { checked } = this.state;
      consentDefinitions.every((consent, index) => {
        const isChecked = checked[index] ? 'accepted' : 'declined';
        return this.submitConsent({ email, consent, isChecked });
      });
    }
  }

  processConsentsContent() {
    const { consentDefinitions } = this.state;
    const initArray = new Array(consentDefinitions.length).fill(false);
    const consentsLabels = consentDefinitions.map(element =>
      this.translateConsents(element.label),
    );
    this.setState({
      checked: initArray,
      consentsLabels,
    });
  }

  getConsents = async () => {
    try {
      const consentsDetails = [];
      const consentsIncome = await Authentication.getConsents();
      consentsIncome.filter(element => {
        consentsDetails.push({
          name: element.name,
          version: element.version,
          label: element.label,
          required: element.required,
        });
        return true;
      });
      this.setState({
        consentDefinitions: consentsDetails,
        consentLoaded: true,
      });
    } catch (error) {
      return error;
    }
    return false;
  };

  submitConsent = async ({ email, consent, isChecked }) => {
    try {
      Authentication.submitConsent({
        email,
        consent,
        isChecked,
      });
    } catch (error) {
      return error;
    }
    return false;
  };

  changeConsentState = consentID => {
    const { consentDefinitions, checked } = this.state;
    if (consentDefinitions.length > 0) {
      checked[consentID] = !checked[consentID];
      this.setState({ checked });
    }
    this.validateConsents();
  };

  translateConsents = consentContent => {
    const { t } = this.props;
    const openTagContent = regexHrefOpenTag.exec(consentContent);
    const closeTagContent = regexHrefCloseTag.exec(consentContent);
    if (openTagContent) {
      let modifiedConsentContent = consentContent.replace(
        regexHrefOpenTag,
        '{{htmltag}}',
      );
      modifiedConsentContent = modifiedConsentContent.replace(
        regexHrefCloseTag,
        '{{endhtmltag}}',
      );
      return `${t(modifiedConsentContent, {
        htmltag: openTagContent[0],
        endhtmltag: closeTagContent[0],
      })}`;
    }
    return t(consentContent);
  };

  validateConsents = () => {
    const { onChangeFn } = this.props;
    const { consentDefinitions, checked } = this.state;
    onChangeFn(checked, consentDefinitions);
  };

  render() {
    const {
      checked,
      consentsLabels,
      consentDefinitions,
      consentLoaded,
    } = this.state;
    const { error, className } = this.props;
    return (
      <div className={s.wrapper}>
        {!consentLoaded ? (
          <div className={s.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          consentDefinitions.map((consent, index) => (
            <Checkbox
              className={className}
              onClickFn={() => this.changeConsentState(index)}
              checked={checked[index]}
              error={error}
              key={String(index)}
              required={consent.required && !checked[index]}
            >
              {consentsLabels[index]}
            </Checkbox>
          ))
        )}
        {error && <div className={s.errorConsents}>{error}</div>}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  translate(name),
  customLabeling(name),
)(LocalAuth);
