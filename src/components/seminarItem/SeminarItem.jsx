import styles from './SeminarItem.module.css';

const SeminarItem = ({ seminar }) => {
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
    </div>
  );
};

export default SeminarItem;
