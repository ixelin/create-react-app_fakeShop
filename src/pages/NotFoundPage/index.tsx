import './style.css'; 
import img from "./404.jpg"

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img
        src={img}
        alt="Not Found"
        className="background-image"
      />
    </div>
  );
};

export default NotFoundPage;
