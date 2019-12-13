import React, { useState, useMemo } from "react";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { objectFilter, customSort } from "../../helpers/utility";
import CourseList from "../courses/CourseList";
import AuthorList from "../authors/AuthorList";

const CustomList = ({ data, dataType, handleDeleteData, filterProps }) => {
  const pageSize = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState({ key: "id", asc: true });

  const dataFilterMemo = useMemo(
    () => objectFilter(data, searchQuery, filterProps),
    [data, searchQuery, filterProps]
  );
  const filterDatas = customSort(
    !searchQuery ? data : dataFilterMemo,
    sortBy.key,
    sortBy.asc
  );

  const displayDatas = filterDatas.slice(
    pageSize * (page - 1),
    pageSize * page
  );

  const handleTHClick = key => {
    setSortBy({ key, asc: sortBy.key === key ? !sortBy.asc : true });
  };

  return (
    <>
      <SearchInput
        name="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder={`Search ${dataType}...`}
      />
      {displayDatas.length > 0 && (
        <>
          {dataType === "Course" && (
            <CourseList
              displayCourses={displayDatas}
              totalCourse={filterDatas.length}
              onDeleteClick={handleDeleteData}
              onTHClick={handleTHClick}
            />
          )}
          {dataType === "Author" && (
            <AuthorList
              displayAuthors={displayDatas}
              totalAuthors={filterDatas.length}
              onDeleteClick={handleDeleteData}
              onTHClick={handleTHClick}
            />
          )}
          <Pagination
            dataLength={filterDatas.length}
            pageSize={pageSize}
            onPaginationClicked={page => setPage(page)}
          />
        </>
      )}
    </>
  );
};

export default CustomList;
