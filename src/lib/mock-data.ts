export type Tenant = { id: string; name: string };

export const tenants: Tenant[] = [
  { id: "t1", name: "PetVida Veterinária" },
  { id: "t2", name: "Clínica Animal Care" },
];

export type Client = {
  id: string;
  tenantId: string;
  nome: string;
  cpf: string;
  telefone: string;
  whatsapp: string;
  email: string;
  ultimaVisita: string;
};

export const clients: Client[] = [
  { id: "c1", tenantId: "t1", nome: "Mariana Souza", cpf: "123.456.789-00", telefone: "(11) 99999-1111", whatsapp: "(11) 99999-1111", email: "mariana@email.com", ultimaVisita: "2026-05-12" },
  { id: "c2", tenantId: "t1", nome: "Ricardo Lima", cpf: "234.567.890-11", telefone: "(11) 98888-2222", whatsapp: "(11) 98888-2222", email: "ricardo@email.com", ultimaVisita: "2026-06-01" },
  { id: "c3", tenantId: "t1", nome: "Juliana Castro", cpf: "345.678.901-22", telefone: "(11) 97777-3333", whatsapp: "(11) 97777-3333", email: "juliana@email.com", ultimaVisita: "2026-04-22" },
  { id: "c4", tenantId: "t1", nome: "Felipe Andrade", cpf: "456.789.012-33", telefone: "(11) 96666-4444", whatsapp: "(11) 96666-4444", email: "felipe@email.com", ultimaVisita: "2026-06-10" },
  { id: "c5", tenantId: "t1", nome: "Patrícia Mendes", cpf: "567.890.123-44", telefone: "(11) 95555-5555", whatsapp: "(11) 95555-5555", email: "patricia@email.com", ultimaVisita: "2026-03-30" },
  { id: "c6", tenantId: "t2", nome: "Carlos Eduardo", cpf: "678.901.234-55", telefone: "(21) 94444-6666", whatsapp: "(21) 94444-6666", email: "carlos@email.com", ultimaVisita: "2026-06-05" },
  { id: "c7", tenantId: "t2", nome: "Ana Beatriz", cpf: "789.012.345-66", telefone: "(21) 93333-7777", whatsapp: "(21) 93333-7777", email: "ana@email.com", ultimaVisita: "2026-05-28" },
];

export type Pet = {
  id: string;
  tenantId: string;
  clientId: string;
  nome: string;
  especie: "Cão" | "Gato" | "Ave" | "Coelho";
  raca: string;
  sexo: "Macho" | "Fêmea";
  nascimento: string;
  peso: number;
  status: "Ativo" | "Inativo";
};

export const pets: Pet[] = [
  { id: "p1", tenantId: "t1", clientId: "c1", nome: "Thor", especie: "Cão", raca: "Golden Retriever", sexo: "Macho", nascimento: "2021-06-18", peso: 28.5, status: "Ativo" },
  { id: "p2", tenantId: "t1", clientId: "c1", nome: "Luna", especie: "Gato", raca: "Persa", sexo: "Fêmea", nascimento: "2022-03-10", peso: 4.2, status: "Ativo" },
  { id: "p3", tenantId: "t1", clientId: "c2", nome: "Bidu", especie: "Cão", raca: "Vira-lata", sexo: "Macho", nascimento: "2019-11-02", peso: 12.0, status: "Ativo" },
  { id: "p4", tenantId: "t1", clientId: "c3", nome: "Mel", especie: "Cão", raca: "Poodle", sexo: "Fêmea", nascimento: "2023-06-22", peso: 6.8, status: "Ativo" },
  { id: "p5", tenantId: "t1", clientId: "c4", nome: "Simba", especie: "Gato", raca: "SRD", sexo: "Macho", nascimento: "2020-08-14", peso: 5.5, status: "Ativo" },
  { id: "p6", tenantId: "t1", clientId: "c5", nome: "Nina", especie: "Cão", raca: "Shih Tzu", sexo: "Fêmea", nascimento: "2024-02-01", peso: 4.0, status: "Ativo" },
  { id: "p7", tenantId: "t1", clientId: "c2", nome: "Rex", especie: "Cão", raca: "Labrador", sexo: "Macho", nascimento: "2018-06-30", peso: 32.1, status: "Ativo" },
  { id: "p8", tenantId: "t2", clientId: "c6", nome: "Bella", especie: "Cão", raca: "Bulldog Francês", sexo: "Fêmea", nascimento: "2022-09-09", peso: 10.5, status: "Ativo" },
  { id: "p9", tenantId: "t2", clientId: "c7", nome: "Tom", especie: "Gato", raca: "Siamês", sexo: "Macho", nascimento: "2021-12-25", peso: 4.8, status: "Ativo" },
];

