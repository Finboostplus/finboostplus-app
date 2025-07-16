import SidebarNav from '../SidebarNav';
import UserGreeting from '../UserGreeting';

export default function Sidebar() {
  return (
    <div className=" w-64 bg-gray-100 border-r-2 border-gray-300 p-8 flex flex-col flex-shrink-0">
      <UserGreeting />
      <SidebarNav />
    </div>
  );
}
