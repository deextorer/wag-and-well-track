import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { hospitalizations, petName, petTutor } from "@/lib/mock-data";

export const Route = createFileRoute("/internacao")({
  head: () => ({ meta: [{ title: "Internação — VetReminder" }] }),
  component: InternacaoPage,
});

function InternacaoPage() {
  const { current } = useTenant();
  const rows = hospitalizations.filter((h) => h.tenantId === current.id);
  return (
    <div>
      <PageHeader title="Internação" description="Pacientes em observação" />
      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead><TableHead>Tutor</TableHead><TableHead>Motivo</TableHead>
              <TableHead>Entrada</TableHead><TableHead>Saída</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="font-medium">{petName(h.petId)}</TableCell>
                <TableCell>{petTutor(h.petId)}</TableCell>
                <TableCell>{h.motivo}</TableCell>
                <TableCell>{new Date(h.entrada).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{h.saida ? new Date(h.saida).toLocaleDateString("pt-BR") : "—"}</TableCell>
                <TableCell><Badge variant={h.status === "Internado" ? "default" : "secondary"}>{h.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}