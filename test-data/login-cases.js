import { users, invalidUsers, PASSWORD } from './users';
import { errors } from './messages';

export const invalidLoginCases = [
    { name: 'empty username and password', username: '', password: '', error: errors.usernameRequired },
    { name: 'username without password', username: users.standard.username, password: '', error: errors.passwordRequired },
    { name: 'password without username', username: '', password: PASSWORD, error: errors.usernameRequired },
    { name: 'unknown username', ...invalidUsers.unknown, error: errors.invalidCredentials },
    { name: 'wrong password', ...invalidUsers.wrongPassword, error: errors.invalidCredentials },
    { name: 'capitalised username', ...invalidUsers.capitalisedUsername, error: errors.invalidCredentials },
    { name: 'capitalised password', ...invalidUsers.capitalisedPassword, error: errors.invalidCredentials },
    { name: 'locked out user', ...users.lockedOut, error: errors.lockedOut },
];