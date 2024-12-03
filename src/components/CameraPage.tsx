"use client";
import { useState, useEffect, useRef } from "react";

export default function CameraPage() {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [error, setError] = useState("");
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // 페이지 로드 시 카메라 자동 활성화
        setIsCameraOn(true);
    }, []);

    useEffect(() => {
        if (isCameraOn) {
            // 카메라 스트림 활성화 (후면 카메라 사용)
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: "environment",  // 후면 카메라 지정
                    },
                })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    setError("카메라 접근 권한이 필요합니다.");
                    console.error(err);
                });
        } else {
            // 카메라 스트림 정지
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        }
    }, [isCameraOn]);

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%" }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
