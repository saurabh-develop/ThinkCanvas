import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

function AiFeatures({ onGenerateFromTitle, onGenerateCustom }) {
  return (
    <section
      className="rounded-2xl p-6 sm:p-8 md:p-10 mt-12 mb-10 
                 bg-gradient-to-br from-[#2e2e40]/80 to-[#1e1e2f]/80 
                 border border-white/10 backdrop-blur-lg shadow-lg text-white"
      aria-labelledby="ai-title"
    >
      <h2
        id="ai-title"
        className="text-2xl font-semibold mb-3 flex items-center justify-center"
      >
        <Sparkles className="h-6 w-6 text-purple-400 animate-pulse mr-2" />
        AI Image Creation
      </h2>

      <p className="text-white/70 text-center mb-6 max-w-xl mx-auto text-sm sm:text-base">
        Generate stunning thumbnails for your YouTube videos with the power of
        AI.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={onGenerateFromTitle}
          variant="outline"
          className="rounded-full px-6 py-3 bg-white/10 text-white border border-white/10 
                     hover:bg-[#8b3dff]/10 hover:text-[#8b3dff] transition-all duration-300"
          aria-label="Generate image from video title"
        >
          Generate from Video Title
        </Button>

        <Button
          onClick={onGenerateCustom}
          variant="outline"
          className="rounded-full px-6 py-3 bg-white/10 text-white border border-white/10 
                     hover:bg-pink-600/20 hover:text-pink-400 transition-all duration-300"
          aria-label="Generate custom image"
        >
          Generate Custom Image
        </Button>
      </div>
    </section>
  );
}

export default AiFeatures;
