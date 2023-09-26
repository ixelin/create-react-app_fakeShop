import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  if(!user) {
    return <Navigate to='/'/>
  }
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4">
          Profile of {user.name.firstname} {user.name.lastname}
        </Typography>
        <Divider style={{ margin: '1.5rem 0' }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">User Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Email: ${user.email}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Username: ${user.username}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Phone: ${user.phone}`} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Address</Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Street: ${user.address.street}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Number: ${user.address.number}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`City: ${user.address.city}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Zipcode: ${user.address.zipcode}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Geolocation Lat: ${user.address.geolocation.lat}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Geolocation Long: ${user.address.geolocation.long}`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
