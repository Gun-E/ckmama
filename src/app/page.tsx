"use client"

import {useState} from "react";
import Image from "next/image";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [selectedButton, setSelectedButton] = useState<string>(""); // 선택된 버튼 상태

    const handleButtonClick = (buttonName: string) => {
        if (buttonName !== "광파오븐") {
            setSelectedButton(buttonName); // 클릭된 버튼 이름 설정
            setIsModalOpen(true); // 모달 열기
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    // 선택된 버튼에 맞는 이미지 경로를 설정하는 함수
    const getImageSrc = (buttonName: string) => {
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
    };

    return (
        <div className="ckcontainer">
            <Image
                src="/images/cklogo.svg"
                alt="cklogo"
                style={{objectFit: "cover"}}
                className="logo"
                width={119}
                height={40}
            />
            <Image
                src="/images/chattext.svg"
                alt="chattext"
                style={{objectFit: "cover"}}
                className="chattext"
                width={296}
                height={69}
            />
            <p className="chatbox">잘 골라봐!</p>
            <Image
                src="/images/char.svg"
                alt="char"
                style={{objectFit: "cover"}}
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
                        {/* 선택된 버튼에 맞는 이미지 표시 */}
                        <Image
                            src={getImageSrc(selectedButton)}
                            alt="charkkang"
                            style={{objectFit: "cover"}}
                            className="charkkang"
                            width={393}
                            height={489}
                        />
                        <button className="modal-close-btn" onClick={closeModal}>재도전</button>
                    </div>
                </div>
            )}
        </div>
    );
}
