"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState<string>(""); // 생성 중 텍스트 상태 추가
    const [timeoutReached, setTimeoutReached] = useState<boolean>(false); // 10초 타이머 상태 추가

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("http://15.165.25.180/generate-image");
                const data = await response.json();  // 응답을 JSON으로 파싱
                const imageUrl = data.image_urls;  // image_urls에서 URL 추출
                console.log("Received image URL:", imageUrl);
                setImageUrl(imageUrl);  // 상태 업데이트
            } catch (error) {
                console.error("이미지 로딩 중 오류 발생:", error);
            }
        };

        fetchImage();

        // 10초 후에 타임아웃 처리
        const timeout = setTimeout(() => {
            setTimeoutReached(true);  // 10초 후 타임아웃 상태 변경
        }, 10000);

        let dotCount = 0;
        const interval = setInterval(() => {
            setLoadingText(".".repeat(dotCount));
            dotCount = (dotCount + 1) % 4; // 3개 점이 최대이므로, 4로 나눈 나머지
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);  // 컴포넌트가 unmount될 때 타이머 정리
        };
    }, []);

    const handleShare = async () => {
        const shareImageUrl = timeoutReached ? "/images/img-hamburger.png" : imageUrl; // 타임아웃 시 기본 이미지 URL

        if (navigator.share && shareImageUrl) {
            try {
                // 이미지 URL을 blob으로 변환하여 공유
                const response = await fetch(shareImageUrl);
                const blob = await response.blob();
                const file = new File([blob], "generated-image.png", { type: "image/png" });

                await navigator.share({
                    title: "쿡힘마마 캐릭터 생성",
                    text: "내가 만든 쿡힘마마 캐릭터를 공유해보세요!",
                    files: [file],  // 이미지 파일만 공유
                });

                alert("공유가 완료되었습니다!");
            } catch (error) {
                console.error("공유 중 에러 발생:", error);
                alert("공유를 취소했거나 오류가 발생했습니다.");
            }
        } else {
            alert("현재 브라우저는 공유 기능을 지원하지 않거나 이미지가 없습니다.");
        }
    };

    return (
        <>
            <Image
                src="/images/cklogo.svg"
                alt="cklogo"
                style={{ objectFit: "cover" }}
                className="logo"
                width={119}
                height={40}
            />
            {!imageUrl && !timeoutReached && (
                <p className="hamburger-text">
                    <strong>쿡힘마마</strong> 캐릭터 <br />생성 중 {loadingText}
                </p>
            )}
            {imageUrl && (
                <p className="hamburger-text">
                    <strong>쿡힘마마</strong> 캐릭터가 생성되었습니다.
                </p>
            )}

            {imageUrl && (
                <Image
                    src="/images/itsme.svg"
                    alt="me"
                    style={{ objectFit: "cover" }}
                    className="itsme"
                    width={150}
                    height={63.7}
                />
            )}
            <div>
                {imageUrl || timeoutReached ? (
                    <img
                        src={imageUrl || "/images/img-hamburger.png"} // 타임아웃된 경우 기본 이미지를 사용
                        alt="Generated Image"
                        className="hamburger"
                        style={{ objectFit: "cover", width: "240px", height: "240px" }}
                    />
                ) : (
                    <Image
                        src="/images/loding.svg"
                        alt="loading"
                        style={{ objectFit: "cover" }}
                        className="hamburger-loding"
                        width={250}
                        height={250}
                    />
                )}
            </div>
            <button
                className="modal-close-btn"
                onClick={handleShare}
                disabled={!imageUrl && !timeoutReached}  // 이미지가 없고 타임아웃이 아니면 버튼 비활성화
            >
                공유하기
            </button>
        </>
    );
}
