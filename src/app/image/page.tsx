"use client";
import Image from "next/image";
import {useState, useEffect} from "react";

export default function Home() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState<string>(""); // 생성 중 텍스트 상태 추가

    useEffect(() => {

        const fetchImage = async () => {
            try {
                const response = await fetch("http://15.165.25.180/generate-image");
                const data = await response.json();  // 응답을 JSON으로 파싱
                const imageUrl = data.image_urls;  // image_urls에서 URL 추출
                setImageUrl(imageUrl);  // 상태 업데이트
            } catch (error) {
                console.error("이미지 로딩 중 오류 발생:", error);
            }
        };

        fetchImage();
        let dotCount = 0;
        const interval = setInterval(() => {
            setLoadingText(".".repeat(dotCount));
            dotCount = (dotCount + 1) % 4; // 3개 점이 최대이므로, 4로 나눈 나머지
        }, 500);
        return () => clearInterval(interval);
    }, []);
    const handleShare = async () => {
        if (navigator.share && imageUrl) {
            try {
                // 이미지 URL을 blob으로 변환하여 공유
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const file = new File([blob], "generated-image.png", {type: "image/png"});

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
                style={{objectFit: "cover"}}
                className="logo"
                width={119}
                height={40}
            />
            {!imageUrl && (
                <p className="hamburger-text">
                    <strong>쿡힘마마</strong> 캐릭터 생성 중 {loadingText}
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
                    style={{objectFit: "cover"}}
                    className="itsme"
                    width={150}
                    height={63.7}
                />
            )}
            <div>
                {imageUrl ? (
                    <img src={imageUrl} alt="Generated Image" className="hamburger"
                         style={{objectFit: "cover", width: "240px", height: "240px"}}/>
                ) : (
                    <Image
                        src="/images/loding.svg"
                        alt="loding"
                        style={{objectFit: "cover"}}
                        className="hamburger-loding"
                        width={250}
                        height={250}
                    />
                )}
            </div>
            <button
                className="modal-close-btn"
                onClick={handleShare}
                disabled={!imageUrl}
            >
                공유하기
            </button>
        </>
    );
}
