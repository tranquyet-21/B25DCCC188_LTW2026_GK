import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ onAdd }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', group: 'Bạn bè' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, group } = form;
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onAdd({ name: name.trim(), phone: phone.trim(), email: email.trim(), group });
    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <h2>Thêm liên hệ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Họ tên</label>
          <input id="name" type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="number" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="group">Nhóm</label>
          <select id="group" name="group" value={form.group} onChange={handleChange}>
            {GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddContact;
