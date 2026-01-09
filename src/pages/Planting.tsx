import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ArrowLeft, Save, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const cropPresets = [
  { name: "Corn", spacing: 45 },
  { name: "Wheat", spacing: 15 },
  { name: "Soy", spacing: 30 },
  { name: "Potato", spacing: 35 },
];

const Planting = () => {
  const [spacing, setSpacing] = useState(45);
  const [activeCrop, setActiveCrop] = useState("Corn");

  const handlePresetClick = (crop: { name: string; spacing: number }) => {
    setActiveCrop(crop.name);
    setSpacing(crop.spacing);
  };

  // Calculate plant positions based on spacing
  const plantCount = Math.max(2, Math.floor(100 / spacing) + 1);
  const plantPositions = Array.from({ length: Math.min(plantCount, 5) }, (_, i) => {
    const totalWidth = (plantCount - 1) * spacing;
    const startOffset = (100 - Math.min(totalWidth, 80)) / 2;
    return startOffset + i * Math.min(spacing * 0.8, 20);
  });

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
              Distance Calibration
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Reset Default</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Grid Visualization */}
        <div className="feature-card mb-8">
          <div className="grid-pattern rounded-xl p-8 min-h-[320px] flex flex-col items-center justify-center relative">
            {/* Plant Icons */}
            <div className="flex items-center gap-0 mb-8 relative w-full max-w-lg justify-center">
              {plantPositions.map((pos, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{
                    marginLeft: index === 0 ? 0 : `${spacing * 0.8}px`,
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index === plantPositions.length - 1
                        ? "border-2 border-dashed border-primary/50 bg-success-light/50"
                        : "border-2 border-primary bg-success-light"
                    }`}
                  >
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                </div>
              ))}
            </div>

            {/* Ground Line */}
            <div className="w-full max-w-lg relative">
              <div className="h-0.5 bg-primary/30 w-full" />
              <div className="flex justify-center items-center mt-4 absolute left-1/2 -translate-x-1/2">
                {plantPositions.length >= 2 && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-0.5 bg-foreground/20" />
                    <span className="px-3 py-1 bg-card border border-border rounded text-sm font-medium">
                      {spacing} cm
                    </span>
                    <div className="w-16 h-0.5 bg-foreground/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="feature-card">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Slider Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Spacing Interval
                </h3>
                <span className="text-2xl font-bold text-primary">
                  {spacing} cm
                </span>
              </div>
              <Slider
                value={[spacing]}
                onValueChange={(value) => {
                  setSpacing(value[0]);
                  setActiveCrop("");
                }}
                min={10}
                max={100}
                step={5}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10 cm</span>
                <span>25 cm</span>
                <span>50 cm</span>
                <span>75 cm</span>
                <span>100 cm</span>
              </div>
            </div>

            {/* Presets Section */}
            <div className="lg:w-64">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                Crop Presets
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cropPresets.map((crop) => (
                  <button
                    key={crop.name}
                    onClick={() => handlePresetClick(crop)}
                    className={`crop-preset ${
                      activeCrop === crop.name ? "crop-preset-active" : ""
                    }`}
                  >
                    <span className="font-medium">{crop.name}</span>
                    <span className="text-xs text-muted-foreground block">
                      ({crop.spacing}cm)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Planting;
