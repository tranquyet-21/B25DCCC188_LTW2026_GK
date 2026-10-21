import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const STORAGE_KEY = 'gk_contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setContacts(JSON.parse(saved));
        setLoading(false);
        return;
      }
    } catch (err) {
      localStorage.removeItem(STORAGE_KEY);
    }

    const controller = new AbortController();
    axios
      .get('/data/contacts.json', { signal: controller.signal })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || error) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts, loading, error]);

  const handleToggleFavorite = (id) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = (data) => {
    setContacts((prev) => {
      const nextId = prev.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      return [...prev, { id: nextId, ...data, favorite: false }];
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="contacts/new" element={<AddContact onAdd={handleAdd} />} />
        <Route path="contacts/:id" element={<ContactDetail contacts={contacts} />} />
      </Route>
    </Routes>
  );
};

export default App;
