import { Entity } from '@shared/core/Entity';

interface RoleProps {
  name: string;
}

export class Role extends Entity<RoleProps> {
  private constructor(props: RoleProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  public static create(props: RoleProps, id?: string): Role {
    return new Role(props, id);
  }
}
