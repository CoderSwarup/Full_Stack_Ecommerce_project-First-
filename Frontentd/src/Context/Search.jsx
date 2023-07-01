import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setvalues] = useState({
    keyword: "",
    results: [],
  });

  //   all multiple time running problem slove using the following at the last useEffect
  // eslint-disable-next-line

  return (
    <SearchContext.Provider value={[values, setvalues]}>
      {children}
    </SearchContext.Provider>
  );
};

//CustomHook

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
