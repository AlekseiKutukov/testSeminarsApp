import styles from './SeminarItem.module.css';
import { useState } from 'react';

const SeminarItem = ({ seminar, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true); // Показываем окно подтверждения
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Закрываем окно подтверждения без удаления
  };

  const handleConfirmDelete = () => {
    // Отправляем запрос на сервер для удаления семинара
    fetch(`http://localhost:3015/seminars/${seminar.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDelete(seminar.id); // Уведомляем родительский компонент
        } else {
          return response.text(); // Получаем тело ошибки
        }
      })
      .then((errorMessage) => {
        if (errorMessage) {
          alert(`Ошибка при удалении семинара: ${errorMessage}`);
        }
      })
      .catch((error) => {
        alert('Ошибка: ' + error.message);
      });
    setShowConfirm(false); // Закрываем окно подтверждения после выполнения
  };

  return (
    <div className={styles.card}>
      <img src={seminar.photo} alt={seminar.title} />
      <h2>{seminar.title}</h2>
      <p>{seminar.description}</p>
      <p>
        <strong>Дата:</strong> {seminar.date}
      </p>
      <p>
        <strong>Время:</strong> {seminar.time}
      </p>

      <button onClick={handleDeleteClick}>Удалить</button>

      {showConfirm && (
        <div className={styles.confirmDelete}>
          <p>Вы уверены, что хотите удалить семинар "{seminar.title}"?</p>
          <button onClick={handleConfirmDelete}>Да</button>
          <button onClick={handleCancelDelete}>Отмена</button>
        </div>
      )}
    </div>
  );
};

export default SeminarItem;
