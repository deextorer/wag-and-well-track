import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Building2, PawPrint, MessageCircle, DollarSign } from "lucide-react";
import { tenants, pets, messages } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Painel SaaS — VetReminder" }] }),
  component: AdminPage,
});

const receitaMensal = [
  { mes: "Jan", valor: 4800 }, { mes: "Fev", valor: 5200 }, { mes: "Mar", valor: 5900 },
  { mes: "Abr", valor: 6400 }, { mes: "Mai", valor: 7200 }, { mes: "Jun", valor: 8100 },
];

function Stat({ icon: Icon, label, value, accent }: any) {
  return (
    <Card><CardContent className="p-5 flex items-center justify-between">
      <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-2xl font-bold mt-1">{value}</p></div>
      <div className={`h-11 w-11 rounded-lg flex items-center justify-center ${accent}`}><Icon className="h-5 w-5 text-white" /></div>
    </CardContent></Card>
  );
}

function AdminPage() {
  const receita = receitaMensal[receitaMensal.length - 1].valor;
  return (
    <div>
      <PageHeader title="Painel administrativo SaaS" description="Métricas agregadas de todas as clínicas" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Stat icon={Building2} label="Clínicas cadastradas" value={tenants.length} accent="bg-primary" />
        <Stat icon={PawPrint} label="Pets cadastrados" value={pets.length} accent="bg-accent" />
        <Stat icon={MessageCircle} label="Mensagens enviadas" value={messages.filter((m) => m.status === "Enviada").length} accent="bg-[oklch(0.78_0.16_75)]" />
        <Stat icon={DollarSign} label="Receita mensal" value={`R$ ${receita.toLocaleString("pt-BR")}`} accent="bg-primary" />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Receita recorrente mensal</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={receitaMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Bar dataKey="valor" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}