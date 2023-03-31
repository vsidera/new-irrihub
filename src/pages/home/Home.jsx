import Sidebar from "../../components/sidebar/sidebar";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
// import "./home.scss";

const Home = () => {
  return (
    <AdminSidebar>
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 mt-8">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-xl">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Clients
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,000
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-xl">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Patners
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            3k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-xl">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Devices
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div>
    </AdminSidebar>
  );
};

export default Home;