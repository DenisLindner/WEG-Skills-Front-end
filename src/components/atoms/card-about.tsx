import { Card, CardContent } from "./card"
export default function CardAbout() {
    return (
        <section className="my-[10rem] flex justify-center items-center h-[fit] ">
            <Card className="shadow-[-8px_8px_15px_#00000012] w-[86%] h-[fit]">
                <CardContent>
                    <h2 className="text-[#00579D] text-[2rem] ml-[25px] font-bold">Síntese</h2>
                    <p className="text-[1.125rem] ml-[25px] mr-[25px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi id quisquam velit ipsam aliquid harum officiis atque, perspiciatis maxime ipsum adipisci doloribus blanditiis minima consequatur? Dolore eos est commodi a?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi id quisquam velit ipsam aliquid harum officiis atque, perspiciatis maxime ipsum adipisci doloribus blanditiis minima consequatur? Dolore eos est commodi a?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi id quisquam velit ipsam aliquid harum officiis atque, perspiciatis maxime ipsum adipisci doloribus blanditiis minima consequatur? Dolore eos est commodi a?</p>
                </CardContent>
            </Card>
        </section>
    )
}