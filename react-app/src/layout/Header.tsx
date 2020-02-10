import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';


const Header: React.FC = () => {
  return (
    <div>
      <div>
        <a
          href="https://github.com/ashutoshbarthwal/azure-blob-upload"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon color="action"/>

          Github
        </a>
        
      </div>
    </div>
  );
};

export default Header;
