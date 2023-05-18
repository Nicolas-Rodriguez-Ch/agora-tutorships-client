import React, { useState } from 'react';
import styles from '../assets/styles/components/CategoriesBar.module.scss';

function CategoriesBar({ Categories, setFilter }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className={styles.categoriesContainer}>
      <select
        placeholder="categories"
        name="categories"
        className={styles.categoriesSelectFocus}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option hidden>Choose an area</option>
        {Categories.map((category) => (
          <option key={category._id} value={category.subject}>
            {category.subject}
          </option>
        ))}
      </select>

      {Categories.map((e, i) => (
        <button
          className={selected === e.subject ? styles.categoryButtonSelected : styles.categoryButton}
          key={i}
          onClick={() => {
            setFilter(e.subject);
            setSelected(e.subject);
          }}
        >
          {e.subject}
        </button>
      ))}
    </main>
  );
}

export { CategoriesBar };
