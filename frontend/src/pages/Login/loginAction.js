export async function loginOrRegisterAction({ request }) {
  const formData = await request.formData();
  const type = formData.get('type');

  if (type === 'register') {
    console.log('Cadastrado!');
    return;
  }

  console.log('Logado!');
}
