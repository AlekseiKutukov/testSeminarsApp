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
        </ol>
      </footer>
    </>
  );
}

export default App;
