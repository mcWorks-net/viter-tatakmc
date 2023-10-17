import React from "react";
import { FaSearch } from "react-icons/fa";
import { StoreContext } from "../store/StoreContext";
import { setError, setIsSearch, setMessage } from "../store/StoreAction";

const SearchBar = ({
  search,
  dispatch,
  store,
  result,
  isFetching,
  setOnSearch,
  onSearch,
}) => {
  // const {store, dispatch} = React.useContext(StoreContext)
  const handleChange = (e) => {
    if (e.target.value === "") {
      // setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = search.current.value;
    console.log(val);
    if (val === " " || val === "") {
      // setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
      dispatch(setError(true));
      dispatch(setMessage("Search keyword cannot be space only or blank."));
    } else {
      dispatch(setIsSearch(true));
    }
  };
  return (
    <form
      className="search-box w-1/3 fixed top-3 left-1/2 -translate-x-1/2"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="pb-2 flex items-center relative">
        <input
          type="search"
          placeholder="Search here..."
          className="rounded-tr-none rounded-br-none border  text-sm py-2 "
          ref={search}
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          className="rounded text-[16px] p-2.5 border border-accent rounded-tl-none rounded-bl-none border-l-0 bg-accentDark text-white hover:bg-accentDark hover:border-accentDark"
        >
          <FaSearch />
        </button>

        {store.isSearch && (
          <p className="absolute top-[10px] right-24">
            Result: {isFetching ? "Searching..." : result?.[0].count}
          </p>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
