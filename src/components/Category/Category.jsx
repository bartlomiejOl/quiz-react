import React, { useState } from 'react'
import './Category.css'
import Questions from '../Questions/Questions';

function Category() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value)
  }

  const categories = ['Państwa - Stolice', 'Stolice - Państwa', 'Falgi państw', 'Liczba ludności']

  return (
    <div className='Category'>
      {!selectedCategory ? (
        <div className='divWithCategory'>
          <h1>Wybierz kategorie</h1>
          {categories.map((category) => {
            return (
            <button className='category' key={category} value={category} onClick={handleCategory}>{category}</button>
            )
          })}
        </div>
      ) : (
        <Questions category={selectedCategory}/>
      )}
    </div>
  )
}

export default Category