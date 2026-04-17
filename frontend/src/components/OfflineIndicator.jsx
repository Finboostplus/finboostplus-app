import { useOnlineStatus } from '../hooks/useOnlineStatus';

const OfflineIndicator = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
      <span className="text-sm font-medium">
        📡 Você está offline. Algumas funcionalidades podem estar limitadas.
      </span>
    </div>
  );
};

export default OfflineIndicator;
