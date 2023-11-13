import React from 'react';
import { Link } from 'react-router-dom';
import Switcher from './SourceSwitcher/SourceSwitcher';

type HeaderProps = {
    handleOcctooSourcesVisible: (checked: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({handleOcctooSourcesVisible}) => {
    
return (
    <div className='md:flex items-start justify-between'>
        <div className="w-full md:w-[350px] flex-shrink-0 p-4 md:p-6 top-0">
            <Link className="flex items-center font-medium" to="/">
                <img src="/occtoo.webp" className="mr-2 w-5 h-5" />
                <div>Occtoo Demo</div>
            </Link>
        </div>
        <div className="w-full md:w-[250px] flex-shrink-0 p-4 md:p-6 top-0">
            <Switcher handleOcctooSourcesVisible={handleOcctooSourcesVisible} />
        </div>
    </div>
  );
};
export default Header;
