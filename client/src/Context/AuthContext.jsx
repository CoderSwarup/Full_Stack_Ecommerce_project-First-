import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState({
    user: null,
    token: "",
  });

  const newauth = useMemo(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setauth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
  }, []);

  //   all multiple time running problem slove using the following at the last useEffect
  // eslint-disable-next-line

  return (
    <AuthContext.Provider value={[auth, setauth]}>
      {children}
    </AuthContext.Provider>
  );
};

//CustomHook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
