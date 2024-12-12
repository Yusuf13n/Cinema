import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import style from "./FilmsDetail.module.css";
import { db, auth } from "../../Pages/Forma/FireBase/firebase.config"; // Импортируем настройки Firebase
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore"; // Импортируем Firestore методы
import { onAuthStateChanged} from "firebase/auth"; // Импортируем нужные методы Firebase
import { useAppSelector } from "../../Hooks";
import { useEffect, useState } from "react";

export const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<string[]>([]); // Состояние для отзывов
  const [newReview, setNewReview] = useState<string>(""); // Состояние для нового отзыва
  const user = useAppSelector((state) => state.auth.user)

  const navigate = useNavigate();

  const film = useSelector((state: RootState) =>
    state.films.films.find((film) => film.id === parseInt(id || "", 10))
  );

  useEffect(() => {
    if (id) {
      const reviewsCollection = collection(db, "reviews");
      const q = query(reviewsCollection, where("filmId", "==", id));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reviewsData: string[] = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push(doc.data().review);
        });
        setReviews(reviewsData);
      });

      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
    });

    return () => unsubscribe();
  }, []);

  const handleAddReview = async () => {
    try {
      await addDoc(collection(db, "reviews"), {
        filmId: id,
        review: newReview,
        timestamp: new Date(),
      });
      setNewReview("");
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const handleGoogleLogin = () => {
    navigate("/Auth")
  }

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

      {user ? (
        <div className={style.reviewSection}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Leave a review..."
            className={style.reviewInput}
          ></textarea>
          <button onClick={handleAddReview} className={style.submitReviewBtn}>
          Отправить отзыв
          </button>
        </div>
      ) : (
        <div className={style.loginPrompt}>
          <p>Оставить отзыв</p>
          <button onClick={handleGoogleLogin}>Отзывы</button>
        </div>
      )}

      <div className={style.reviews}>
        <h3>Отзывы:</h3>
        {reviews.length === 0 ? (
          <p>Войдите чтобы оставить отзыв</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className={style.review}>
              <p>{review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
