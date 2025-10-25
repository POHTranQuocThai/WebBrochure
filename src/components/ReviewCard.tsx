/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import './../index.css'
import hl1 from "../assets/img/highlights/hl1.jpg";
import hl2 from '../assets/img/highlights/hl2.jpg'
import hl3 from "../assets/img/highlights/hl3.jpg";
import hl4 from "../assets/img/highlights/hl4.jpg";
import hl5 from "../assets/img/highlights/hl5.jpg";
import hl6 from "../assets/img/highlights/hl6.jpg";
import hl7 from "../assets/img/highlights/hl7.jpg";
import hl8 from "../assets/img/highlights/hl8.jpg";
import hl9 from "../assets/img/highlights/hl9.jpg";
import hl10 from "../assets/img/highlights/hl10.jpg";


const reviews = [
    {
        img: hl1,
    },
    {
        img: hl2,
    },
    {
        img: hl3,
    },
    {
        img: hl4,
    },
    {
        img: hl5,
    },
    {
        img: hl6,
    },
    {
        img: hl7,
    },
    {
        img: hl8,
    },
    {
        img: hl9,
    },
    {
        img: hl10,
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
    return (
        <div
            className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden"
            style={{
                // unified size for ALL cards (bigger)
                ['--card-size' as any]: '16rem',
            }}
        >
            {/* Parallelogram wrapper */}
            <div
                className="relative mx-auto h-[30rem] w-[min(1200px,90vw)] overflow-hidden [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] skew-x-6"
                style={{ perspective: '800px' }}
            >
                <div
                    className="flex h-full flex-row items-center justify-center gap-6 [perspective:300px]"
                    style={{
                        transform:
                            // soften 3D to reduce aliasing/jitter
                            'translateX(-40px) translateZ(-60px) rotateX(12deg) rotateY(-8deg) rotateZ(8deg)',
                    }}
                >
                    {/* Outer columns up (default), inner columns down (reverse) */}
                    <Marquee pauseOnHover vertical className="transform-gpu will-change-transform ease-linear [--duration:17s]">
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
                    <Marquee pauseOnHover className="transform-gpu will-change-transform ease-linear [--duration:19s]" vertical>
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
