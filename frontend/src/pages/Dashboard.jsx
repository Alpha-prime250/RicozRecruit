import { useEffect, useState } from "react";
import { Briefcase, ClipboardCheck, Users, CalendarClock, FileSignature } from "lucide-react";
import api from "../api/axios";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const [jobsRes, candidatesRes, interviewsRes, offersRes] = await Promise.all([
        api.get("/jobs"),
        api.get("/candidates"),
        api.get("/interviews"),
        api.get("/offers"),
      ]);
      const jobs = jobsRes.data;
      const interviews = interviewsRes.data;
      setStats({
        openJobs: jobs.filter((j) => j.status === "open").length,
        pendingApprovals: jobs.filter((j) => j.approvalStatus === "pending").length,
        candidates: candidatesRes.data.length,
        upcomingInterviews: interviews.filter(
          (i) => i.status === "scheduled" && new Date(i.scheduledAt) >= new Date()
        ).length,
        openOffers: offersRes.data.filter((o) => ["draft", "sent"].includes(o.status)).length,
      });
    })();
  }, []);

  if (!stats) return <Spinner label="Loading dashboard..." />;

  const cards = [
    { label: "Open Jobs", value: stats.openJobs, icon: Briefcase },
    { label: "Pending Approvals", value: stats.pendingApprovals, icon: ClipboardCheck },
    { label: "Candidates Sourced", value: stats.candidates, icon: Users },
    { label: "Upcoming Interviews", value: stats.upcomingInterviews, icon: CalendarClock },
    { label: "Offers In Progress", value: stats.openOffers, icon: FileSignature },
  ];

  return (
    <div className="fade-in">
      <h2>Dashboard</h2>
      <p className="muted">Full recruitment lifecycle at a glance.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginTop: 20 }}>
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div className="card stat-card" key={c.label}>
              <div className="stat-icon"><Icon size={20} /></div>
              <div>
                <div className="stat-value">{c.value}</div>
                <div className="muted">{c.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