const today = new Date();
const addDays = (d: number) => {
  const x = new Date(today); x.setDate(x.getDate() + d); return x.toISOString().slice(0, 10);
};

export type Vaccine = {
  id: string; tenantId: string; petId: string;
  vacina: string; aplicacao: string; proximaDose: string;
};

export const vaccines: Vaccine[] = [
  { id: "v1", tenantId: "t1", petId: "p1", vacina: "V10", aplicacao: "2025-06-20", proximaDose: addDays(5) },
  { id: "v2", tenantId: "t1", petId: "p1", vacina: "Antirrábica", aplicacao: "2025-07-10", proximaDose: addDays(22) },
  { id: "v3", tenantId: "t1", petId: "p2", vacina: "V4 Felina", aplicacao: "2025-05-15", proximaDose: addDays(-10) },
  { id: "v4", tenantId: "t1", petId: "p3", vacina: "V10", aplicacao: "2025-08-01", proximaDose: addDays(45) },
  { id: "v5", tenantId: "t1", petId: "p4", vacina: "V8", aplicacao: "2025-09-05", proximaDose: addDays(80) },
  { id: "v6", tenantId: "t1", petId: "p5", vacina: "V4 Felina", aplicacao: "2025-08-20", proximaDose: addDays(12) },
  { id: "v7", tenantId: "t1", petId: "p6", vacina: "V8", aplicacao: "2026-02-10", proximaDose: addDays(27) },
  { id: "v8", tenantId: "t1", petId: "p7", vacina: "Antirrábica", aplicacao: "2025-06-15", proximaDose: addDays(-30) },
  { id: "v9", tenantId: "t2", petId: "p8", vacina: "V10", aplicacao: "2025-09-10", proximaDose: addDays(6) },
  { id: "v10", tenantId: "t2", petId: "p9", vacina: "V4 Felina", aplicacao: "2025-12-01", proximaDose: addDays(60) },
];

export type VaccineStatus = "em-dia" | "30d" | "15d" | "7d" | "vencida";
export function vaccineStatus(prox: string): VaccineStatus {
  const diff = Math.ceil((new Date(prox).getTime() - today.getTime()) / 86400000);
  if (diff < 0) return "vencida";
  if (diff <= 7) return "7d";
  if (diff <= 15) return "15d";
  if (diff <= 30) return "30d";
  return "em-dia";
}
export const statusLabel: Record<VaccineStatus, string> = {
  "em-dia": "Em dia", "30d": "Vence em 30 dias", "15d": "Vence em 15 dias", "7d": "Vence em 7 dias", "vencida": "Vencida",
};

export type Appointment = {
  id: string; tenantId: string; petId: string;
  data: string; hora: string; tipo: string; veterinario: string; status: "Agendada" | "Concluída" | "Cancelada";
};

export const appointments: Appointment[] = [
  { id: "a1", tenantId: "t1", petId: "p1", data: addDays(0), hora: "09:00", tipo: "Consulta de rotina", veterinario: "Dra. Helena", status: "Agendada" },
  { id: "a2", tenantId: "t1", petId: "p2", data: addDays(0), hora: "10:30", tipo: "Vacinação", veterinario: "Dr. Bruno", status: "Agendada" },
  { id: "a3", tenantId: "t1", petId: "p3", data: addDays(1), hora: "14:00", tipo: "Retorno", veterinario: "Dra. Helena", status: "Agendada" },
  { id: "a4", tenantId: "t1", petId: "p4", data: addDays(2), hora: "11:00", tipo: "Vacinação", veterinario: "Dr. Bruno", status: "Agendada" },
  { id: "a5", tenantId: "t1", petId: "p5", data: addDays(-3), hora: "15:00", tipo: "Consulta", veterinario: "Dra. Helena", status: "Concluída" },
  { id: "a6", tenantId: "t1", petId: "p6", data: addDays(-7), hora: "09:30", tipo: "Castração", veterinario: "Dr. Bruno", status: "Concluída" },
  { id: "a7", tenantId: "t2", petId: "p8", data: addDays(0), hora: "16:00", tipo: "Consulta", veterinario: "Dra. Carla", status: "Agendada" },
];

