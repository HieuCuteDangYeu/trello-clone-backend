import { Role } from '../../auth/domain/role';

export interface IRoleRepo {
  save(role: Role): Promise<void>;
  getRoleByName(name: string): Promise<Role | null>;
  getRoleById(roleId: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
}
