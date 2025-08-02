export async function loginAction({ request }) {
  const formData = await request.formData();
  const username = formData.get('email');
  if (!username) {
    return {
      type: 'error',
      message: 'Por favor, preencha o nome de usuário.',
    };
  }
  console.log('Logado!');
}
