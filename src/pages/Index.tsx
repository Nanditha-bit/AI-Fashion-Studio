import { useState } from "react";
import { DesignGenerator } from "@/components/DesignGenerator";
import { DesignGallery } from "@/components/DesignGallery";
import { Sparkles } from "lucide-react";

export interface GeneratedDesign {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
}

const Index = () => {
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);

  const handleDesignGenerated = (design: GeneratedDesign) => {
    setDesigns((prev) => [design, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              AI Fashion Studio
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Transform your ideas into stunning fashion designs with AI
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <DesignGenerator onDesignGenerated={handleDesignGenerated} />
        {designs.length > 0 && <DesignGallery designs={designs} />}
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Create unlimited fashion designs with AI • No artistic skills required</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
