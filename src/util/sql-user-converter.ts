import { User } from '../model/user';
import { SqlUser } from '../dto/sql-user.dto';

export function convertSqlUser(user: SqlUser) {
    return new User(user.user_id, user.username, undefined, user.first_name, user.last_name, user.email, user.role, user.img);
}