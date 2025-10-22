import React, { useEffect, useRef } from "react";

const YouTubeLoop = () => {
    const playerRef = useRef(null);
    const startTime = 20;
    const endTime = 60;

    useEffect(() => {
        // Tạo script API YouTube
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        // Khi API YouTube sẵn sàng
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("player", {
                height: "360",
                width: "640",
                videoId: "L9TbBuz5EtY", // ID video
                playerVars: {
                    controls: 1,
                    autoplay: 1,
                    mute: 1, // ✅ Tự tắt âm
                    start: startTime,
                    end: endTime,
                    modestbranding: 1,
                },
                events: {
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            playerRef.current.seekTo(startTime);
                        }
                    },
                },
            });
        };

        // Cleanup: xóa listener khi component bị unmount
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
            delete window.onYouTubeIframeAPIReady;
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div id="player" className="rounded-2xl overflow-hidden shadow-lg" />
        </div>
    );
};

export default YouTubeLoop;
