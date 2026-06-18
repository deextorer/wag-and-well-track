import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { pets, clients, vaccines, appointments, messages, vaccineStatus, statusLabel } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/pets")({
  head: () => ({ meta: [{ title: "Pets — VetReminder" }] }),
  component: PetsPage,
});

function PetsPage() {
  const { current } = useTenant();
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = pets.filter((p) => p.tenantId === current.id);
  const pet = openId ? pets.find((p) => p.id === openId) : null;
  return (
    <div>
      <PageHeader title="Pets" description="Pacientes da clínica" actions={<Button><Plus className="h-4 w-4 mr-1" />Novo pet</Button>} />
      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead><TableHead>Tutor</TableHead><TableHead>Espécie</TableHead>
              <TableHead>Raça</TableHead><TableHead>Sexo</TableHead><TableHead>Nascimento</TableHead>
              <TableHead>Peso</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => {
              const tutor = clients.find((c) => c.id === p.clientId)?.nome ?? "—";
              return (
                <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setOpenId(p.id)}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{tutor}</TableCell>
                  <TableCell>{p.especie}</TableCell>
                  <TableCell>{p.raca}</TableCell>
                  <TableCell>{p.sexo}</TableCell>
                  <TableCell>{new Date(p.nascimento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{p.peso} kg</TableCell>
                  <TableCell><Badge variant={p.status === "Ativo" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl">
          {pet && (
            <>
              <DialogHeader>
                <DialogTitle>{pet.nome} • {pet.especie} ({pet.raca})</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="vacinas">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="vacinas">Vacinas</TabsTrigger>
                  <TabsTrigger value="consultas">Consultas</TabsTrigger>
                  <TabsTrigger value="proximas">Próximas</TabsTrigger>
                  <TabsTrigger value="msgs">Mensagens</TabsTrigger>
                </TabsList>
                <TabsContent value="vacinas" className="space-y-2">
                  {vaccines.filter((v) => v.petId === pet.id).map((v) => (
                    <div key={v.id} className="flex justify-between p-2 border rounded text-sm">
                      <span>{v.vacina} — {new Date(v.aplicacao).toLocaleDateString("pt-BR")}</span>
                      <Badge>{statusLabel[vaccineStatus(v.proximaDose)]}</Badge>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="consultas" className="space-y-2">
                  {appointments.filter((a) => a.petId === pet.id).map((a) => (
                    <div key={a.id} className="flex justify-between p-2 border rounded text-sm">
                      <span>{a.tipo} • {a.veterinario}</span>
                      <span className="text-muted-foreground">{new Date(a.data).toLocaleDateString("pt-BR")} {a.hora}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="proximas" className="space-y-2">
                  {vaccines.filter((v) => v.petId === pet.id && vaccineStatus(v.proximaDose) !== "em-dia").map((v) => (
                    <div key={v.id} className="flex justify-between p-2 border rounded text-sm">
                      <span>{v.vacina}</span>
                      <span>{new Date(v.proximaDose).toLocaleDateString("pt-BR")}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="msgs" className="space-y-2">
                  {messages.filter((m) => m.petId === pet.id).map((m) => (
                    <div key={m.id} className="flex justify-between p-2 border rounded text-sm">
                      <span>{m.tipo}</span>
                      <span><Badge variant="secondary">{m.status}</Badge> {new Date(m.data).toLocaleDateString("pt-BR")}</span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}