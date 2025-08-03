import userData from '../../../mockData/user/user.data';

export async function groupDetailsLoader({ params }) {
  const groupId = params['group-id'];
  const group = userData.groups.find(({ id }) => id === groupId);

  if (!group) {
    throw new Response('Grupo não encontrado', { status: 404 });
  }

  return group;
}
