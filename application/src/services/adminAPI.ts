import http from './http';

export const checkAdminAccess = async () => {
  return (await http.get('/admin/check-access'));
}