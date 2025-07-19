import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      Welcome to login Screen!

      <Link to={"/home"}>
        <button>
          Chat to Miranda.
        </button>
      </Link>
    </div>
  );
}

export default Login;
