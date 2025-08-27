import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { to: "/vocabulary", label: "Vocabulary", icon: "📘", active: "bg-indigo-600" },
    { to: "/idioms", label: "Idioms", icon: "📝", active: "bg-purple-600" },
    { to: "/phrasalverbs", label: "Phrasal Verbs", icon: "🔧", active: "bg-green-600" },
    { to: "/onewordsubstitution", label: "One Word Substitution", icon: "💡", active: "bg-pink-600" },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Overlay (only mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 z-30 bg-gradient-to-b 
        from-indigo-50 via-purple-50 to-pink-50 shadow-lg transform 
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-indigo-800 mb-8 text-center">
            English Mastery
          </h3>

          {/* Menu Items */}
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                      isActive
                        ? `${item.active} text-white shadow-lg`
                        : "bg-white/70 text-gray-700 hover:bg-white/90"
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 overflow-y-auto p-4 relative">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden mb-4 p-2 bg-indigo-600 text-white rounded-lg shadow-md"
        >
          ☰ Menu
        </button>

        <Outlet />

        {/* ✅ Floating Home Button (bottom-right) */}
        <button
          onClick={() => navigate("/")}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Go Home"
        >
          🏠
        </button>
      </div>
    </div>
  );
}

export default Layout;
