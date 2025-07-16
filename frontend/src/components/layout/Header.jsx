import LogoImage from '../Logo';

export default function Header() {
  return (
    <header className="flex items-center justify-center p-6 bg-gray-100 border-b-2 border-gray-300">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <LogoImage className="h-16 w-auto" />
      </h1>
    </header>
  );
}
