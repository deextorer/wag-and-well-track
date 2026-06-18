import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { appointments, petName, petTutor } from "@/lib/mock-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda — VetReminder" }] }),
  component: AgendaPage,
});

function AgendaPage() {
  const { current } = useTenant();
  const rows = [...appointments.filter((a) => a.tenantId === current.id)].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
  const grouped = rows.reduce<Record<string, typeof rows>>((acc, a) => { (acc[a.data] ||= []).push(a); return acc; }, {});
  return (
    <div>
      <PageHeader title="Agenda" description="Compromissos da clínica" actions={<Button><Plus className="h-4 w-4 mr-1" />Novo agendamento</Button>} />
      <div className="space-y-4">
        {Object.entries(grouped).map(([data, items]) => (
          <Card key={data} className="p-4">
            <h3 className="font-semibold mb-3">{new Date(data).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}</h3>
            <div className="space-y-2">
              {items.map((a) => (
                <div key={a.id} className="flex items-center justify-between border-l-4 border-primary bg-muted/40 p-3 rounded">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">{a.hora}</span>
                    <div>
                      <p className="text-sm font-medium">{petName(a.petId)} • {petTutor(a.petId)}</p>
                      <p className="text-xs text-muted-foreground">{a.tipo} • {a.veterinario}</p>
                    </div>
                  </div>
                  <Badge variant={a.status === "Concluída" ? "secondary" : a.status === "Cancelada" ? "destructive" : "default"}>{a.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}