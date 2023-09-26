import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroContainerStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://miro.medium.com/v2/resize:fit:1018/1*iAu65xDmvpVdBJgps6EDEw.png")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90.5vh',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
  };

  const heroTitleStyle = {
    fontSize: '4rem',
    fontWeight: 700,
    marginBottom: '16px',
  };

  const heroDescriptionStyle = {
    fontSize: '2rem',
    marginBottom: '24px',
  };

  const actionButtonStyle = {
    fontSize: '1.6rem',
    backgroundColor: '#4c0e2b',
    color: '#fff',
    padding: '22px 34px',
    borderRadius: '99px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2b0d1c',
    },
  };

  return (
    //! I did this because of the typescript bug related to the flex direction
    <div style={{...heroContainerStyle, flexDirection: "column"}}>
      <Typography variant="h2" sx={heroTitleStyle}>
        Fake Shop
      </Typography>
      <Typography variant="h5" sx={heroDescriptionStyle}>
        Discover the best non-existent goods for your life.
      </Typography>
      <Button component={Link} to={"/products"} variant="contained" sx={actionButtonStyle}>
        Shop Now
      </Button>
    </div>
  );
};

export default Home;
