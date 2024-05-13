import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from './helpers';
import Private from '../core/Private';

export default function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);

  return (
     <>
     {isAuth() ? <Private></Private> : null}
     </>
    
  );
}
