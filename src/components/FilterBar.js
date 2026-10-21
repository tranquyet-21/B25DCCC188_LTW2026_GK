import { GROUPS } from '../data';

const FilterBar = ({ keyword, group, onKeywordChange, onGroupChange }) => (
  <div className="filter-bar">
    <label htmlFor="search">Tìm kiếm</label>
    <input
      id="search"
      type="text"
      placeholder="Tìm theo tên hoặc số điện thoại"
      value={keyword}
      onChange={(e) => onKeywordChange(e.target.value)}
    />
    <label htmlFor="groupFilter">Nhóm</label>
    <select
      id="groupFilter"
      value={group}
      onChange={(e) => onGroupChange(e.target.value)}
    >
      <option value="Tất cả">Tất cả</option>
      {GROUPS.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;
