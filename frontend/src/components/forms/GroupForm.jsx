import { useState } from 'react';
import { Form, useNavigation, useActionData } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import TextareaUI from '../ui/Textarea';
import { MdCategory } from 'react-icons/md';
import { categoryIcons } from '../../mockData/groupIcons/icons';

export default function GroupForm() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const values = actionData?.values || {};

  const [groupName, setGroupName] = useState(values.name || '');
  // 👉 define "outros" como padrão, caso values.icon esteja vazio
  const [selectedIcon, setSelectedIcon] = useState(values.icon || 'outros');

  const isDisabled = isSubmitting || groupName.trim() === '';

  // obtém o componente do ícone selecionado (ou o padrão)
  const selectedIconObj = categoryIcons.find(icon => icon.key === selectedIcon)
    ?.icon || <MdCategory />;

  return (
    <Form
      method="post"
      className="h-full w-full flex flex-col bg-surface dark:bg-surface-dark p-6 md:p-8 rounded-none md:rounded-2xl space-y-6 text-text dark:text-text-dark"
    >
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-center md:text-left">
          Criar novo grupo
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark mt-1">
          Preencha as informações abaixo para começar a organizar suas despesas.
        </p>
      </div>

      {/* Campo: Nome + Preview do ícone */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do grupo <span className="text-primary">*</span>
        </label>

        <div className="flex items-center gap-3">
          {/* Ícone de preview */}
          <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-300 dark:border-surface-dark bg-neutral dark:bg-neutral-dark text-primary text-xl">
            {selectedIconObj}
          </div>

          {/* Campo de texto */}
          <InputUI
            id="name"
            name="name"
            type="text"
            required
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="Ex: Família, Viagem Cancun..."
            className="flex-1 px-4 py-2 rounded-lg bg-neutral dark:bg-neutral-dark border border-zinc-300 dark:border-surface-dark text-text dark:text-text-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Campo: Descrição */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <TextareaUI
          id="description"
          name="description"
          rows={4}
          defaultValue={values.description || ''}
          placeholder="Opcional: Adicione uma descrição para o grupo..."
          className="px-4 py-2 rounded-lg bg-neutral dark:bg-neutral-dark border border-zinc-300 dark:border-surface-dark text-text dark:text-text-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200"
        />
      </div>

      {/* Campo: Ícone */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Ícone do grupo</label>
        <input type="hidden" name="icon" value={selectedIcon} />

        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-3 mt-2">
          {categoryIcons.map(icon => (
            <ButtonUI
              key={icon.key}
              type="button"
              onClick={() => setSelectedIcon(icon.key)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-150 cursor-pointer ${
                selectedIcon === icon.key
                  ? 'bg-primary text-white border-primary shadow-sm scale-105'
                  : 'bg-neutral dark:bg-neutral-dark text-text dark:text-text-dark border-zinc-300 dark:border-surface-dark hover:border-primary/60 hover:scale-105'
              }`}
            >
              {icon.icon}
            </ButtonUI>
          ))}
        </div>

        {selectedIcon && (
          <p className="text-xs text-muted dark:text-muted-dark mt-1">
            Ícone selecionado:{' '}
            <span className="font-medium">{selectedIcon}</span>
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="flex justify-end pt-4 dark:border-surface-dark">
        <ButtonUI
          type="submit"
          disabled={isDisabled}
          className={`px-6 py-2 rounded-lg font-semibold shadow-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-surface-dark ${
            isDisabled
              ? 'bg-primary/60 cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90 active:bg-primary-dark cursor-pointer'
          }`}
        >
          <span>{isSubmitting ? 'Criando...' : 'Criar grupo'}</span>
        </ButtonUI>
      </div>
    </Form>
  );
}
