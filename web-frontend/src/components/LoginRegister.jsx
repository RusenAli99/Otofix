import React, { useState } from 'react';

function LoginRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.msg || 'İşlem başarılı');

        if (isLogin && data.token) {
          // Token varsa sakla
          localStorage.setItem('token', data.token);
          window.location.href = '/chat'; // Chatbot ekranına yönlendir
        }
      } else {
        alert(data.msg || 'Bir hata oluştu.');
      }
    } catch (error) {
      console.error('Sunucu hatası:', error);
      alert('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.brand}>🚗 OtoFix</h1>
        <p style={styles.slogan}>Yedek Parçanı Hızla Bul, Arızanı Hemen Çöz</p>

        <h2 style={styles.title}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Ad Soyad"
            onChange={handleChange}
            style={styles.input}
          />
        )}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={styles.switch}>
          {isLogin ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(to right, #f7f8fc, #dee8f3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px 35px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  brand: {
    fontSize: '28px',
    color: '#007bff',
    marginBottom: '8px',
  },
  slogan: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '25px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  switch: {
    marginTop: '15px',
    color: '#007bff',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginRegister;
