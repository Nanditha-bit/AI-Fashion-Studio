import { Card } from "@/components/ui/card";
import type { GeneratedDesign } from "@/pages/Index";
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesignGalleryProps {
  designs: GeneratedDesign[];
}

export const DesignGallery = ({ designs }: DesignGalleryProps) => {
  const handleDownload = (imageUrl: string, prompt: string) => {
    // Create download link
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `fashion-design-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Your Designs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <Card
            key={design.id}
            className="overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={design.imageUrl}
                alt={design.prompt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => handleDownload(design.imageUrl, design.prompt)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm line-clamp-2 text-foreground/90">
                {design.prompt}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {design.timestamp.toLocaleDateString()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
