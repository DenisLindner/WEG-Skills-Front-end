import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"

export default function VerifyCertificate() {
    return (
        <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-4rem)] bg-[#002c4a] p-4 sm:p-8">
            <Card className="w-full max-w-[560px] bg-[#f4f5f7] border-none p-8 sm:p-12 shadow-2xl rounded-md">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-[#005294] leading-tight text-left">
                        Verificar<br />Certificado
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 flex flex-col gap-6 items-start">
                    <div className="w-full">
                        <Input
                            id="certificate"
                            type="text"
                            placeholder="Nº Certificado"
                            className="h-12 w-full bg-white border border-[#005294] rounded-md px-4 text-lg font-semibold text-slate-800 placeholder:text-[#555555] placeholder:font-semibold focus-visible:ring-1 focus-visible:ring-[#005294] placeholder:text-base"
                        />
                    </div>
                    <Button className="h-11 px-8 bg-[#20699c] hover:bg-[#005294] text-white font-semibold text-base rounded-md transition-colors cursor-pointer">
                        Verificar
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
