import React from 'react';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


import Isle from 'Images/isle';
import Isle2 from 'Images/isle2';
import Longos from 'Images/longos';
 
import './Landing.css';

const Landing = ()=>{
    const carouselConfig = {
        autoPlay:true,
        infiniteLoop:true,
        interval:10000,
        showThumbs:false,
        showArrows:true,
        showIndicators:false,
        dynamicHeight:true,
        showStatus:false,
        centerSlidePercentage:100
    }

    return (
        <div className="landing-page">
            <div className="carousel-section">
                <Carousel {...carouselConfig}>
                    <div className="test">
                        <img alt="isle-image-1" src={Isle} />
                    </div>
                    <div  className="test">
                        <img alt="isle-image-2" src={Isle2} />
                    </div>
                </Carousel>    
            </div>
            <div className="banner-section">
                <a href="https://www.longos.com/"> 
                    <img src={Longos} alt="longos" className="longos-banner" />
                </a>
            </div>
        </div>
    );
}

export default Landing; 