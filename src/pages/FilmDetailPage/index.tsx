import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { db, auth } from "../../shared/consts/firebase/firebase.config"; // Импортируем настройки Firebase
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore"; // Импортируем Firestore методы
import { User, onAuthStateChanged } from "firebase/auth"; // Импортируем нужные методы Firebase
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";

import style from "./ui.module.css";

interface Reviev {
  review: string;
  userName: string;
  userEmail: string;
}

export const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Reviev[]>([]);
  const [newReview, setNewReview] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const film = useSelector((state: RootState) =>
    state.films.films.find((film) => film.id === parseInt(id || "", 10))
  );

  useEffect(() => {
    if (id) {
      const reviewsCollection = collection(db, "reviews");
      const q = query(reviewsCollection, where("filmId", "==", id));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reviewsData: { review: string; userName: string; userEmail: string }[] = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push(doc.data() as { review: string; userName: string; userEmail: string });
        });
        setReviews(reviewsData); // Теперь setReviews ожидает массив объектов
      });
  
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {});

    return () => unsubscribe();
  }, []);

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      alert("Вы не можете оставить пустой отзыв!!!");
      return;
    }

    try {
      if (!user) {
        alert("Вы должны быть авторизованы, чтобы оставить отзыв!");
        return;
      }
      
      await addDoc(collection(db, "reviews"), {
        filmId: id,
        review: newReview,
        userEmail: user.email || "",
        userName: user?.name || "Anonymous", 
        timestamp: new Date(),
      });

      setNewReview("");
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const handleLogin = () => {
    navigate("/Auth");
  };

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.imageContainer}>
          <img src={film.imageUrl} alt={film.title} className={style.image} />
        </div>

        <div className={style.details}>
          <h1 className={style.title}>{film.title}</h1>
          <p className={style.rating}>Rating: {film.rating}</p>
          <p className={style.description}>{film.description}</p>

          <div className={style.videoContainer}>
            <iframe
              width="560"
              height="315"
              src={film.srcVideo}
              title="Film Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className={style.reviewBlock}>
        <h3>Оставьте свой отзыв:</h3>
        {user ? (
          <div className={style.reviewSection}>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className={style.reviewInput}
            ></textarea>
            <button onClick={handleAddReview} className={style.submitReviewBtn}>
              Submit
            </button>
          </div>
        ) : (
          <div className={style.loginPrompt}>
            <p>Чтобы оставить отзыв, вам необходимо войти в систему.</p>
            <button onClick={handleLogin}>Авторизоваться</button>
          </div>
        )}

        <div className={style.reviews}>
          <h3>Отзывы пользователей:</h3>
          {reviews.length === 0 ? (
            <p>Пока нет отзывов. Оставьте свой отзыв первым!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className={style.reviewCard}>
                <p>{review.userName}</p>
                <p>{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
