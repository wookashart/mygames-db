export interface AuditData {
  createDate: Date;
  editDate: Date;
  createBy: AuditUserData;
  editBy: AuditUserData;
}

export interface AuditUserData {
  id: number;
  name: string;
}
