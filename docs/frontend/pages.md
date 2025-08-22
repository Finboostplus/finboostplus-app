# Páginas - Frontend FinBoost+

## Visão Geral

As páginas do FinBoost+ seguem arquitetura SPA com React Router, implementando lazy loading e padrões consistentes para melhor performance e manutenibilidade.

## Estrutura de Roteamento

### Rotas Públicas
- `/login` - Página de login
- `/register` - Página de cadastro
- `/forgot-password` - Recuperação de senha

### Rotas Protegidas
- `/dashboard` - Dashboard principal
- `/groups` - Listagem de grupos
- `/groups/:groupId` - Detalhes do grupo
- `/profile` - Perfil do usuário
- `/expenses` - Todas as despesas

## Páginas Principais

=== "Dashboard"

    **Propósito:** Visão geral das finanças com resumos e gráficos.

    **Componentes:** `SummaryCards`, `ChartSwitcher`, `LatestExpenses`, `UserGreeting`

    ```jsx
    const Dashboard = () => {
      const { user } = useAuth();
      const { summary, loading } = useDashboardData();

      if (loading) return <Loading />;

      return (
        <div className="dashboard-container">
          <UserGreeting user={user} />
          <SummaryCards data={summary} />
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartSwitcher data={summary.chartData} />
            <LatestExpenses limit={10} />
          </div>
        </div>
      );
    };
    ```

=== "Login/Register"

    **Login:** Autenticação com validação em tempo real
    
    ```javascript
    // Validação
    {
      email: z.string().email("Email inválido"),
      password: z.string().min(6, "Mínimo 6 caracteres")
    }
    ```

    **Register:** Cadastro com validação de senha forte
    - Senha: mínimo 8 caracteres, maiúscula, número, símbolo
    - Confirmação de senha obrigatória
    - Termos de uso (checkbox)

=== "Groups"

    **Propósito:** Gestão de grupos de despesas

    **Features:** Grid responsivo, filtros avançados, busca, ações rápidas

    **Estados:** Ativo, Inativo, Arquivado

    **Componentes:** `GroupCard`, `GroupForm`, `GroupFilters`

=== "Profile/Expenses"

    **Profile:** Informações pessoais, estatísticas, configurações

    **Expenses:** Lista paginada com filtros (período, categoria, grupo, valor)

## Padrões de Implementação

### Lazy Loading & Suspense

```jsx
// Lazy Loading
const Dashboard = lazy(() => import('../pages/Dashboard'));

// Suspense Boundary
<Suspense fallback={<Loading />}>
  <Outlet />
</Suspense>
```

### Data Fetching Padrão

```jsx
const MyPage = () => {
  const { data, loading, error } = usePageData();
  
  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} />;
  
  return <PageContent data={data} />;
};
```

### React Router Loaders

!!! example "Loader para dados pré-renderização"

    ```jsx
    export const groupDetailsLoader = async ({ params }) => {
      const groupId = params.groupId;
      
      try {
        const [group, members, expenses] = await Promise.all([
          groupsService.getById(groupId),
          groupsService.getMembers(groupId),
          expensesService.getByGroup(groupId)
        ]);
        
        return { group, members, expenses };
      } catch (error) {
        throw new Response("Grupo não encontrado", { status: 404 });
      }
    };
    ```

### Actions para Formulários

```jsx
export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  
  try {
    await authService.login(credentials);
    return redirect('/dashboard');
  } catch (error) {
    return { error: error.message };
  }
};
```

## Layout e Templates

### Layout Principal

```jsx
const Layout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </main>
    <Toast />
  </div>
);
```

### Page Template Reutilizável

```jsx
const PageTemplate = ({ title, actions, children }) => (
  <div className="page-container">
    <PageHeader title={title} actions={actions} />
    <div className="page-content">
      {children}
    </div>
  </div>
);
```

## Otimizações

### Performance

=== "Code Splitting"

    ```jsx
    const routes = [
      {
        path: '/dashboard',
        component: lazy(() => import('./Dashboard')),
        preload: () => import('./Dashboard')
      }
    ];
    ```

=== "Memoização"

    ```jsx
    const ExpensivePage = memo(({ data }) => {
      const processedData = useMemo(() => 
        heavyDataProcessing(data), [data]
      );
      return <div>{/* Renderização */}</div>;
    });
    ```

=== "Loading States"

    ```jsx
    const DashboardSkeleton = () => (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
    ```

### SEO e Acessibilidade

```jsx
// Meta tags dinâmicas
useEffect(() => {
  document.title = `${group.name} - FinBoost+`;
}, [group]);

// Estrutura semântica
<div>
  <header>
    <h1>Título da Página</h1>
    <nav aria-label="Breadcrumb">
      <Breadcrumb />
    </nav>
  </header>
  <main>
    <section aria-labelledby="main-content">
      <h2 id="main-content">Conteúdo Principal</h2>
    </section>
  </main>
</div>
```

## Testes

!!! tip "Padrão de Teste"

    ```jsx
    describe('Dashboard Page', () => {
      it('should render dashboard with user data', async () => {
        const mockUser = { name: 'João', id: 1 };
        
        renderWithProviders(<Dashboard />, {
          authContext: { user: mockUser }
        });
        
        expect(screen.getByText(/olá, joão/i)).toBeInTheDocument();
      });
    });
    ```

---

!!! success "Resumo"
As páginas seguem padrões consistentes priorizando **performance**, **acessibilidade** e **experiência do usuário**. A arquitetura modular facilita manutenção e expansão.