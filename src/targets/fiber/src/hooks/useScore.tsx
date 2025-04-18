import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { useState, useEffect } from "react";

interface ScoreOptions {
  width: number;
  height: number;
}

export function useScore(url: string, { width, height }: ScoreOptions) {
  const [musicSvg, setMusic] = useState("");

  useEffect(() => {
    const div = document.createElement("div");
    // div.style.display = "none";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    const osmd = new OpenSheetMusicDisplay(div, {
      backend: "svg",
      // defaultColorMusic: "#000000",
      drawTitle: false,
      drawSubtitle: false,
      drawComposer: false,
      drawPartNames: false,
      autoResize: true,

      // darkMode: true,
    });

    osmd.EngravingRules.PageLeftMargin = 0;
    osmd.EngravingRules.PageTopMargin = 0;
    osmd.EngravingRules.PageRightMargin = 0;
    osmd.EngravingRules.PageBottomMargin = 0;
    osmd
      .load(url)
      .then(() => {
        osmd.render();
        const svg = div.querySelector("svg")!;
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        setMusic(svg.outerHTML || "-");
      })
      .catch((err) => {
        console.error("Error rendering music:", err);
      })
      .finally(() => {
        document.body.removeChild(div);
      });
  }, [url]);

  return musicSvg;
}
