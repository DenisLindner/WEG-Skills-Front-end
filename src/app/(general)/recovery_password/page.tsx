import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import Link from "next/link";

export default function RecoveryPassword() {
    return (
        <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-4rem)] bg-[#002c4a] p-4 sm:p-8">
            <Card className="w-full max-w-[560px] bg-[#f4f5f7] border-none p-8 sm:p-12 shadow-2xl rounded-md">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-[#005294] leading-tight text-left">
                        Recuperar<br />Senha
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <form className="flex flex-col gap-6 items-start">
                        <div className="w-full flex flex-col gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="seu.email@exemplo.com"
                                required
                                className="h-12 w-full bg-white border border-[#005294] rounded-md px-4 text-base font-semibold text-slate-800 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-[#005294]"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Label htmlFor="new-password" className="text-sm font-medium text-slate-700">
                                Nova Senha
                            </Label>
                            <Input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Nova senha"
                                required
                                className="h-12 w-full bg-white border border-[#005294] rounded-md px-4 text-base font-semibold text-slate-800 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-[#005294]"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
                                Confirmar Nova Senha
                            </Label>
                            <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Confirmar nova senha"
                                required
                                className="h-12 w-full bg-white border border-[#005294] rounded-md px-4 text-base font-semibold text-slate-800 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-[#005294]"
                            />
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                            <Button type="submit" className="w-full sm:w-auto h-11 px-8 bg-[#20699c] hover:bg-[#005294] text-white font-semibold text-base rounded-md transition-colors cursor-pointer">
                                Atualizar Senha
                            </Button>

                            <Link href="/login" className="text-sm font-semibold text-[#005294] hover:underline">
                                Voltar para o Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}