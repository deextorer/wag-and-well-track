import { createContext, useContext, useState, type ReactNode } from "react";
import { tenants, type Tenant } from "./mock-data";

type Ctx = { current: Tenant; setCurrent: (t: Tenant) => void; tenants: Tenant[] };
const TenantCtx = createContext<Ctx | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Tenant>(tenants[0]);
  return <TenantCtx.Provider value={{ current, setCurrent, tenants }}>{children}</TenantCtx.Provider>;
}

export function useTenant() {
  const ctx = useContext(TenantCtx);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}