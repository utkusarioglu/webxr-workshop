import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { useState, useEffect } from "react";
import yaml from "js-yaml";
import { create } from "xmlbuilder2";

interface ScoreOptions {
  width: number;
  height: number;
}

export function useScore(url: string, { width, height }: ScoreOptions) {
  const [musicSvg, setMusic] = useState("");

  useEffect(() => {
    const div = document.createElement("div");
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

    fetch(url)
      .then((d) => d.text())
      .then((file) => {
        let score: string;
        if (url.endsWith(".musicxml.yaml")) {
          const y = yaml.load(file) as string;
          score = create(y).end({ prettyPrint: true });
        } else {
          score = file;
        }

        console.log(score);

        osmd
          .load(score)
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
      })
      .catch(console.log);
  }, [url]);

  return musicSvg;
}
