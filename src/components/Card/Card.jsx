import React from "react";
import styles from "./Card.module.css";
import FavoritesIcon from "../../assets/sidebar/FavoritesIcon";
import FavoriteActiveIcon from "../../assets/FavoriteActiveIcon"
import Tags from "../../UI/Tags/Tags";

const Card = ({isFavorite=false}) => {
  return (
    <div className={styles.cardWrap}>
        <div className={styles.titleandFav}>
        <h2>Стажер Frontend-разработчик в компанию SlushRoman</h2>
        <button>  {isFavorite ?<FavoriteActiveIcon/> : <FavoritesIcon/>}</button>
        </div>
        <Tags tagsText={'можно удаленно'}/>
        <Tags tagsText={'6 месяцев'}/>
        <Tags tagsText={'оплачиваемая'}/>

      <p className={styles.price}>15 000c</p>
      <button className={styles.buttonWant}>Хочу стажироваться</button>
    </div>
  );
};

export default Card;
