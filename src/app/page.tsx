"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string>("");
    const [ovenState, setOvenState] = useState<"기본" | "미들오픈" | "풀오픈" | "인풋 오픈" | "닫음">("기본");
    const [trayInserted, setTrayInserted] = useState(false);
    const trayRef = useRef<HTMLImageElement | null>(null); // 트레이 이미지 참조

    // 모달이 열릴 때 스크롤 비활성화
    useEffect(() => {
        if (isModalOpen || isNewModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // cleanup
        };
    }, [isModalOpen, isNewModalOpen]);

    const handleButtonClick = (buttonName: string) => {
        if (buttonName === "광파오븐") {
            setIsNewModalOpen(true);
        } else {
            setSelectedButton(buttonName);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsNewModalOpen(false);
        setOvenState("기본");
        setTrayInserted(false);
    };

    const toggleOvenState = () => {
        if (ovenState === "기본") {
            setOvenState("미들오픈");
        } else if (ovenState === "미들오픈") {
            setOvenState("풀오픈");
        } else if (ovenState === "풀오픈" && trayInserted) {
            setOvenState("기본");
            setTrayInserted(false); // 트레이 제거 후 초기화
        } else if (ovenState === "인풋 오픈") {
            setOvenState("닫음"); // 닫기 동작
            setTrayInserted(false); // 트레이 상태 초기화
        }
    };

    const handleDrop = () => {
        if (ovenState === "풀오픈" && !trayInserted) {
            setTrayInserted(true);
            setOvenState("인풋 오픈");
        }
    };

    const handleDragStart = (event: React.DragEvent) => {
        event.preventDefault(); // 기본 동작을 방지

        if (trayRef.current) {
            const trayWidth = trayRef.current.clientWidth;
            const trayHeight = trayRef.current.clientHeight;

            // 드래그 포인터의 위치에서 트레이 크기의 절반을 빼서 트레이가 중앙에 위치하도록 설정
            const offsetX = event.clientX - trayWidth / 2;
            const offsetY = event.clientY - trayHeight / 2;

            trayRef.current.style.position = "absolute";
            trayRef.current.style.left = `${offsetX}px`;
            trayRef.current.style.top = `${offsetY}px`;
        }
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        if (trayRef.current) {
            const trayWidth = trayRef.current.clientWidth;
            const trayHeight = trayRef.current.clientHeight;

            // 터치 시작 지점에서 트레이를 중앙으로 맞추기
            const offsetX = touch.pageX - trayWidth / 2;
            const offsetY = touch.pageY - trayHeight / 2;

            trayRef.current.style.position = "absolute";
            trayRef.current.style.left = `${offsetX}px`;
            trayRef.current.style.top = `${offsetY}px`;
        }
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        if (trayRef.current) {
            const trayWidth = trayRef.current.clientWidth;
            const trayHeight = trayRef.current.clientHeight;

            // 터치 이동에 따라 트레이 위치 업데이트 (트레이 중심 맞추기)
            trayRef.current.style.left = `${touch.pageX - trayWidth / 2}px`;
            trayRef.current.style.top = `${touch.pageY - trayHeight / 2}px`;
        }
    };

    const handleTouchEnd = () => {
        if (trayRef.current) {
            trayRef.current.style.position = "relative"; // 원래 위치로 돌아가기
            handleDrop(); // 드롭 처리
        }
    };

    // 드래그가 가능한 영역에서 드래그 오버 처리
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault(); // 드래그가 가능하도록 설정
    };

    const getOvenImage = () => {
        switch (ovenState) {
            case "기본":
                return "/images/oven.svg";
            case "미들오픈":
                return "/images/middle-open.svg";
            case "풀오픈":
                return "/images/full-open.svg";
            case "인풋 오픈":
                return "/images/input-open.svg";
            case "닫음":
                return "/images/oven.svg";
            default:
                return "";
        }
    };

    return (
        <div className="ckcontainer">
            <Image
                src="/images/cklogo.svg"
                alt="cklogo"
                style={{ objectFit: "cover" }}
                className="logo"
                width={119}
                height={40}
            />
            <Image
                src="/images/chattext.svg"
                alt="chattext"
                style={{ objectFit: "cover" }}
                className="chattext"
                width={296}
                height={69}
            />
            <p className="chatbox">잘 골라봐!</p>
            <Image
                src="/images/char.svg"
                alt="char"
                style={{ objectFit: "cover" }}
                className="charimg"
                width={158}
                height={273.11}
            />
            <div className="gridcontainer">
                <button className="gridbtn" onClick={() => handleButtonClick("광파오븐")}>
                    광파오븐
                </button>
                <button className="gridbtn" onClick={() => handleButtonClick("프라이팬")}>
                    프라이팬
                </button>
                <button className="gridbtn" onClick={() => handleButtonClick("전자레인지")}>
                    전자레인지
                </button>
                <button className="gridbtn" onClick={() => handleButtonClick("냄비")}>
                    냄비
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="modal-text">다시 생각해보자~</p>
                        <p className="kkangtext">깡!</p>
                        <Image
                            src={getImageSrc(selectedButton)}
                            alt="charkkang"
                            style={{ objectFit: "cover" }}
                            className="charkkang"
                            width={393}
                            height={489}
                        />
                        <button className="modal-close-btn" onClick={closeModal}>재도전</button>
                    </div>
                </div>
            )}

            {isNewModalOpen && (
                <div className="new-modal-overlay">
                    <div className="modal-content" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div
                            className="new-modal-textbox"
                            style={{
                                backgroundColor: ovenState === "닫음" ? "#2ab162" : "#ffffff",
                                width: ovenState === "닫음" ? 100 : 300,
                            }}
                        ></div>
                        <p
                            className="new-modal-text"
                            style={{
                                color: ovenState === "닫음" ? "#FFFFFF" : "inherit",
                            }}
                        >
                            {ovenState === "닫음"
                                ? "완료!"
                                : ovenState === "풀오픈" && !trayInserted
                                    ? "트레이를 넣어보세요!"
                                    : "오븐을 클릭해보세요!"}
                        </p>

                        <Image
                            src={getOvenImage()}
                            alt="oven"
                            style={{objectFit: "cover"}}
                            className="oven"
                            width={261.52}
                            height={184.13}
                            onClick={toggleOvenState}
                        />
                        {ovenState === "풀오픈" && !trayInserted && (
                            <Image
                                ref={trayRef}
                                src="/images/트레이.svg"
                                alt="tray"
                                style={{ objectFit: "cover" }}
                                className="tray"
                                width={297}
                                height={120}
                                draggable
                                onDragStart={handleDragStart}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            />
                        )}
                        {ovenState === "닫음" && (

                            <Link href='/carmera' className="modal-close-btn">닫기</Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function getImageSrc(buttonName: string): string {
    switch (buttonName) {
        case "프라이팬":
            return "/images/kkang프라이팬.png";
        case "전자레인지":
            return "/images/kkang전자레인지.png";
        case "냄비":
            return "/images/kkang냄비.png";
        default:
            return "";
    }
}
