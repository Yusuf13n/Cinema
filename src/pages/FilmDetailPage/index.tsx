import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; // Импорт Firestore методов
import style from "./ui.module.css";
import { db } from "@/shared/consts/firebase/firebase.config";
import { Rate } from "antd";


interface Review {
  review: string;
  userName: string;
  userEmail: string;
}

interface HandleOpenProps {
  handleOpen: (title: string) => void;
}

export const FilmDetailPage = ({ handleOpen }: HandleOpenProps) => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const film = useSelector((state: RootState) =>
    state.films.films.find((film) => film.id === parseInt(id || "", 10))
  );

  // Загружаем отзывы из Firestore при монтировании компонента
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("filmId", "==", id));
        const querySnapshot = await getDocs(q);
        const reviewsList: Review[] = [];
        querySnapshot.forEach((doc) => {
          reviewsList.push(doc.data() as Review); 
        });
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      alert("Вы не можете оставить пустой отзыв!!!");
      return;
    }

    if (!user) {
      alert("Вы должны быть авторизованы, чтобы оставить отзыв!");
      return;
    }

    const newReviewObj: Review = {
      review: newReview,
      userName: user.name || "Anonymous",
      userEmail: user.email || "",
    };

    try {
      await addDoc(collection(db, "reviews"), {
        filmId: id,
        ...newReviewObj,
      });
      setReviews((prevReviews) => [...prevReviews, newReviewObj]); 
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
          <p className={style.restrictions}>{film.restrictions}</p>
          <p className={style.description}>{film.description}</p>
          <Rate className={style.rate} allowHalf defaultValue={2.5} />
          <button
            className={style.ticketsButton}
            onClick={() => handleOpen(film.title)}
          >
            Tickets
          </button>

          <div className={style.videoContainer}>
            <iframe
              width="750"
              height="400"
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
        <h3 className={style.titleRevievCard}>Leave your review:</h3>
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
            <p>Log in to leave a review</p>
            <button onClick={handleLogin}>Log in</button>
          </div>
        )}

        <div className={style.reviews}>
          <h3>User reviews:</h3>
          <div className={style.blockReviewCard}>
            {reviews.length === 0 ? (
              <p>Be the first to review!</p>
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
    </div>
  );
};
