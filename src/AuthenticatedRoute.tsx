// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthenticatedRoute({
  children,
  isLoggedIn,
}: {
  children: JSX.Element;
  isLoggedIn: Boolean;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return children;
}

export default AuthenticatedRoute;
