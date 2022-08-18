//https://midu.dev/como-crear-un-time-ago-sin-dependencias-intl-relativeformat/

const DATE_UNITS = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1, // un segundo tiene... un segundo :D
  };

  const getSecondsDiff = (timestamp) => {
    return (Date.now() - timestamp) / 1000;
  };

  const getUnitAndValueDate = (secondsElapsed) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
      if (secondsElapsed >= secondsInUnit || unit === "second") {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
        return { value, unit };
      }
    }
  };

  const getTimeAgo = (timestamp) => {
    const rtf = new Intl.RelativeTimeFormat();
    const secondsElapsed = getSecondsDiff(timestamp);
    const { value, unit } = getUnitAndValueDate(secondsElapsed);
    //return rtf.format(value, unit);
    return rtf.format(value, unit);
  };


  //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}


module.exports = { getTimeAgo, capitalizeFirstLetter }
  
/*  function lastCommentedString(calculated) {
      const rtf = new Intl.RelativeTimeFormat({
        localeMatcher: "best fit", // otros valores: 'lookup'
        numeric: "always", // otros valores: 'auto' para poner "ayer" o "anteayer"
        style: "long", // otros valores: 'short' o 'narrow'
      });
    }*/