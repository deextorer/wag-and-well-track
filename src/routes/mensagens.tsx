import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { messages, petName, petTutor } from "@/lib/mock-data";

export const Route = createFileRoute("/mensagens")({
  head: () => ({ meta: [{ title: "Mensagens — VetReminder" }] }),
  component: MensagensPage,
});

function MensagensPage() {
  const { current } = useTenant();
  const rows = messages.filter((m) => m.tenantId === current.id);
  return (
    <div>
      <PageHeader title="Mensagens" description="Histórico de envios via WhatsApp" />
      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead><TableHead>Tutor</TableHead><TableHead>Pet</TableHead>
              <TableHead>Tipo</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{new Date(m.data).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{petTutor(m.petId)}</TableCell>
                <TableCell className="font-medium">{petName(m.petId)}</TableCell>
                <TableCell>{m.tipo}</TableCell>
                <TableCell><Badge variant={m.status === "Enviada" ? "default" : m.status === "Erro" ? "destructive" : "secondary"}>{m.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}