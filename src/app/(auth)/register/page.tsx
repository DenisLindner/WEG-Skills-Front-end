import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
    return (
        <main className="flex h-screen w-full">
            {/* Coluna da Esquerda */}
            <div className="flex-1 bg-slate-100" 
            
            />

            {/* Coluna da Direita (com o Card) */}
            <div className="flex flex-1 items-center justify-center bg-white p-4">
                <Card className="w-full max-w-[400px] shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle>Registro</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4 justify-center">
                        <Input placeholder="Digite seu e-mail" />
                        <Input placeholder="Digite sua senha" type="password" className="align=inline-end"/>
                        <Input placeholder="Confirme sua senha" type="password" />
                        <Button>Registrar-se</Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}