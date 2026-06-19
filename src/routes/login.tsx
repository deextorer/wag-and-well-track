import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PawPrint, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — VetReminder" },
      { name: "description", content: "Acesse o painel da sua clínica veterinária no VetReminder." },
      { property: "og:title", content: "Entrar — VetReminder" },
      { property: "og:description", content: "Acesse o painel da sua clínica veterinária no VetReminder." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-accent text-primary-foreground relative overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <PawPrint className="h-6 w-6" />
          </div>
          <span className="text-lg font-bold">VetReminder</span>
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-4xl font-bold leading-tight">Gestão completa para sua clínica veterinária</h2>
          <p className="text-base text-white/85 max-w-md">
            Acompanhe pacientes, controle vacinação e envie lembretes automáticos por WhatsApp em uma plataforma só.
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>• Lembretes automáticos de vacinas e retornos</li>
            <li>• Agenda, prontuário e aniversariantes do mês</li>
            <li>• Multi-clínica com dados isolados por unidade</li>
          </ul>
        </div>
        <p className="text-xs text-white/60 relative z-10">© {new Date().getFullYear()} VetReminder. Todos os direitos reservados.</p>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardHeader className="space-y-2">
            <div className="lg:hidden flex items-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="font-bold">VetReminder</span>
            </div>
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>Entre com seu e-mail e senha para acessar o painel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="voce@clinica.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <button type="button" className="text-xs text-primary hover:underline">Esqueci a senha</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="lembrar" />
                <Label htmlFor="lembrar" className="text-sm font-normal text-muted-foreground">
                  Manter conectado neste dispositivo
                </Label>
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
              <p className="text-center text-sm text-muted-foreground">
                Ainda não tem conta?{" "}
                <Link to="/dashboard" className="text-primary font-medium hover:underline">
                  Criar clínica
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}