import { DashboardLayout } from "@/components/DashboardLayout";
import { Bell, Target, Eye, Cpu, Sprout, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import robotImage from "@/assets/agribot-robot.png";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your active units and field status.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="status-badge status-badge-online">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
              System Online
            </div>
            <button className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Main Robot Card */}
        <div className="feature-card mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Robot Image */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-muted to-secondary">
                <img
                  src={robotImage}
                  alt="EcoHarvester X1"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-sm font-medium border border-border">
                Model X1
              </span>
            </div>

            {/* Robot Info */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                EcoHarvester X1
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Advanced autonomous agricultural assistant designed for
                precision planting and AI-driven weed management. Equipped
                with spectral sensors and high-torque mobility arms.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card">
                  <Target className="w-6 h-6 text-primary mb-2" />
                  <span className="font-semibold text-foreground">Precision</span>
                  <span className="text-sm text-muted-foreground">±2mm Accuracy</span>
                </div>
                <div className="stat-card">
                  <Eye className="w-6 h-6 text-primary mb-2" />
                  <span className="font-semibold text-foreground">Vision</span>
                  <span className="text-sm text-muted-foreground">Object Detection</span>
                </div>
                <div className="stat-card">
                  <Cpu className="w-6 h-6 text-primary mb-2" />
                  <span className="font-semibold text-foreground">Autonomy</span>
                  <span className="text-sm text-muted-foreground">6h Continuous</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/planting" className="feature-card group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Planting Module
            </h3>
            <p className="text-muted-foreground">
              Configure crop spacing and initiate automated seed dispersal
              sequences.
            </p>
          </Link>

          <Link to="/weeding" className="feature-card group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Weeding System
            </h3>
            <p className="text-muted-foreground">
              Access live camera feed and manage weed identification
              algorithms.
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
