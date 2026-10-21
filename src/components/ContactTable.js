import ContactRow from './ContactRow';

const ContactTable = ({ contacts, onToggleFavorite, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Họ tên</th>
        <th>Điện thoại</th>
        <th>Email</th>
        <th>Nhóm</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {contacts.length === 0 ? (
        <tr>
          <td colSpan={5}>Không có dữ liệu</td>
        </tr>
      ) : (
        contacts.map((c) => (
          <ContactRow
            key={c.id}
            contact={c}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))
      )}
    </tbody>
  </table>
);

export default ContactTable;
