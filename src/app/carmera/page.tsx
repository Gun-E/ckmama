import Image from "next/image";
import CarmeraPage from "@/components/CameraPage";
import Link from "next/link";

export default function Home() {
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
            <Image
                src="/images/carmera-frame.svg"
                alt="carmera-frame"
                style={{objectFit: "cover"}}
                className="carmera-frame"
                width={71.19}
                height={53}
            />
            <Image
                src="/images/info.svg"
                alt="info"
                style={{objectFit: "cover"}}
                className="info"
                width={216}
                height={34}
            />
            <Link href="/image">
                <Image
                    src="/images/carmera-btn.svg"
                    alt="carmera-btn"
                    style={{objectFit: "cover"}}
                    className="carmera-btn"
                    width={80}
                    height={80}
                />
            </Link>
            <CarmeraPage/>
        </>
    );
}
