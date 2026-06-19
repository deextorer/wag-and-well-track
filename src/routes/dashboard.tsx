import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Users, Syringe, AlertTriangle, MessageCircle, Calendar } from "lucide-react";
import { useTenant } from "@/lib/tenant";
import {
  pets, clients, vaccines, vaccineStatus, messages, appointments,
  petsPorMes, vacinasPorMes, consultasPorMes, retornoPorMes,
  birthdaysThisMonth, petName, petTutor,
} from "@/lib/mock-data";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — VetReminder" }] }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, accent }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`h-11 w-11 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { current } = useTenant();
  const tPets = pets.filter((p) => p.tenantId === current.id);
  const tClients = clients.filter((c) => c.tenantId === current.id);
  const tVaccines = vaccines.filter((v) => v.tenantId === current.id);
  const today = new Date().toISOString().slice(0, 10);
  const vencendo30 = tVaccines.filter((v) => { const s = vaccineStatus(v.proximaDose); return s === "30d" || s === "15d" || s === "7d"; });
  const vencidas = tVaccines.filter((v) => vaccineStatus(v.proximaDose) === "vencida");
  const msgsHoje = messages.filter((m) => m.tenantId === current.id && m.data === today && m.status === "Enviada");
  const consultasHoje = appointments.filter((a) => a.tenantId === current.id && a.data === today);
  const proximas = [...tVaccines].sort((a, b) => a.proximaDose.localeCompare(b.proximaDose)).slice(0, 5);
  const aniversarios = birthdaysThisMonth(current.id).slice(0, 5);
  const ultimosPets = [...tPets].slice(-5).reverse();
  const ultimasConsultas = [...appointments.filter((a) => a.tenantId === current.id)].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral de {current.name}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat icon={PawPrint} label="Total de Pets" value={tPets.length} accent="bg-primary" />
        <Stat icon={Users} label="Total de Clientes" value={tClients.length} accent="bg-accent" />
        <Stat icon={Syringe} label="Vacinas — 30 dias" value={vencendo30.length} accent="bg-[oklch(0.78_0.16_75)]" />
        <Stat icon={AlertTriangle} label="Vacinas vencidas" value={vencidas.length} accent="bg-destructive" />
        <Stat icon={MessageCircle} label="Mensagens hoje" value={msgsHoje.length} accent="bg-primary" />
        <Stat icon={Calendar} label="Consultas do dia" value={consultasHoje.length} accent="bg-accent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Pets cadastrados por mês">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={petsPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Vacinas aplicadas por mês">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vacinasPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Consultas realizadas por mês">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={consultasPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Taxa de retorno dos clientes (%)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retornoPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
              <XAxis dataKey="mes" /><YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="taxa" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <ListCard title="Próximas vacinas" link="/vacinacao">
          {proximas.map((v) => (
            <div key={v.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{petName(v.petId)}</p>
                <p className="text-xs text-muted-foreground">{v.vacina}</p>
              </div>
              <Badge variant="secondary">{new Date(v.proximaDose).toLocaleDateString("pt-BR")}</Badge>
            </div>
          ))}
        </ListCard>
        <ListCard title="Próximos aniversários" link="/aniversarios">
          {aniversarios.map((p) => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{p.nome}</p>
                <p className="text-xs text-muted-foreground">{petTutor(p.id)}</p>
              </div>
              <Badge variant="secondary">{new Date(p.nascimento).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</Badge>
            </div>
          ))}
          {aniversarios.length === 0 && <p className="text-sm text-muted-foreground py-4">Sem aniversários este mês.</p>}
        </ListCard>
        <ListCard title="Últimos pets cadastrados" link="/pets">
          {ultimosPets.map((p) => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{p.nome}</p>
                <p className="text-xs text-muted-foreground">{p.especie} • {p.raca}</p>
              </div>
            </div>
          ))}
        </ListCard>
        <ListCard title="Últimas consultas" link="/consultas">
          {ultimasConsultas.map((a) => (
            <div key={a.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{petName(a.petId)}</p>
                <p className="text-xs text-muted-foreground">{a.tipo}</p>
              </div>
              <Badge variant="secondary">{new Date(a.data).toLocaleDateString("pt-BR")}</Badge>
            </div>
          ))}
        </ListCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ListCard({ title, link, children }: { title: string; link: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">{title}</CardTitle>
        <Link to={link} className="text-xs text-primary hover:underline">Ver todos</Link>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
