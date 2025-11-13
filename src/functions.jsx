import FMGofer, {Option} from "fm-gofer";

// FileMaker-Info-Function
export const callFileMakerInfoScript = (imgId) => {
  
  FMGofer.PerformScriptWithOption(
    "ext_show_nfo", 
    { imgId: imgId }, 
    Option.SuspendAndResume
  );
  
};

// Helper function to transform FileMaker Data API response to simple array
export const transformFMDataResponse = async (fmDataArray) => {
  try {
    if (!Array.isArray(fmDataArray)) {
      return [];
    }

    return fmDataArray.map((record) => record.fieldData);
  } catch (error) {
    console.error("Error transforming FileMaker data:", error);
    return [];
  }
};

export const getDataFromFM = async () => {
  try {
    const scriptName = "ext_data_from_fm";
    const param = {};

    const data = await FMGofer.PerformScriptWithOption(
      scriptName,
      param,
      Option.SuspendAndResume
    ).json();

    const imgArray = await transformFMDataResponse(data?.imgArray);

    return imgArray;
  } catch (error) {
    console.error("Error getting data from FileMaker:", error);
    return [];
  }
};

window.getDataFromFM = getDataFromFM;
window.callFileMakerInfoScript = callFileMakerInfoScript;