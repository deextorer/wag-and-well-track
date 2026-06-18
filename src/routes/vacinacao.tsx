import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { vaccines, petName, petTutor, vaccineStatus, statusLabel, type VaccineStatus } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/vacinacao")({
  head: () => ({ meta: [{ title: "Vacinação — VetReminder" }] }),
  component: VacinacaoPage,
});

const statusColor: Record<VaccineStatus, string> = {
  "em-dia": "bg-accent text-accent-foreground",
  "30d": "bg-[oklch(0.85_0.12_85)] text-foreground",
  "15d": "bg-[oklch(0.78_0.16_75)] text-white",
  "7d": "bg-[oklch(0.7_0.18_45)] text-white",
  "vencida": "bg-destructive text-destructive-foreground",
};

function VacinacaoPage() {
  const { current } = useTenant();
  const [vacFilter, setVacFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const all = vaccines.filter((v) => v.tenantId === current.id);
  const vacNames = Array.from(new Set(all.map((v) => v.vacina)));
  const rows = all.filter((v) => {
    if (vacFilter !== "all" && v.vacina !== vacFilter) return false;
    if (statusFilter !== "all" && vaccineStatus(v.proximaDose) !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Vacinação" description="Controle de vacinas e doses" />
      <Card className="p-4">
        <div className="flex gap-3 mb-4 flex-wrap">
          <Select value={vacFilter} onValueChange={setVacFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Vacina" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as vacinas</SelectItem>
              {vacNames.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="em-dia">Em dia</SelectItem>
              <SelectItem value="30d">Vence em 30 dias</SelectItem>
              <SelectItem value="15d">Vence em 15 dias</SelectItem>
              <SelectItem value="7d">Vence em 7 dias</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet</TableHead><TableHead>Tutor</TableHead><TableHead>Vacina</TableHead>
                <TableHead>Aplicação</TableHead><TableHead>Próxima dose</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((v) => {
                const s = vaccineStatus(v.proximaDose);
                return (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{petName(v.petId)}</TableCell>
                    <TableCell>{petTutor(v.petId)}</TableCell>
                    <TableCell>{v.vacina}</TableCell>
                    <TableCell>{new Date(v.aplicacao).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{new Date(v.proximaDose).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell><Badge className={statusColor[s]}>{statusLabel[s]}</Badge></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}