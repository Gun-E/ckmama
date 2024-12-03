"use client";
import Image from "next/image";

export default function Home() {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "쿡힘마마 캐릭터 생성",
                    text: "내가 만든 쿡힘마마 캐릭터를 공유해보세요!",
                    url: window.location.href,
                });

                alert("공유가 완료되었습니다!");
            } catch (error) {
                console.error("공유 중 에러 발생:", error);
                alert("공유를 취소했거나 오류가 발생했습니다.");
            }
        } else {
            alert("현재 브라우저는 공유 기능을 지원하지 않습니다.");
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
            <p className="hamburger-text">
                <strong>쿡힘마마</strong> 캐릭터가 생성되었습니다.
            </p>
            <Image
                src="/images/itsme.svg"
                alt="me"
                style={{ objectFit: "cover" }}
                className="itsme"
                width={150}
                height={63.7}
            />
            <div>
                <Image
                    src="/images/햄버거.svg"
                    alt="햄버거"
                    style={{ objectFit: "cover" }}
                    className="hamburger"
                    width={240}
                    height={240}
                />
            </div>
            <button className="modal-close-btn" onClick={handleShare}>
                공유하기
            </button>
        </>
    );
}
