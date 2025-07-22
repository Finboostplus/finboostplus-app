import { redirect } from 'react-router';
import { mockGroups } from '../mockGroups';

export async function groupDetailsLoader({ params }) {
  const groupId = params['group-id'];
  const group = mockGroups.find(({ id }) => id === groupId);
  if (!group) return redirect('/Notfound');
  return group;
}
