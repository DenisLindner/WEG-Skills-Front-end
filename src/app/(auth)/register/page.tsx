import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
    return (
        <main className="flex h-screen items-center justify-center">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Registro</CardTitle>
                </CardHeader>

                <CardContent className="flex justify-center">
                    <Button>Registrar-se</Button>
                </CardContent>
            </Card>
        </main>
    )
}