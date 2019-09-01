import React from 'react';
function LayoutBackground() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="BackgroundImageLayout">
						<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img className="d-block w-100 " src="/images/Interfaz Layout2Peq.png" alt="First slide" id="fotoCarousel" />
								</div>
								<div className="carousel-item">
									<img className="d-block w-100" src="/images/Interfaz Layout6-2Peq.png" alt="Second slide" id="fotoCarousel" />
								</div>
								{/* <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Third slide"/>
    </div> */}
							</div>
							<a
								className="carousel-control-prev"
								href="#carouselExampleControls"
								role="button"
								data-slide="prev"
							>
								<span className="carousel-control-prev-icon" aria-hidden="true" />
								<span className="sr-only">Previous</span>
							</a>
							<a
								className="carousel-control-next"
								href="#carouselExampleControls"
								role="button"
								data-slide="next"
							>
								<span className="carousel-control-next-icon" aria-hidden="true" />
								<span className="sr-only">Next</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default LayoutBackground;
