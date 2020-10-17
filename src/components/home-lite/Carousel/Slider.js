import React from "react";

const Slider = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ width: "100%" }}>
          <img
            className="d-block w-100"
            src="https://images.wallpaperscraft.com/image/office_design_desks_computers_graphics_80537_3840x2160.jpg"
            alt="First slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h1>
              <strong> </strong>
            </h1>
            <p> </p>
          </div>
        </div>
        <div className="carousel-item" style={{ width: "100%" }}>
          <img
            className="d-block w-100"
            src="https://images.wallpaperscraft.com/image/desk_office_chair_design_meeting_80711_3840x2160.jpg"
            alt="Second slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5> </h5>
            <p> </p>
          </div>
        </div>
        <div className="carousel-item" style={{ width: "100%" }}>
          <img
            className="d-block w-100"
            src="https://s1.1zoom.me/b5050/575/363027-admin_3840x2160.jpg"
            alt="Third slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5> </h5>
            <p> </p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Slider;
