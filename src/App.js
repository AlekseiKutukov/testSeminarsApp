import SeminarList from './components/seminarList/SeminarList';

function App() {
  return (
    <>
      <h1>Список семинаров</h1>
      <main>
        <SeminarList />
      </main>
      <footer>
        <h3>Выполненные пункты</h3>
        <ol>
          <li>Запрос данных</li>
          <li>Отрисовка списка семинаров</li>
          <li>Удаление семинара</li>
          <li>Редактирование семинара</li>
          <li>МОЖЕТ СТОИТ ВЫТАЩИТЬ КНОПКИ В ОТТДЕЛЬНЫЕ КОМПОНЕНТЫ???</li>
        </ol>

        <div>
          Потраченно времения: <br />
          1) 3.02.25 с 20.00-00.30 <br />
          2) 4.02.25 с 21.30-23.00
        </div>
      </footer>
    </>
  );
}

export default App;
