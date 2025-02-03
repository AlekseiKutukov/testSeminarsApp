import { useState, useEffect } from 'react';
import styles from './SeminarList.module.css';
import SeminarItem from './../seminarItem/SeminarItem';

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3015/seminars')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setSeminars(data);
          setLoading(false);
        }, 1000); // Задержка 1 секунды для имитации загрузки
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteSeminar = (id) => {
    setSeminars(seminars.filter((seminar) => seminar.id !== id));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  return (
    <>
      <div className={styles.list}>
        {seminars.map((seminar) => (
          <SeminarItem
            key={seminar.id}
            seminar={seminar}
            onDelete={handleDeleteSeminar}
          />
        ))}
      </div>
    </>
  );
};

export default SeminarList;
