import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, PawPrint, Calendar, Syringe, Cake,
  Stethoscope, BedDouble, ShoppingBag, DollarSign, Settings, MessageSquare, Shield,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTenant } from "@/lib/tenant";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/pets", label: "Pets", icon: PawPrint },
  { to: "/agenda", label: "Agenda", icon: Calendar },
  { to: "/vacinacao", label: "Vacinação", icon: Syringe },
  { to: "/aniversarios", label: "Aniversários", icon: Cake },
  { to: "/consultas", label: "Consultas", icon: Stethoscope },
  { to: "/internacao", label: "Internação", icon: BedDouble },
  { to: "/produtos", label: "Produtos e Serviços", icon: ShoppingBag },
  { to: "/financeiro", label: "Financeiro", icon: DollarSign },
  { to: "/mensagens", label: "Mensagens", icon: MessageSquare },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { current, setCurrent, tenants } = useTenant();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <PawPrint className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground">VetReminder</span>
            <span className="text-[10px] text-sidebar-foreground/60">Gestão Veterinária</span>
          </div>
        </div>
        <Select value={current.id} onValueChange={(id) => { const t = tenants.find((x) => x.id === id); if (t) setCurrent(t); }}>
          <SelectTrigger className="mt-3 h-8 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tenants.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/admin")}>
                  <Link to="/admin" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Painel SaaS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}