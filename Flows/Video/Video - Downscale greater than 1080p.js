/**
 * If a video's resolution is greater than 1080p, this script will set the variable {EncodingParameters} to downscale the video to 1080p.
 * Used with the VideoEncode node.
 * @author John Andrews
 * @revision 1
 * @output Video is greater than 1080p, {EncodingParameters} set to downscale
 * @output Video is not greater than 1080p
 */
 function Script()
 {
   // this template down scales a video with a width larger than 1920 down to 1920
   // it is suppose to be used before a 'Video Encode' node and can create a variable
   // to use in that node
   // It uses NVIDIA hardware encoding to encode to HEVC/H265
   // output 1 = needs to downscale
   // output 2 = does not need to downscale
 
   // get the first video stream, likely the only one
   let video = Variables.vi?.VideoInfo?.VideoStreams[0];
   if (!video)
       return -1; // no video streams detected
 
   if (video.Width > 1920)
   {
       // down scale to 1920 and encodes using NVIDIA
     // then add a 'Video Encode' node and in that node 
     // set 
     // 'Video Codec' to 'hevc'
     // 'Video Codec Parameters' to '{EncodingParameters}'
     Logger.ILog(`Need to downscale from ${video.Width}x${video.Height}`);
       Variables.EncodingParameters = '-vf scale=1920:-2:flags=lanczos -c:v hevc_nvenc -preset hq -crf 23'
     return 1;
   }
 
   Logger.ILog('Do not need to downscale');
   return 2;
 }