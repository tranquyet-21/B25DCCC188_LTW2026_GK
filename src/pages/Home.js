const Home = ({ contacts }) => {
  const total = contacts.length;
  const favorites = contacts.reduce((sum, c) => (c.favorite ? sum + 1 : sum), 0);
  const gmails = contacts.filter((c) => c.email.endsWith('@gmail.com')).length;

  return (
    <div>
      <h1>Danh bạ</h1>
      <p>Chào mừng bạn đến với ứng dụng Danh bạ điện thoại.</p>
      <p>Tổng số liên hệ: {total}</p>
      <p>Số liên hệ yêu thích: {favorites}</p>
      <p>Số liên hệ Gmail: {gmails}</p>
    </div>
  );
};

export default Home;
