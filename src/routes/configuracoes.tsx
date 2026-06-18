import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/PageHeader";
import { useTenant } from "@/lib/tenant";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — VetReminder" }] }),
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const { current } = useTenant();
  return (
    <div>
      <PageHeader title="Configurações" description="Dados da clínica e preferências de envio" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Dados da clínica</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Nome</Label><Input defaultValue={current.name} /></div>
            <div><Label>CNPJ</Label><Input defaultValue="00.000.000/0001-00" /></div>
            <div><Label>Telefone</Label><Input defaultValue="(11) 4000-0000" /></div>
            <div><Label>Endereço</Label><Input defaultValue="Rua das Flores, 123 — São Paulo/SP" /></div>
            <Button>Salvar alterações</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Lembretes automáticos via WhatsApp</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Row label="Lembretes de vacinação" />
            <Row label="Lembretes de vermífugo" />
            <Row label="Lembretes de consulta" />
            <Row label="Lembretes de retorno" />
            <Row label="Mensagens de aniversário" />
            <div><Label>Número do WhatsApp</Label><Input defaultValue="+55 11 99999-0000" /></div>
            <Button>Salvar preferências</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked />
    </div>
  );
}