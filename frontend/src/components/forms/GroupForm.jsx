import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import TextareaUI from '../ui/Textarea';
import { categoryIcons } from '../../mockData/groupIcons/icons';
import { createGroup } from '../../services/groups';
import { Form } from 'react-router';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { customToast } from '../CustomToast';
import {
  createGroupFormSchema,
  validatorGroupForm,
} from '../../schemas/createGroup/form';
import { ZodError } from 'zod';

export default function GroupForm({ page }) {
  const queryClient = useQueryClient();

  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('outros');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'page', page],
      });
      setGroupName('');
      setDescription('');
      setSelectedIcon('outros');
      customToast(
        'Cadastro de um novo grupo',
        'Grupo cadastrado com sucesso',
        'success'
      );
    },
    onError: () => {
      customToast(
        'Cadstro de um novo grupo',
        'Erro ao cadastrar um novo grupo',
        'error'
      );
    },
  });

  const isDisabled = isPending || groupName.trim() === '';

  const entry = categoryIcons[selectedIcon] || categoryIcons.outros;
  const IconComponent = entry.icon;
  const iconColor = entry.color;

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (isPending || isDisabled) return;

      const formData = {
        name: groupName,
        description,
        icon: selectedIcon,
      };

      if (validatorGroupForm(formData)) {
        await mutateAsync(formData);
      }
    },
    [isPending, isDisabled, groupName, selectedIcon, mutateAsync]
  );

  return (
    <Form
      onSubmit={handleSubmit}
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

      {/* Nome + Ícone preview */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do grupo <span className="text-primary">*</span>
        </label>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-300 dark:border-surface-dark bg-neutral dark:bg-neutral-dark text-primary text-xl">
            <IconComponent size={24} color={iconColor} />
          </div>

          <InputUI
            id="name"
            name="name"
            type="text"
            required
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="Ex: Família, Viagem Cancun..."
            className="flex-1"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <TextareaUI
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full min-h-[100px] rounded-lg border border-border bg-background px-3 py-2 text-text shadow-sm transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-muted resize-none"
          placeholder="Opcional: Adicione uma descrição para o grupo..."
        />
      </div>

      {/* Ícones */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Ícone do grupo</label>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-3 mt-2">
          {Object.keys(categoryIcons).map(key => {
            const { icon: Icon, color } = categoryIcons[key];
            return (
              <ButtonUI
                key={key}
                type="button"
                onClick={() => setSelectedIcon(key)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-150 cursor-pointer ${
                  selectedIcon === key
                    ? 'bg-primary text-white border-primary shadow-sm scale-105'
                    : 'bg-neutral dark:bg-neutral-dark text-text dark:text-text-dark border-zinc-300 dark:border-surface-dark hover:border-primary/60 hover:scale-105'
                }`}
              >
                <Icon size={20} color={color} />
              </ButtonUI>
            );
          })}
        </div>

        {selectedIcon && (
          <p className="text-xs text-muted dark:text-muted-dark mt-1">
            Ícone selecionado:{' '}
            <span className="font-medium">{selectedIcon}</span>
          </p>
        )}
      </div>

      {/* Botão */}
      <div className="flex justify-end pt-4">
        <ButtonUI
          type="submit"
          disabled={isDisabled}
          className={`px-6 cursor-pointer py-2 rounded-lg font-semibold shadow-sm text-white transition-all duration-200 ${
            isDisabled
              ? 'bg-primary/60 cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90 active:bg-primary-dark cursor-pointer'
          }`}
        >
          {isPending ? 'Criando...' : 'Criar grupo'}
        </ButtonUI>
      </div>
    </Form>
  );
}
