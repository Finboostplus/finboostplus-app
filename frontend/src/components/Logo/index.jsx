import { useStore } from 'zustand';
import { useThemeStore } from '../../context/store/theme';

export default function LogoImage({ className }) {
  const { logo_image } = useStore(useThemeStore);

  return (
    <div className="flex flex-col">
      <img src={logo_image} alt="Logo" className={className} />
      <p className="text-[0.7rem] ml-4 text-muted italic font-principal">
        Controle seus gastos de forma simples e compartilhada
      </p>
    </div>
  );
}
