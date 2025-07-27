export default function LogoImage({ className }) {
  return (
    <div>
      <img src="/logo.png" alt="Logo da Finboostplus" className={className} />
      <p
        className="text-[0.7rem] ml-4 text-muted italic font-principal"
        aria-label="Slogan"
      >
        Controle seus gastos de forma simples e compartilhada
      </p>
    </div>
  );
}
