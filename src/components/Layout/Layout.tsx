import { Outlet  } from "react-router-dom";
import { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

const Layout = () => {

  const [isOcctooSourcesVisible, setOcctooSourcesVisible] = useState<boolean>(false);

  const handleOcctooSourcesVisible = (isChecked:boolean) => {
    setOcctooSourcesVisible(isChecked);
  }

  return (
    <>
      <Header handleOcctooSourcesVisible={handleOcctooSourcesVisible} />
      <Outlet context={isOcctooSourcesVisible} />
      <Footer />
    </>
  );
};

export default Layout;