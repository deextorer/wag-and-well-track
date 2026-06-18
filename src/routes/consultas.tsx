import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { appointments, petName, petTutor } from "@/lib/mock-data";

export const Route = createFileRoute("/consultas")({
  head: () => ({ meta: [{ title: "Consultas — VetReminder" }] }),
  component: ConsultasPage,
});

function ConsultasPage() {
  const { current } = useTenant();
  const rows = appointments.filter((a) => a.tenantId === current.id);
  return (
    <div>
      <PageHeader title="Consultas" description="Histórico e agendamentos" />
      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead><TableHead>Hora</TableHead><TableHead>Pet</TableHead>
              <TableHead>Tutor</TableHead><TableHead>Tipo</TableHead><TableHead>Veterinário</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{new Date(a.data).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{a.hora}</TableCell>
                <TableCell className="font-medium">{petName(a.petId)}</TableCell>
                <TableCell>{petTutor(a.petId)}</TableCell>
                <TableCell>{a.tipo}</TableCell>
                <TableCell>{a.veterinario}</TableCell>
                <TableCell><Badge variant={a.status === "Concluída" ? "secondary" : a.status === "Cancelada" ? "destructive" : "default"}>{a.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}