import { useState, useEffect } from 'react';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previne o prompt automático
      e.preventDefault();
      // Salva o evento para usar depois
      setDeferredPrompt(e);
      // Mostra o botão de instalação
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      // Esconde o botão quando o app for instalado
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Aguarda a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted PWA installation');
    } else {
      console.log('User rejected PWA installation');
    }

    // Limpa o prompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Instalar App</h3>
            <p className="text-xs opacity-90">
              Instale o FinBoost+ para acesso rápido
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleInstallClick}
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Instalar
            </button>
            <button
              onClick={() => setShowInstallButton(false)}
              className="text-white hover:bg-blue-700 px-2 py-1 rounded text-sm transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstaller;
