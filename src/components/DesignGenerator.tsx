import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { GeneratedDesign } from "@/pages/Index";

interface DesignGeneratorProps {
  onDesignGenerated: (design: GeneratedDesign) => void;
}

const EXAMPLE_PROMPTS = [
  "A flowing evening gown with intricate embroidery, deep emerald color",
  "Modern streetwear jacket with geometric patterns, urban style",
  "Elegant minimalist dress, monochrome palette, sustainable materials",
  "Bohemian summer outfit with floral patterns and earth tones",
];

export const DesignGenerator = ({ onDesignGenerated }: DesignGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Enter a design prompt",
        description: "Describe the fashion design you want to create",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-fashion-design', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Generation failed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (!data?.imageUrl) {
        throw new Error('No image returned from AI');
      }

      const design: GeneratedDesign = {
        id: Date.now().toString(),
        prompt: prompt,
        imageUrl: data.imageUrl,
        timestamp: new Date(),
      };
      
      onDesignGenerated(design);
      setPrompt("");
      
      toast({
        title: "Design created!",
        description: "Your AI fashion design is ready",
      });

    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-8 shadow-elegant bg-card/80 backdrop-blur-sm border-2">
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Describe your fashion design
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A vintage-inspired summer dress with floral patterns, pastel colors..."
            className="min-h-[120px] resize-none text-base"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => setPrompt(example)}
                disabled={isGenerating}
                className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating your design...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Design
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
