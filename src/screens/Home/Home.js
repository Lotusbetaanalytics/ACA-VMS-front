import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero1.png";
import logo from "../../assets/Logo-ACA.svg";
import { Carousel, Button } from "react-bootstrap/";
import "./home.css";

const Home = () => {
  return (
    <div className="home__container">
      <Header />
      <div className="hero__grid">
        <div className="hero__carousel">
          {/* <HomeCarousel /> */}
          <h1>Manage your visitors and their visits all in one place.</h1>
          <ol>
            <li>Pre Invite your guests.</li>
            <li>Track their status</li>
            <li>Real Time Email/SMS notification</li>
          </ol>
          <div
            className="logintext"
            style={{ display: "flex", gridGap: "20px" }}
          >
            <Link to="/frontdesk/login">
              <Button variant="warning">Front Desk Login</Button>
            </Link>
            <Link to="/staff/login">
              <Button variant="outline-warning">Staff Login</Button>
            </Link>
          </div>
        </div>
        <div className="hero__image">
          <img src={hero} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const Header = () => {
  return (
    <div className="header__container">
      <div className="header__logo">
        <img src={logo} alt="ACA" />
      </div>
      <div
        className="header__text"
        style={{ position: "absolute", left: "80%", top: "20%" }}
      >
        <div className="logintext" style={{ display: "flex", gridGap: "20px" }}>
          <Link to="/frontdesk/login">Front Desk Login</Link>
          <Link to="/staff/login">Staff Login</Link>
        </div>
      </div>
    </div>
  );
};

export const HomeCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
