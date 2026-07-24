import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Button } from "@/components/atoms/button";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex flex-1 min-h-[calc(100vh-4rem)] w-full flex-col lg:flex-row">
            <div className="hidden lg:flex relative lg:w-[55%] xl:w-[60%] bg-[url('/assets/images/fabric.png')] bg-cover bg-center items-center justify-center p-8">
                <div className="absolute inset-0 bg-black/50" />

                <div className="z-10 flex justify-center w-full px-4">
                    <Image
                        src="/assets/icons/Logo WEG Skills Branca.svg"
                        alt="WEG Skills Logo"
                        width={575}
                        height={100}
                        className="w-4/5 max-w-[500px] h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col w-full lg:w-[45%] xl:w-[40%] items-center justify-center p-4 sm:p-8 bg-[#005294] gap-6">
                <div className="lg:hidden my-2">
                    <Image
                        src="/assets/icons/Logo WEG Skills Branca.svg"
                        alt="WEG Skills Logo"
                        width={360}
                        height={64}
                        className="h-14 sm:h-16 w-auto object-contain"
                        priority
                    />
                </div>

                <Card className="w-full max-w-[500px] bg-white border-none p-6 sm:p-10 shadow-2xl rounded-2xl">
                    <CardHeader className="flex flex-col items-center gap-4 sm:gap-6 pb-5 text-center">
                        <CardTitle className="text-3xl sm:text-[40px] font-light text-[#005294] tracking-wide">
                            LOGIN
                        </CardTitle>

                        <div className="h-0.5 w-full max-w-[80%] rounded-full bg-[#005294] mb-3" />
                    </CardHeader>

                    <CardContent className="flex flex-col gap-6 sm:gap-8">
                        <div className="group relative flex flex-col pt-6 w-full sm:w-[85%] mx-auto">
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

                        <div className="group relative flex flex-col pt-6 w-full sm:w-[85%] mx-auto">
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

                        <div>
                            <div className="mt-3 flex justify-center">
                                <Button className="w-full sm:w-auto cursor-pointer rounded-lg border-2 border-[#005294] bg-[#005294] px-10 py-4.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[#005294]">
                                    Entrar
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <Label className="text-base justify-center text-[#005294] hover:underline cursor-pointer">Esqueceu a senha?</Label>
                            <p className="text-base text-slate-600 text-center">
                                Não tem uma conta?{" "}
                                <Link href="/register" className="font-semibold text-[#005294] hover:underline">
                                    Registre-se
                                </Link>
                            </p>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </main>
    )
}