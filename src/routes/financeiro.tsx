import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — VetReminder" }] }),
  component: FinanceiroPage,
});

const receita = [
  { mes: "Jan", valor: 12500 }, { mes: "Fev", valor: 14800 }, { mes: "Mar", valor: 16200 },
  { mes: "Abr", valor: 15400 }, { mes: "Mai", valor: 18900 }, { mes: "Jun", valor: 21300 },
];

function FinanceiroPage() {
  const total = receita.reduce((s, r) => s + r.valor, 0);
  const ticket = total / 360;
  return (
    <div>
      <PageHeader title="Financeiro" description="Receita da clínica" />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Receita total (6m)</p><p className="text-2xl font-bold mt-1">R$ {total.toLocaleString("pt-BR")}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Receita mensal média</p><p className="text-2xl font-bold mt-1">R$ {(total / 6).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Ticket médio</p><p className="text-2xl font-bold mt-1">R$ {ticket.toFixed(2)}</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Receita por mês</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={receita}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Bar dataKey="valor" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}