import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts, onToggleFavorite, onDelete }) => {
  const [keyword, setKeyword] = useState('');
  const [group, setGroup] = useState('Tất cả');

  const kw = keyword.trim().toLowerCase();
  const filtered = contacts.filter((c) => {
    const matchKeyword = c.name.toLowerCase().includes(kw) || c.phone.includes(kw);
    const matchGroup = group === 'Tất cả' || c.group === group;
    return matchKeyword && matchGroup;
  });

  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <FilterBar
        keyword={keyword}
        group={group}
        onKeywordChange={setKeyword}
        onGroupChange={setGroup}
      />
      <p>Tìm thấy {filtered.length} liên hệ</p>
      <ContactTable
        contacts={filtered}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactList;
