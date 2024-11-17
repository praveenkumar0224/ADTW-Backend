import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: ['upload', 'get'],
  [Role.ADMIN]: ['get', 'manage', 'upload']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
