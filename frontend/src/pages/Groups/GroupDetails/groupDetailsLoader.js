import groupsData from '../../../mockData/user/groups.data';

export async function groupDetailsLoader({ params }) {
  const groupId = params['group-id'];
  const group = groupsData.find(({ id }) => id === groupId);

  if (!group) {
    throw new Response('Grupo não encontrado', { status: 404 });
  }

  return group;
}
