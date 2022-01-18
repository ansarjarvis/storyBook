const stripTag = function (str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "")
}

const sliceString = function (str) {
    // const newStr = "..."
    const newStr = str.slice(0, 150)
    if (newStr.length > 120) {
        return newStr.concat(" ", ". . . . . . . .")
    } else {
        return newStr
    }
}


module.exports.stripTag = stripTag;

module.exports.sliceString = sliceString;