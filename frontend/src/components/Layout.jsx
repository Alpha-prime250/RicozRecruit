import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Users, CalendarClock, FileSignature, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard", end: true, icon: LayoutDashboard },
  { to: "/jobs", label: "Job Requisitions", icon: Briefcase },
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/interviews", label: "Interviews", icon: CalendarClock },
  { to: "/offers", label: "Offers", icon: FileSignature },
];

function initials(name = "") {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <h1>Ricoz<span>Recruit</span></h1>
            <small>Talent Acquisition</small>
          </div>
        </div>

        {links.map((l) => {
          const Icon = l.icon;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              <Icon /> {l.label}
            </NavLink>
          );
        })}

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials(user?.name)}</div>
            <div className="user-meta">
              <strong>{user?.name}</strong>
              <span className="muted">{user?.role?.replace("_", " ")}</span>
            </div>
          </div>
          <button
            className="btn secondary small"
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut /> Logout
          </button>
        </div>
      </aside>
      <main className="main fade-in">{children}</main>
    </div>
  );
}
