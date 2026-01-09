import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ArrowLeft, Camera, Settings2, Square, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fieldImage from "@/assets/field-camera-view.png";

const detections = [
  { id: 1, name: "Dandelion", confidence: 98, time: "12s ago" },
  { id: 2, name: "Thistle", confidence: 85, time: "24s ago" },
  { id: 3, name: "Crabgrass", confidence: 92, time: "45s ago" },
];

const Weeding = () => {
  const [activeTab, setActiveTab] = useState<"camera" | "upload">("camera");

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Weed Detection System
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("camera")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "camera"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Live Camera
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "upload"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Image Upload
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Camera Feed */}
          <div className="flex-1">
            <div className="feature-card p-0 overflow-hidden">
              <div className="relative">
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10 status-badge status-badge-online">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                  SYSTEM ACTIVE
                </div>

                {/* Camera Image */}
                <div className="relative aspect-video bg-muted">
                  <img
                    src={fieldImage}
                    alt="Field camera view"
                    className="w-full h-full object-cover"
                  />

                  {/* Detection Boxes */}
                  <div
                    className="absolute border-2 border-destructive"
                    style={{
                      left: "30%",
                      top: "25%",
                      width: "15%",
                      height: "25%",
                    }}
                  >
                    <span className="detection-badge -top-7 left-0">
                      Dandelion 98%
                    </span>
                  </div>
                  <div
                    className="absolute border-2 border-destructive"
                    style={{
                      left: "55%",
                      top: "50%",
                      width: "20%",
                      height: "30%",
                    }}
                  >
                    <span className="detection-badge -top-7 left-0">
                      Thistle 85%
                    </span>
                  </div>
                </div>

                {/* Camera Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <button className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors">
                    <Settings2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors">
                    <Square className="w-4 h-4 text-destructive-foreground fill-current" />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="lg:w-80">
            <div className="feature-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Live Statistics
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-dot" />
              </div>

              {/* Weeds Detected */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Weeds Detected
                </p>
                <p className="text-4xl font-bold text-foreground">14</p>
                <div className="flex items-center gap-1 mt-1 text-primary text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2 from last scan</span>
                </div>
              </div>

              {/* Recent Detections */}
              <div>
                <h4 className="text-sm text-muted-foreground mb-3">
                  Recent Detections
                </h4>
                <div className="space-y-3">
                  {detections.map((detection) => (
                    <div key={detection.id} className="detection-item">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">
                          {detection.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {detection.time}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {detection.confidence}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Report Button */}
              <Button className="w-full mt-6">Generate Report</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Weeding;
