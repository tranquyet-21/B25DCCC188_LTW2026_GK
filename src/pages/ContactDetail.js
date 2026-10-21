import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [endedAfter, setEndedAfter] = useState(null);

  useEffect(() => {
    if (!isCalling) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isCalling]);

  const contact = contacts.find((c) => c.id === Number(id));

  const handleCall = () => {
    setSeconds(0);
    setEndedAfter(null);
    setIsCalling(true);
  };

  const handleEnd = () => {
    setIsCalling(false);
    setEndedAfter(seconds);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
      {!contact ? (
        <p>Không tìm thấy liên hệ.</p>
      ) : (
        <div>
          <h2>{contact.name}</h2>
          <p>Họ tên: {contact.name}</p>
          <p>Số điện thoại: {contact.phone}</p>
          <p>Email: {contact.email}</p>
          <p>Nhóm: {contact.group}</p>
          <p>Yêu thích: {contact.favorite ? 'Có' : 'Không'}</p>

          {isCalling ? (
            <div>
              <p>Đang gọi... {seconds} giây</p>
              <button onClick={handleEnd}>Kết thúc</button>
            </div>
          ) : (
            <button onClick={handleCall}>Gọi điện</button>
          )}
          {endedAfter !== null && !isCalling && (
            <p>Cuộc gọi kết thúc sau {endedAfter} giây</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDetail;
