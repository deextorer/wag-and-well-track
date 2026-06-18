import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { clients, getClientPetCount } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/clientes")({
  head: () => ({ meta: [{ title: "Clientes — VetReminder" }] }),
  component: ClientesPage,
});

function ClientesPage() {
  const { current } = useTenant();
  const [q, setQ] = useState("");
  const rows = clients.filter((c) => c.tenantId === current.id && c.nome.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Clientes" description="Tutores cadastrados na clínica" actions={<Button><Plus className="h-4 w-4 mr-1" />Novo cliente</Button>} />
      <Card className="p-4">
        <div className="relative mb-4 max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nome..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead><TableHead>CPF</TableHead><TableHead>Telefone</TableHead>
                <TableHead>WhatsApp</TableHead><TableHead>E-mail</TableHead>
                <TableHead>Pets</TableHead><TableHead>Última visita</TableHead><TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell>{c.cpf}</TableCell>
                  <TableCell>{c.telefone}</TableCell>
                  <TableCell>{c.whatsapp}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{getClientPetCount(c.id, current.id)}</TableCell>
                  <TableCell>{new Date(c.ultimaVisita).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}