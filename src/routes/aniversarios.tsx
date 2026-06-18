import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cake, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";
import { birthdaysThisMonth, petTutor } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/aniversarios")({
  head: () => ({ meta: [{ title: "Aniversários — VetReminder" }] }),
  component: AniversariosPage,
});

function AniversariosPage() {
  const { current } = useTenant();
  const list = birthdaysThisMonth(current.id);
  return (
    <div>
      <PageHeader title="Aniversários do mês" description="Envie parabéns para os pets aniversariantes" />
      {list.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">Nenhum aniversariante este mês.</Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Cake className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{p.nome}</p>
                    <p className="text-xs text-muted-foreground">{petTutor(p.id)}</p>
                  </div>
                </div>
                <p className="text-sm mb-3">Faz aniversário em <strong>{new Date(p.nascimento).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}</strong></p>
                <Button size="sm" className="w-full" onClick={() => toast.success(`Mensagem de parabéns enviada para ${petTutor(p.id)}`)}>
                  <MessageCircle className="h-4 w-4 mr-1" /> Enviar parabéns
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}