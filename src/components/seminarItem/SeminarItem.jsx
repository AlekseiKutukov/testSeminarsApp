import styles from './SeminarItem.module.css';
import { useState } from 'react';

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedSeminar, setEditedSeminar] = useState({ ...seminar });

  // Открыть окно редактирования
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  // Закрыть окно редактирования
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedSeminar({ ...seminar }); // Сбросить изменения
  };

  // Обработчик изменения полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSeminar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Подтверждение редактирования и отправка на сервер
  const handleConfirmEdit = () => {
    fetch(`http://localhost:3015/seminars/${seminar.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedSeminar),
    })
      .then((response) => {
        if (response.ok) {
          onEdit(editedSeminar); // Уведомляем родительский компонент
          setShowEditModal(false);
        } else {
          alert('Ошибка при редактировании семинара');
        }
      })
      .catch((error) => {
        alert('Ошибка: ' + error.message);
      });
  };

  // Открытие окна подтверждения удаления
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

      <button onClick={handleEditClick}>Редактировать</button>
      <button onClick={handleDeleteClick}>Удалить</button>

      {/* Модальное окно для редактирования */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Редактировать семинар</h3>
            <label>
              Название:
              <input
                type="text"
                name="title"
                value={editedSeminar.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Описание:
              <textarea
                name="description"
                value={editedSeminar.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Дата:
              <input
                type="date"
                name="date"
                value={editedSeminar.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Время:
              <input
                type="time"
                name="time"
                value={editedSeminar.time}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Фото:
              <textarea
                name="photoURL"
                value={editedSeminar.photo}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleConfirmEdit}>Сохранить</button>
            <button onClick={handleCloseEditModal}>Отмена</button>
          </div>
        </div>
      )}

      {/* Окно подтверждения удаления */}
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
