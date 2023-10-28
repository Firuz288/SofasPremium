import React, { useState } from 'react';
import './bootstrap.min.css';
import Loading from './Loading';
import axios from 'axios';
import './DivanList.css';

const DivanList = () => {
  const [divanData, setDivanData] = useState([]);
  const [selectedDivans, setSelectedDivans] = useState([]); // Список выбранных элементов
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = () => {
    setIsLoadingData(true);

    axios
      .get('https://course-api.com/javascript-store-products')
      .then((response) => {
        setDivanData([...divanData, ...response.data]);
        setIsLoadingData(false);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
        setIsLoadingData(false);
      });
  };

  const toggleSelect = (divanId) => {
    const isSelected = selectedDivans.includes(divanId);

    if (isSelected) {
      setSelectedDivans(selectedDivans.filter((id) => id !== divanId));
    } else {
      setSelectedDivans([...selectedDivans, divanId]);
    }
  };

  const deleteSelectedDivans = () => {
    const updatedDivanData = divanData.filter(
      (divan) => !selectedDivans.includes(divan.id)
    );

    setDivanData(updatedDivanData);
    setSelectedDivans([]); // Очищаем список выбранных элементов
  };

  const renderTableRows = () => {
    return divanData.map((divan) => (
      <tr key={divan.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedDivans.includes(divan.id)}
            onChange={() => toggleSelect(divan.id)}
          />
        </td>
        <td>{divan.fields.company}</td>
        <td>{divan.id}</td>
        <td>{divan.fields.image[0].size}</td>
        <td>{divan.fields.image[0].width}</td>
        <td>{divan.fields.image[0].height}</td>
        <td>${divan.fields.price / 100}</td>
        <td>
          <img
            src={divan.fields.image[0].url}
            alt={divan.category}
            className="img-fluid img-thumbnail"
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1>Информация о диванах</h1>
      <button onClick={fetchData} disabled={isLoadingData} style={{marginRight: 185,}}>
        {isLoadingData ? 'Загрузка...' : 'Добавить новые данные'}
      </button>
      {isLoadingData ? (
        <Loading />
      ) : (
        <div>
          <button onClick={deleteSelectedDivans} style={{marginLeft: 10, marginTop:-28, position:'absolute'}}>Удалить выбранные</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Выбрать</th>
                <th>Компания</th>
                <th>ID</th>
                <th>Размер (см)</th>
                <th>Ширина (см)</th>
                <th>Высота (см)</th>
                <th>Цена</th>
                <th>Изображение</th>
              </tr>
            </thead>

            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DivanList;
