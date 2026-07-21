import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Button } from "@/components/atoms/button";

import Image from "next/image";

export default function LoginPage() {
    return (
        <main className="flex h-screen w-full">
            {/* Coluna da Esquerda (com imagem da fábrica, overlay e Logo) */}
            <div className="relative w-[60%] bg-[url('/assets/images/fabric.png')] bg-cover bg-center flex items-center justify-center">
                {/* Overlay preto com 50% de opacidade */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Logo (z-10 para ficar por cima do overlay preto) */}
                <div className="z-10">
                    <Image
                        src="/assets/icons/Logo WEG Skills Branca.svg"
                        alt="WEG Skills Logo"
                        width={575}
                        height={100}
                        priority
                    />
                </div>
            </div>

            {/* Coluna da Direita (com o Card) */}
            <div className="flex w-[45%] items-center justify-center p-4 bg-[#005294]">
                <Card className="w-full max-w-[500px] bg-white border-none p-6 sm:p-12 shadow-2xl rounded-2xl">
                    <CardHeader className="flex flex-col items-center gap-6 pb-5 text-center">
                        <CardTitle className="text-[40px] sm:text-[42px] font-light text-[#005294] tracking-wide">
                            LOGIN
                        </CardTitle>

                        {/* Linha divisória de Registro para Email */}
                        <div className="h-0.5 w-full max-w-[80%] rounded-full bg-[#005294] mb-3" />
                    </CardHeader>

                    {/* Div 1: Email */}

                    <CardContent className="flex flex-col gap-8">
                        <div className="group relative flex flex-col pt-6 w-[85%] mx-auto">
                            <Input
                                id="email"
                                type="email"
                                placeholder="exemplo@gmail.com"
                                className="bg-[#FFFFFF] peer rounded-none border-0 border-b-2 border-slate-200 px-2 py-2 text-base shadow-none focus-visible:border-[#005294] focus-visible:ring-0 placeholder:text-base"
                            />

                            <Label
                                htmlFor="email"
                                className="absolute pl-2 top-0 text-base font-normal text-slate-400 transition-colors peer-focus:text-[#005294] group-hover:text-[#005294]"
                            >
                                Email
                            </Label>
                        </div>

                        {/* Div 2: Senha */}

                        <div className="group relative flex flex-col pt-6 w-[85%] mx-auto">
                            <Input
                                id="password"
                                type="password"
                                placeholder="************"
                                className="bg-[#FFFFFF] peer rounded-none border-0 border-b-2 border-slate-200 px-2 py-2 text-base shadow-none focus-visible:border-[#005294] focus-visible:ring-0 placeholder:translate-y-1 placeholder:text-base"
                            />

                            <Label
                                htmlFor="password"
                                className="absolute pl-2 top-0 text-base font-normal text-slate-400 transition-colors peer-focus:text-[#005294] group-hover:text-[#005294]"
                            >
                                Senha
                            </Label>
                        </div>

                        {/* Div 3: Botão Entrar */}

                        <div>
                            <div className="mt-3 flex justify-center">
                                <Button className="cursor-pointer rounded-lg border-2 border-[#005294] bg-[#005294] px-10 py-4.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[#005294]">
                                    Entrar
                                </Button>
                            </div>
                        </div>

                        {/* Esqueceu a Senha? */}
                        <Label className="text-base justify-center text-[#005294] hover:underline cursor-pointer">Esqueceu a senha?</Label>

                    </CardContent>
                </Card>
            </div>
        </main>
    )
}