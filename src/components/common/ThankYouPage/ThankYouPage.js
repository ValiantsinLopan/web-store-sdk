import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'src/components/common/Button';
import s from './ThankYouPage.css';

const ThankYouPage = () => (
  <div className={s.thankYou}>
    <div className={s.thankYouTitle}>Thank You!</div>
    <div className={s.thankYouMessage1}>
      You are now a subscriber to our premium package.
    </div>
    <div className={s.thankYouMessage2}>
      We hope you love it. If you need help from us with your account, you can
      always find it
      <a
        href="https://www.cleeng.com"
        target="_blank"
        rel="noopener noreferrer"
        className={s.link}
      >
        here.
      </a>
    </div>
    <div className={s.thankYouSocials}>
      <div className={s.thankYouButtons}>
        <Button variant="google" />
        <Button variant="fb" />
      </div>
      <div className={s.thankYouShare}>
        Have friends who would like to check this out?
        <br />
        Just click to share.
      </div>
    </div>
  </div>
);

export default withStyles(s)(ThankYouPage);
