/**
 * Detects the dynamic range of a video e.g. SDR/HDR/HDR+DoVi/Dovi
 * @author Lawrence Curtis
 * @version 1.0.0
 * @revision 1
 * @output SDR
 * @output HDR
 * @output HDR + Dolby Vision
 * @output Dolby Vison only
 */
function Script() {
    const videoStreams = Variables.vi.VideoInfo.VideoStreams;

    if (videoStreams) {
        if (videoStreams.length > 0) {
            Logger.DLog("Checking video dyanmic range...");
            if (videoStreams[0].HDR) {
                if (videoStreams[0].DolbyVision) {
                    Logger.ILog("Video range is both HDR + Dolby Vision");
                    return 3;
                }
                Logger.ILog("Video range is HDR");
                return 2;
            }
            if (videoStreams[0].DolbyVision) {
                Logger.ILog("Video range is Dolby Vision");
                return 4;
            }
        }
        Logger.ILog("Video range is SDR");
        return 1;
    } else {
        Logger.WLog("No dynamic range found");
        return -1;
    }
}