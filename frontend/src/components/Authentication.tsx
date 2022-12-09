import { useAuth0 } from '@auth0/auth0-react';

export const Authentication = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <div>
      {!isLoading &&
        (isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })}> logout</button>
        ) : (
          <button onClick={() => loginWithRedirect()}> login</button>
        ))}
    </div>
  );
};
