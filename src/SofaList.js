import React, { useState} from 'react';
import './bootstrap.min.css';
import Loading from './Loading';
import axios from 'axios'; 
import './DivanList.css';

const DivanList = () => {
  const [divanData, setDivanData] = useState([]); 
  const [isLoadingData, setIsLoadingData] = useState(false); // кнопка load.....
  const [dataLoaded, setDataLoaded] = useState(false); // барои после нажатия удл кадани кнопка
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = () => {
    setIsLoadingData(true); 

    axios.get('https://course-api.com/javascript-store-products')
      .then((response) => {
        setDivanData(response.data);
        setIsLoadingData(false); 
        setButtonClicked(true);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
        setIsLoadingData(false);
      });
  };
const renderTableRows = () => {
    return divanData.map((divan) => (
      <tr key={divan.id}>
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
      {!dataLoaded && (
      <button onClick={fetchData} disabled={isLoadingData}>
        {isLoadingData ? 'Загрузка...' : 'Загрузить данные'}
      </button>)}
      {isLoadingData ? (
        <Loading />
      ) : (
        <table className="table table-striped">
          <thead>
          {buttonClicked && (
            <tr>
              <th>Компания</th>
              <th>ID</th>
              <th>Размер (см)</th>
              <th>Ширина (см)</th>
              <th>Высота (см)</th>
              <th>Цена</th>
              <th>Изображение</th>
            </tr>
          )}
          </thead>
        
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}
    </div>
  );
};

export default DivanList;
