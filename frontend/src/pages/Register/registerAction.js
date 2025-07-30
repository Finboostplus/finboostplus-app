export async function registerAction({ request }) {
  const formData = await request.formData();

  console.log('Cadastrado!');
}
