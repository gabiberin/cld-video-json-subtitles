/**
 * Get a timestamp supported by the cloudinary API
 * Assumes hours are not allowed (hour:minute:seconds.ms)
 * 
 * @param {string} offset time offset in minute:seconds.ms format
 */
function getFormattedOffset(offset) {
    let offsetParts = offset.split(':');

    return ( parseFloat(offsetParts[0]) * 60 ) + parseFloat(offsetParts[1]);
}

/**
 * Format the url part for a single subtitle object
 * @param {object} subtitle single subtitle object
 */
function getFormattedSubtitle(subtitle) {
    let text = `l_text:arial_36:${encodeURIComponent(subtitle.text)},co_white,b_black,g_south,y_80,so_${getFormattedOffset(subtitle['start-timing'])},eo_${getFormattedOffset(subtitle['end-timing'])}`;
    return text.replace('%2C', '%E2%80%9A'); // Replace commas - they dont work by default
}

/**
 * Adds subtitles based on a json input via simple text captions controlled with offset
 * 
 * @param {string} publicId video file public id on cloudinary
 * @param {string} subtitlesJson subtitles object
 */
function addSubtitlesToVideo(publidId, subtitlesJson) {
    let URL = 'https://res.cloudinary.com/candidate-evaluation/video/upload';

    subtitlesJson.subtitles.forEach(subtitle => URL += `/${getFormattedSubtitle(subtitle)}`);

    URL += `/${publidId}.mp4`;

    return URL;
};

module.exports.addSubtitlesToVideo = addSubtitlesToVideo;
