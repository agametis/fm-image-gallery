import open from "open";

import { fmConfig } from "./fmConfig.js";

const { file, server } = fmConfig;

// falls nicht die gewünschte FM Version startet
// kann man das fmp-Protokoll hier anpassen:
// z.B. fmp21 für FileMaker 21
const fileUrl = `fmp://${server}/${file}`;

open(fileUrl);
