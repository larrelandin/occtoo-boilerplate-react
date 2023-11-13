import React from 'react';

type FooterProps = {
  isOcctooSourcesVisible: boolean;
};

const Footer: React.FC<FooterProps> = ({isOcctooSourcesVisible}) => {
return (
    <>
      <span>{isOcctooSourcesVisible ? "Yes" : "No" }</span>
    </>
  );
};
export default Footer;
