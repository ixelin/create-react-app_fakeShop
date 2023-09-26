import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router DOM
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { ModalTitle } from "../../enums/ModalTitle";
import BaseModal from "../modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cookies } from "../../App";
import { getUserCredentials } from "../../helpers/getUser";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<"" | ModalTitle>("");
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // @ts-ignore
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // @ts-ignore
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddProduct = () => {
    closeModal();
    setTitle(ModalTitle.create);
    openModal();
  };
  const handleLogout = async () => {
    handleCloseUserMenu()
    navigate("/")
    cookies.set("token", null)
    getUserCredentials(dispatch)
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4c0e2b" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMallIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              marginRight: "5%",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shoppp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/products"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Products</Typography>
              </MenuItem>
              <MenuItem onClick={handleAddProduct}>
                <Typography textAlign="center">Add Product</Typography>
              </MenuItem>
              {user ? null : (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/login"
                >
                  <Typography textAlign="center">Sign in</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <LocalMallIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shoppp
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "1.5rem",
              }}
            >
              Home
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/products"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "1.5rem",
              }}
            >
              Products
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleAddProduct}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "1.5rem",
              }}
            >
              Add Product
            </Button>
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* @ts-ignore */}
                  <Avatar alt={user.username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                component={Link}
                to="/login"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1.5rem",
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
        <BaseModal open={isModalOpen} onClose={closeModal} title={title} />
      </Container>
    </AppBar>
  );
};

export default Header;
