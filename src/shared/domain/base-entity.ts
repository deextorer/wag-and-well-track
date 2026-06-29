export type UUID = string;

export type BaseEntity = {
  id: UUID;
  tenantId: UUID;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: UUID | null;
  updatedBy: UUID | null;
};
