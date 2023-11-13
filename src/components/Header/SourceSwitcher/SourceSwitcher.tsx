import React, { useState } from 'react';
import Switch from 'react-switch';

type SourceSwitcherProps = {
  handleOcctooSourcesVisible: (checked: boolean) => void;
};

type HandleChangeType = (nextChecked: boolean) => void;

const SourceSwitcher: React.FC<SourceSwitcherProps> = ({handleOcctooSourcesVisible}) => {
  
  const [checked, setChecked] = useState(false);

  const handleChange: HandleChangeType = nextChecked => {
    setChecked(nextChecked);
    handleOcctooSourcesVisible(nextChecked);
  }

  return (
    <label className="flex items-center space-x-2">
      <span className='font-medium'>Show the sources: </span>
      <Switch onChange={handleChange} checked={checked} />
    </label>
    
  );
};

export default SourceSwitcher;