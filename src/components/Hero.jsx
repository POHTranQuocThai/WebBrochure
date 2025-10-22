import { useEffect, useRef } from "react";
import { Section } from "./Section";
import HeroVideo from "../assets/videos/HeroVideo.mp4";
import cloud from "../assets/img/cloud.png";

const Hero = () => {

    return (
        <Section id="home" className="section hero-section">
            {/* Video nền */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="bg-video"
            >
                <source src={HeroVideo} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video nền.
            </video>

            {/* Nội dung */}
            <div className="hero-content">
                <h1>Chào mừng bạn!</h1>
                <p>Đây là video nền chạy mượt, không logo, không khung YouTube.</p>
            </div>
            <div className="bg-decoration bg-decoration-1">🌿</div>
            <div className="bg-decoration bg-decoration-2">✨</div>

        </Section>
    );
};

export default Hero;
