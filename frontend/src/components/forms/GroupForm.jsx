import { Form, useNavigation } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import TextareaUI from '../ui/Textarea';
export default function GroupForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form
      method="post"
      onSubmit={e => {
        e.preventDefault();
        setTimeout(() => true, 7000);
      }}
      className="
        h-full w-full 
        flex flex-col 
        bg-surface dark:bg-surface-dark 
        p-6 md:p-8 
        rounded-none md:rounded-2xl 
        space-y-6
        text-text dark:text-text-dark
      "
    >
      <h2 className="text-2xl font-bold text-text dark:text-text-dark">
        Criar novo grupo
      </h2>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-text dark:text-muted-dark"
        >
          Nome do grupo *
        </label>
        <InputUI
          id="name"
          name="name"
          type="text"
          required
          className="
            px-4 py-2 
            rounded-lg 
            bg-neutral dark:bg-neutral-dark
            border border-zinc-300 dark:border-surface-dark
            text-text dark:text-text-dark
            placeholder:text-muted dark:placeholder:text-muted-dark
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
          "
          placeholder="Ex: Família, Viagem Cancun..."
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-text dark:text-muted-dark"
        >
          Descrição
        </label>
        <TextareaUI
          id="description"
          name="description"
          rows={4}
          className="
            px-4 py-2 
            rounded-lg 
            bg-surface dark:bg-neutral-dark
            border border-zinc-300 dark:border-surface-dark
            text-text dark:text-text-dark
            placeholder:text-muted dark:placeholder:text-muted-dark
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            resize-none
            transition-all duration-200
          "
          placeholder="Opcional: Adicione uma descrição..."
        />
      </div>

      <div className="flex-1" />

      <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-surface-dark">
        <ButtonUI
          type="submit"
          disabled={isSubmitting}
          title={isSubmitting ? 'Criando...' : 'Criar grupo'}
          className="
            px-6 py-2 
            bg-primary hover:bg-secondary
            text-white 
            font-semibold 
            rounded-lg 
            shadow-sm
            active:bg-primary-dark
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-surface-dark
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
          "
        />
      </div>
    </Form>
  );
}
