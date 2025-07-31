export async function loginAction({ request }) {
  const formData = await request.formData();

  console.log('Logado!');
}
