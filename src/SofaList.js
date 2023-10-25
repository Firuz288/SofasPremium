import React, { useState, useEffect } from 'react';
import './bootstrap.min.css';
import Loading from './Loading';
import divanData from './divanData.json';
import './DivanList.css';

const DivanList = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция задержки загрузки данных на 2 секунды.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
      {isLoading ? ( 
        <Loading />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
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
      )}
    </div>
  );
};

export default DivanList;
