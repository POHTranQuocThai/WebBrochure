/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import './../index.css'
import i1 from "../assets/img/highlights/i1.png";
import i2 from "../assets/img/highlights/i2.png";
import i3 from "../assets/img/highlights/i3.png";
import i4 from "../assets/img/highlights/i4.png";
import i5 from "../assets/img/highlights/i5.png";
import i6 from "../assets/img/highlights/i6.png";
import i7 from "../assets/img/highlights/i7.png";
import i8 from "../assets/img/highlights/i8.png";
import i9 from "../assets/img/highlights/i9.png";
import i10 from "../assets/img/highlights/i10.png";
import i11 from "../assets/img/highlights/i11.png";
import i12 from "../assets/img/highlights/i12.png";
import i13 from "../assets/img/highlights/i13.png";

import { useEffect, useState } from "react";


const reviews = [
    {
        img: i1,
    },
    {
        img: i2,
    },
    {
        img: i3,
    },
    {
        img: i4,
    },
    {
        img: i5,
    },
    {
        img: i6,
    },
    {
        img: i7,
    },
    {
        img: i8,
    },
    {
        img: i9,
    },
    {
        img: i10,
    },
    {
        img: i11,
    },
    {
        img: i12,
    },
    {
        img: i13,
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
const thirdRow = reviews.slice(0, reviews.length / 2)
const fourthRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
}: {
    img: string
}) => {
    return (
        <figure
            className={cn(
                // Bigger square card, image-only
                "relative overflow-hidden rounded-xl cursor-pointer -skew-x-6",
                // unified size via CSS variable so all cards are equal
                "h-[var(--card-size)] w-[var(--card-size)]",
            )}
        >
            <img
        className="h-full w-full object-cover"
        alt="highlight"
                src={img}
                loading="lazy"
                decoding="async"
            />
        </figure>
    )
}

export function Marquee3D() {
     const [cardSize, setCardSize] = useState("16rem");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) setCardSize("9rem");      // mobile
      else if (window.innerWidth < 1024) setCardSize("12rem"); // tablet
      else setCardSize("16rem");                              // desktop
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
    return (
     <div
  className="
    relative flex h-[34rem] w-full items-center justify-center overflow-hidden"
  style={{
    ['--card-size' as any]: cardSize, // fallback khi Tailwind chưa load
  }}
>

            {/* Parallelogram wrapper */}
            <div
                className="relative mx-auto h-[30rem] w-[min(1200px,90vw)] overflow-hidden [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] skew-x-6"
                style={{ perspective: '800px' }}
            >
                <div
  className="
    flex h-full flex-row items-center justify-center gap-2 sm:gap-3 md:gap-6 [perspective:300px]
    md:[transform:translateX(-40px)_translateZ(-60px)_rotateX(12deg)_rotateY(-8deg)_rotateZ(8deg)]
  "
>

  {/* Outer columns up (default), inner columns down (reverse) */}
  {/* Cột 1 – Ẩn trên mobile */}
  <Marquee
    pauseOnHover
    vertical
    className="hidden md:!flex transform-gpu will-change-transform ease-linear [--duration:17s]"
  >
    {firstRow.map((review) => (
      <ReviewCard key={review.img} {...review} />
    ))}
  </Marquee>
  <Marquee reverse pauseOnHover className="transform-gpu will-change-transform ease-linear [--duration:18s]" vertical>
    {secondRow.map((review) => (
      <ReviewCard key={review.img} {...review} />
    ))}
  </Marquee>
  <Marquee reverse pauseOnHover className="transform-gpu will-change-transform ease-linear [--duration:16s]" vertical>
    {thirdRow.map((review) => (
      <ReviewCard key={review.img} {...review} />
    ))}
  </Marquee>
  {/* Cột 4 – Ẩn trên mobile */}
  <Marquee
    pauseOnHover
    className="hidden md:!flex transform-gpu will-change-transform ease-linear [--duration:19s]"
    vertical
  >
    {fourthRow.map((review) => (
      <ReviewCard key={review.img} {...review} />
    ))}
  </Marquee>
</div>

                {/* Edge fades inside the parallelogram */}
                <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
                <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
        </div>
    )
}
