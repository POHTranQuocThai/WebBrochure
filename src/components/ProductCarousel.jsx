import { useState, useRef } from "react";
import "../assets/css/carousel.css";

export default function ProductCarousel({ products }) {
    const [current, setCurrent] = useState(0);
    const startX = useRef(0);
    const deltaX = useRef(0);

    // Bắt đầu kéo
    const handleMouseDown = (e) => {
        startX.current = e.clientX || e.touches[0].clientX;
    };

    // Kéo di chuyển
    const handleMouseMove = (e) => {
        if (startX.current === 0) return;
        const x = e.clientX || e.touches[0].clientX;
        deltaX.current = x - startX.current;
    };

    // Thả chuột → xác định trượt sang slide nào
    const handleMouseUp = () => {
        if (deltaX.current > 80 && current > 0) {
            setCurrent(current - 1);
        } else if (deltaX.current < -80 && current < products.length - 1) {
            setCurrent(current + 1);
        }
        startX.current = 0;
        deltaX.current = 0;
    };

    const getClassName = (index) => {
        const diff = index - current;
        if (diff === 0) return "carousel-item center";
        if (diff === -1) return "carousel-item left1";
        if (diff === -2) return "carousel-item left2";
        if (diff === 1) return "carousel-item right1";
        if (diff === 2) return "carousel-item right2";
        return "carousel-item hidden";
    };

    return (
        <div className="carousel-container">
            <div
                className="carousel-stage"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            >
                {products.map((p, index) => (
                    <div
                        key={index}
                        className={getClassName(index)}
                        onClick={() => setCurrent(index)} // click chọn slide → center
                    >
                        <img src={p.image} alt={p.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
