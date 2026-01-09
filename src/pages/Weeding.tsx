import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ArrowLeft, Camera, Image, Upload, X, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const detections = [
  { id: 1, name: "Dandelion", confidence: 98, time: "12s ago" },
  { id: 2, name: "Thistle", confidence: 85, time: "24s ago" },
  { id: 3, name: "Crabgrass", confidence: 92, time: "45s ago" },
];

const Weeding = () => {
  const [mode, setMode] = useState<"select" | "camera" | "image">("select");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode("camera");
    } catch (err) {
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setMode("select");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setMode("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const resetToSelect = () => {
    stopCamera();
    setUploadedImage(null);
    setMode("select");
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Weed Detection
          </h1>
          <p className="text-muted-foreground mt-1">
            Scan your field to find weeds
          </p>
        </div>

        {/* Mode Selection */}
        {mode === "select" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Camera Option */}
            <button
              onClick={startCamera}
              className="feature-card group cursor-pointer text-left hover:border-primary transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Live Camera
              </h3>
              <p className="text-muted-foreground">
                Use your phone camera to scan weeds in real-time
              </p>
            </button>

            {/* Image Upload Option */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="feature-card group cursor-pointer text-left hover:border-primary transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Upload Image
              </h3>
              <p className="text-muted-foreground">
                Select a photo from your gallery to detect weeds
              </p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Camera View */}
        {mode === "camera" && (
          <div className="max-w-3xl mx-auto">
            <div className="feature-card p-0 overflow-hidden">
              <div className="relative">
                {/* Live Badge */}
                <div className="absolute top-4 left-4 z-10 status-badge status-badge-online">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                  LIVE
                </div>

                {/* Close Button */}
                <button
                  onClick={resetToSelect}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                {/* Video Feed */}
                <div className="aspect-[4/3] bg-muted">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Scan Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <Button
                    size="lg"
                    onClick={handleScan}
                    disabled={isScanning}
                    className="text-lg px-8 py-6 rounded-full shadow-lg"
                  >
                    {isScanning ? "Scanning..." : "Scan for Weeds"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {isScanning && (
              <div className="mt-6 feature-card">
                <p className="text-center text-muted-foreground animate-pulse">
                  Analyzing image for weeds...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Uploaded Image View */}
        {mode === "image" && uploadedImage && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Preview */}
              <div className="flex-1">
                <div className="feature-card p-0 overflow-hidden">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={resetToSelect}
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <X className="w-5 h-5 text-foreground" />
                    </button>

                    <img
                      src={uploadedImage}
                      alt="Uploaded field"
                      className="w-full aspect-[4/3] object-cover"
                    />

                    {/* Detection Boxes (shown after scan) */}
                    {isScanning === false && (
                      <>
                        <div
                          className="absolute border-2 border-destructive"
                          style={{ left: "25%", top: "30%", width: "15%", height: "20%" }}
                        >
                          <span className="detection-badge -top-7 left-0">
                            Weed 94%
                          </span>
                        </div>
                        <div
                          className="absolute border-2 border-destructive"
                          style={{ left: "60%", top: "45%", width: "18%", height: "25%" }}
                        >
                          <span className="detection-badge -top-7 left-0">
                            Weed 87%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex-1"
                    size="lg"
                  >
                    {isScanning ? "Scanning..." : "Detect Weeds"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    New Image
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Stats Panel */}
              <div className="lg:w-72">
                <div className="feature-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Detection Results
                  </h3>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Weeds Found
                    </p>
                    <p className="text-4xl font-bold text-foreground">2</p>
                    <div className="flex items-center gap-1 mt-1 text-primary text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Ready for removal</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-muted-foreground mb-3">
                      Detected Types
                    </h4>
                    <div className="space-y-3">
                      {detections.slice(0, 2).map((detection) => (
                        <div key={detection.id} className="detection-item">
                          <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">
                              {detection.name}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {detection.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Weeding;
