import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Produtos e Serviços — VetReminder" }] }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const { current } = useTenant();
  const rows = products.filter((p) => p.tenantId === current.id);
  return (
    <div>
      <PageHeader title="Produtos e Serviços" />
      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead><TableHead>Tipo</TableHead><TableHead>Preço</TableHead><TableHead>Estoque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nome}</TableCell>
                <TableCell><Badge variant="secondary">{p.tipo}</Badge></TableCell>
                <TableCell>R$ {p.preco.toFixed(2)}</TableCell>
                <TableCell>{p.estoque ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}