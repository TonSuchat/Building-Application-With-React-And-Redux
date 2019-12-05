import React, { useState, useMemo } from "react";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { objectFilter } from "../../helpers/utility";
import CourseList from "../courses/CourseList";
import AuthorList from "../authors/AuthorList";

const CustomList = ({ data, dataType, handleDeleteData, filterProps }) => {
  const pageSize = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const dataFilterMemo = useMemo(
    () => objectFilter(data, searchQuery, filterProps),
    [data, searchQuery, filterProps]
  );
  const filterDatas = !searchQuery ? data : dataFilterMemo;

  const displayDatas = filterDatas.slice(
    pageSize * (page - 1),
    pageSize * page
  );

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
            />
          )}
          {dataType === "Author" && (
            <AuthorList
              displayAuthors={displayDatas}
              totalAuthors={filterDatas.length}
              onDeleteClick={handleDeleteData}
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
