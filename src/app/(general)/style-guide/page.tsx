import type {Metadata} from "next";
import {AlertCircle, CheckCircle2, Info, LoaderCircle, TriangleAlert} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Progress} from "@/components/ui/progress";
import {Textarea} from "@/components/ui/text-area";

export const metadata: Metadata = {title: "Style Guide"};

const colors = [
    {name: "Institucional", value: "#003057", className: "bg-[#003057] text-white"},
    {name: "Primária", value: "--primary", className: "bg-primary text-primary-foreground"},
    {name: "Secundária", value: "--secondary", className: "bg-secondary text-secondary-foreground"},
    {name: "Fundo", value: "--background", className: "bg-background text-foreground"},
    {name: "Card", value: "--card", className: "bg-card text-card-foreground"},
    {name: "Destrutiva", value: "--destructive", className: "bg-destructive text-white"},
];

export default function StyleGuidePage() {
    return (
        <main className="content-grid py-12 sm:py-16">
            <header className="max-w-3xl">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Sistema visual</p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Style Guide WEG Skills</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    Referência viva de cores, tipografia, espaçamento, componentes e estados usados na aplicação.
                </p>
            </header>

            <section className="mt-14" aria-labelledby="colors-title">
                <h2 id="colors-title" className="text-2xl font-bold">Cores</h2>
                <p className="mt-2 text-muted-foreground">Azuis institucionais, superfícies claras e vermelho reservado para ações destrutivas.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {colors.map((color) => (
                        <Card key={color.name} className="overflow-hidden">
                            <div className={`h-24 ${color.className}`} />
                            <div className="p-4">
                                <h3 className="font-semibold">{color.name}</h3>
                                <code className="mt-1 block text-sm text-muted-foreground">{color.value}</code>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mt-14 grid gap-8 lg:grid-cols-2" aria-labelledby="type-title">
                <div>
                    <h2 id="type-title" className="text-2xl font-bold">Tipografia</h2>
                    <div className="mt-6 space-y-5">
                        <div><p className="text-sm text-muted-foreground">Título principal</p><p className="text-4xl font-bold tracking-tight">Aprenda hoje.</p></div>
                        <div><p className="text-sm text-muted-foreground">Título de seção</p><p className="text-2xl font-semibold">Conhecimento aplicado</p></div>
                        <div><p className="text-sm text-muted-foreground">Texto de corpo</p><p className="leading-relaxed">Conteúdo claro, direto e confortável para leitura em diferentes dispositivos.</p></div>
                        <div><p className="text-sm text-muted-foreground">Texto auxiliar</p><p className="text-sm text-muted-foreground">Informações complementares usam menor ênfase.</p></div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Espaçamento</h2>
                    <div className="mt-6 space-y-4">
                        {["0.5rem", "1rem", "1.5rem", "2rem"].map((space, index) => (
                            <div key={space} className="flex items-center gap-4">
                                <code className="w-16 text-sm text-muted-foreground">{space}</code>
                                <div className="h-8 rounded bg-primary" style={{width: `${(index + 1) * 3}rem`}} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-14" aria-labelledby="buttons-title">
                <h2 id="buttons-title" className="text-2xl font-bold">Botões</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Button>Primário</Button>
                    <Button variant="secondary">Secundário</Button>
                    <Button variant="outline">Contorno</Button>
                    <Button variant="ghost">Fantasma</Button>
                    <Button variant="destructive">Destrutivo</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Desabilitado</Button>
                    <Button><LoaderCircle className="animate-spin" />Carregando</Button>
                </div>
            </section>

            <section className="mt-14 grid gap-6 lg:grid-cols-2" aria-labelledby="forms-title">
                <Card>
                    <CardHeader><CardTitle id="forms-title">Campos de formulário</CardTitle></CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2"><Label htmlFor="guide-name">Nome</Label><Input id="guide-name" placeholder="Digite seu nome" /></div>
                        <div className="space-y-2"><Label htmlFor="guide-description">Descrição</Label><Textarea id="guide-description" placeholder="Descreva o conteúdo" /></div>
                        <div className="space-y-2"><Label htmlFor="guide-invalid">Campo inválido</Label><Input id="guide-invalid" aria-invalid defaultValue="Valor inválido" /><p className="text-sm text-destructive">Revise o valor informado.</p></div>
                        <div className="space-y-2"><Label htmlFor="guide-disabled">Campo desabilitado</Label><Input id="guide-disabled" disabled value="Indisponível" readOnly /></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Cards, badges e progresso</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2"><Badge>Rascunho</Badge><Badge className="bg-emerald-50 text-emerald-700">Publicado</Badge><Badge className="bg-amber-50 text-amber-800">Pendente</Badge></div>
                        <div className="mt-8"><div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Progresso</span><strong>65%</strong></div><Progress value={65} /></div>
                        <Card className="mt-8 border-dashed p-6"><h3 className="font-semibold">Card secundário</h3><p className="mt-2 text-sm text-muted-foreground">Agrupa informações relacionadas sem competir com a ação principal.</p></Card>
                    </CardContent>
                </Card>
            </section>

            <section className="mt-14" aria-labelledby="feedback-title">
                <h2 id="feedback-title" className="text-2xl font-bold">Mensagens de feedback</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"><CheckCircle2 className="mt-0.5 size-5 shrink-0" /><div><h3 className="font-semibold">Operação concluída</h3><p className="text-sm">As alterações foram salvas com sucesso.</p></div></div>
                    <div className="flex gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sky-800"><Info className="mt-0.5 size-5 shrink-0" /><div><h3 className="font-semibold">Informação</h3><p className="text-sm">Confira os dados antes de continuar.</p></div></div>
                    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><TriangleAlert className="mt-0.5 size-5 shrink-0" /><div><h3 className="font-semibold">Atenção</h3><p className="text-sm">Ainda existem etapas pendentes.</p></div></div>
                    <div className="flex gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-destructive"><AlertCircle className="mt-0.5 size-5 shrink-0" /><div><h3 className="font-semibold">Não foi possível concluir</h3><p className="text-sm">Revise os campos destacados e tente novamente.</p></div></div>
                </div>
            </section>
        </main>
    );
}