export type Message = {
  id: string; tenantId: string; petId: string;
  data: string; tipo: "Vacinação" | "Aniversário" | "Retorno" | "Consulta" | "Vermífugo";
  status: "Enviada" | "Pendente" | "Erro";
};

export const messages: Message[] = [
  { id: "m1", tenantId: "t1", petId: "p1", data: addDays(0), tipo: "Vacinação", status: "Enviada" },
  { id: "m2", tenantId: "t1", petId: "p2", data: addDays(0), tipo: "Vacinação", status: "Enviada" },
  { id: "m3", tenantId: "t1", petId: "p3", data: addDays(-1), tipo: "Retorno", status: "Enviada" },
  { id: "m4", tenantId: "t1", petId: "p4", data: addDays(-2), tipo: "Aniversário", status: "Enviada" },
  { id: "m5", tenantId: "t1", petId: "p7", data: addDays(0), tipo: "Vacinação", status: "Pendente" },
  { id: "m6", tenantId: "t2", petId: "p8", data: addDays(0), tipo: "Consulta", status: "Enviada" },
];

export type Product = {
  id: string; tenantId: string; nome: string; tipo: "Produto" | "Serviço"; preco: number; estoque: number | null;
};

export const products: Product[] = [
  { id: "pr1", tenantId: "t1", nome: "Consulta clínica", tipo: "Serviço", preco: 150, estoque: null },
  { id: "pr2", tenantId: "t1", nome: "Vacina V10", tipo: "Produto", preco: 90, estoque: 24 },
  { id: "pr3", tenantId: "t1", nome: "Vacina Antirrábica", tipo: "Produto", preco: 60, estoque: 30 },
  { id: "pr4", tenantId: "t1", nome: "Banho & Tosa", tipo: "Serviço", preco: 80, estoque: null },
  { id: "pr5", tenantId: "t1", nome: "Vermífugo", tipo: "Produto", preco: 45, estoque: 50 },
  { id: "pr6", tenantId: "t2", nome: "Consulta clínica", tipo: "Serviço", preco: 180, estoque: null },
];

export type Hospitalization = {
  id: string; tenantId: string; petId: string; entrada: string; saida: string | null; motivo: string; status: "Internado" | "Alta";
};

export const hospitalizations: Hospitalization[] = [
  { id: "h1", tenantId: "t1", petId: "p5", entrada: addDays(-2), saida: null, motivo: "Pós-cirúrgico", status: "Internado" },
  { id: "h2", tenantId: "t1", petId: "p3", entrada: addDays(-10), saida: addDays(-7), motivo: "Observação", status: "Alta" },
  { id: "h3", tenantId: "t2", petId: "p9", entrada: addDays(-1), saida: null, motivo: "Desidratação", status: "Internado" },
];

export function getClientPetCount(clientId: string, tenantId: string) {
  return pets.filter((p) => p.clientId === clientId && p.tenantId === tenantId).length;
}

export function petName(id: string) { return pets.find((p) => p.id === id)?.nome ?? "—"; }
export function petTutor(id: string) {
  const pet = pets.find((p) => p.id === id); if (!pet) return "—";
  return clients.find((c) => c.id === pet.clientId)?.nome ?? "—";
}

export function birthdaysThisMonth(tenantId: string) {
  const m = new Date().getMonth();
  return pets.filter((p) => p.tenantId === tenantId && new Date(p.nascimento).getMonth() === m);
}

export const petsPorMes = [
  { mes: "Jan", total: 12 }, { mes: "Fev", total: 18 }, { mes: "Mar", total: 15 },
  { mes: "Abr", total: 22 }, { mes: "Mai", total: 28 }, { mes: "Jun", total: 24 },
];
export const vacinasPorMes = [
  { mes: "Jan", total: 30 }, { mes: "Fev", total: 42 }, { mes: "Mar", total: 38 },
  { mes: "Abr", total: 55 }, { mes: "Mai", total: 61 }, { mes: "Jun", total: 48 },
];
export const consultasPorMes = [
  { mes: "Jan", total: 45 }, { mes: "Fev", total: 52 }, { mes: "Mar", total: 60 },
  { mes: "Abr", total: 58 }, { mes: "Mai", total: 72 }, { mes: "Jun", total: 65 },
];
export const retornoPorMes = [
  { mes: "Jan", taxa: 58 }, { mes: "Fev", taxa: 62 }, { mes: "Mar", taxa: 65 },
  { mes: "Abr", taxa: 70 }, { mes: "Mai", taxa: 74 }, { mes: "Jun", taxa: 78 },
];