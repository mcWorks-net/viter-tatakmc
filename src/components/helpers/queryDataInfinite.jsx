import { queryData } from "./queryData";

export const queryDataInfinite = (
  urlSearch,
  urlList,
  isSearch = false,
  searchData = ""
) => {
  return queryData(
    isSearch ? urlSearch : urlList,
    isSearch ? "post" : "get",
    isSearch ? { searchValue: searchData.searchValue, id: searchData.id } : {}
  );
};
