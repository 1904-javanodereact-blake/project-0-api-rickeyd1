import { SqlRole } from '../dto/sql-role.dto';
import { Role } from '../model/role';

export function converSqlRole(role: SqlRole) {
    return new Role(role.role_id, role.role);
}