import Image from "next/image"

export default function InfoCard({ Card }) {
    return (
        <div className="bg-[#f0f0f0] shadow-[-10px_10px_0px_#00579D] w-[225px] h-[275px] mb-6 rounded-[6]">
            <div className="h-[100%] flex justify-between items-center flex-col pb-[35px]">
                <div className="h-[100%] flex justify-end items-center flex-col pb-[15px] ">
                    <div className="rounded-[100] w-[70px] h-[70px] bg-[#00579D] flex justify-center items-center mb-[15px]">
                        <img src={Card.icon} alt={Card.alt} className="w-[50px] h-[50px]  object-contain brightness-0 invert " />
                    </div>
                    <h3 className="text-[#808080] text-[20px] text-center ">{Card.titulo}</h3>
                    <h3 className="text-[#808080] text-[20px] text-center ">{Card.subtitulo}</h3>
                </div>
                <p className="text-[30px] text-[#00579D] font-bold">{Card.dados}</p>
            </div>
        </div>
    )
}