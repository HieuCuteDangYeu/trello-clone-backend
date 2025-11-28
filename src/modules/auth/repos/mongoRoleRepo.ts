import { Role } from '../domain/role';
import { RoleModel } from '../infra/roleModel';
import { IRoleRepo } from './roleRepo';

export class MongoRoleRepo implements IRoleRepo {
  async save(role: Role): Promise<void> {
    await RoleModel.create({
      _id: role.id,
      name: role.name,
    });
  }

  async getRoleByName(name: string): Promise<Role | null> {
    const roleDoc = await RoleModel.findOne({ name });
    if (!roleDoc) return null;

    return Role.create({ name: roleDoc.name }, roleDoc._id);
  }

  async getRoleById(roleId: string): Promise<Role | null> {
    const roleDoc = await RoleModel.findById(roleId);
    if (!roleDoc) return null;
    return Role.create({ name: roleDoc.name }, roleDoc._id);
  }

  async findAll(): Promise<Role[]> {
    const docs = await RoleModel.find({});
    return docs.map((d) => Role.create({ name: d.name }, d._id));
  }
}
