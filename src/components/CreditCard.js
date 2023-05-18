import React from 'react';
import styles from '../assets/styles/components/CreditCard.module.scss';

function CreditCard({ card, selectCard, deleteCard, token_card }) {
  return (
    <div className={styles.creditCardBody}>
      <div className={styles.creditCardText}>
        <div>{card.mask}</div>
      </div>
      {deleteCard ? (
        <button className={styles.creditCardButtonDelete} onClick={() => deleteCard(card)}>
          delete card
        </button>
      ) : (
        <button
          className={`${styles.creditCardButton}${card.token === token_card ? '-selected' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            selectCard(card);
          }}
        ></button>
      )}
    </div>
  );
}

export default CreditCard;
