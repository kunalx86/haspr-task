# HASPR TASK

## Following are the API Routes
### Auth
- `/api/auth`- GET - Admin - All User Credentials, password hashed
- `/api/auth/login` - POST - `{ username, password }` - JWT Token
- `/api/auth/register` - POST - `{ username, password }` - Registeration
### User Info
- `/api/info` - GET - Authenticated Users - All User Info
- `/api/info` - POST - `{ data: [{ key, value }] }` - Create key/value info
- `/api/info` - PUT - `{  key, value }` - Modify key/value info
- `/api/info/:key` - DELETE - Delete the key info
### Admin
- `/api/admin` - GET - Admin - All User info
- `/api/admin/:id/:key` - DELETE - Delete the user's particular key data