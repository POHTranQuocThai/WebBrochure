import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import HeroVideo from "../assets/videos/HeroVideo.mp4";
import cloud from "../assets/img/cloud.png";

const Hero = () => {
    const { t } = useTranslation();
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
                {t('hero.videoFallback', 'Your browser does not support background video.')}
            </video>

            {/* Nội dung */}
            <div className="hero-content">
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.subtitle')}</p>
            </div>
            <div className="bg-decoration bg-decoration-1">🌿</div>
            <div className="bg-decoration bg-decoration-2">✨</div>

        </Section>
    );
};

export default Hero;
