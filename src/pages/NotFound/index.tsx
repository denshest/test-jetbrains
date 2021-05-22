import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div>
      Not Found.
      Go to <Link to='/'>Home</Link>
    </div>
  );
};

export default NotFound;
