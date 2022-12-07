import Vue from "vue";
import moment from "moment";

export default {
    methods: {
        momentFromNow: function(value) {
            const ln = this.$store.getters.activeLanguage;
            var date = moment(value)
                .locale(ln)
                .fromNow(); // here u modify data
            return date;
        },

        formatDate: function(
            value,
            expectedFormat = "DD MMMM YYYY",
            language = null
        ) {
            var date = moment(value);
            const ln =
                language == null
                    ? this.$store.getters.activeLanguage
                    : language;
            return moment(date)
                .locale(ln)
                .format(expectedFormat);
        },

        getApiUrl(endPoint, term = null, page = null) {
            if (endPoint == null || undefined) {
                return null;
            }

            if (!endPoint.startsWith("/")) {
                endPoint = "/" + endPoint;
            }

            endPoint = this.getEndPointQueryString(endPoint, term, page);

            return Vue.prototype.$apiServerBaseUrl + endPoint;
        },
        getEndPointQueryString(endPoint, term = null, page = null) {
            var queryObj = {
                page: page == undefined ? null : page,
                term: term == undefined ? null : term
            };

            queryObj = this.cleanObject(queryObj);

            var qString = new URLSearchParams(queryObj).toString();

            if (qString == "") {
                return endPoint;
            } else {
                return endPoint + "?" + qString;
            }
        },
        cleanObject(obj) {
            for (var propName in obj) {
                if (obj[propName] === null || obj[propName] === undefined) {
                    delete obj[propName];
                }
            }
            return obj;
        },
        getHeaderWithAuthorizationBearerToken() {
            return {
                headers: {
                    Authorization:
                        "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            };
        },
        getAuthorizationBearerToken() {
            return {
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
            };
        },
        extractUrl(text) {
            if (text) {
                var regex = /(https?:\/\/[^ ]*)/;
                var matches = text.match(regex);

                if (matches && matches.length >= 1) {
                    return matches[0];
                }
            }

            return null;
        },
        isYouTubeVideoUrl(url) {
            if (url) {
                if (url.includes("www.youtube.com")) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        extractYouTubeVideoId(url) {
            if (url == null) return null;

            var videoid = url.match(
                /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
            );

            if (videoid != null) {
                return videoid[1];
            } else {
                return null;
            }
        },
        formatBdMobileNumber(pMobileNumber) {
            var mobileNumber = pMobileNumber;

            mobileNumber = mobileNumber.replace("-", "");
            mobileNumber = mobileNumber.replace(" ", "");

            if (pMobileNumber.length == 10) {
                mobileNumber = "+880" + mobileNumber;
            } else if (pMobileNumber.length == 11) {
                mobileNumber = "+88" + mobileNumber;
            }

            return mobileNumber;
        },
        isMobileNumber(pMobileNumber, countryCode = "*") {
            var mobileNumber = pMobileNumber;
            mobileNumber = mobileNumber.replace("-", "");
            mobileNumber = mobileNumber.replace(" ", "");

            var pattern = "";

            switch (countryCode) {
                case "US":
                    break;

                case "BD":
                    break;
                case "*":
                default:
                    pattern = "^\\+(?:[0-9] ?){6,14}[0-9]\\$";
                    break;
            }

            var matcher = mobileNumber.match(pattern);
            return matcher;
        },
        isValidEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        isNumber(value, ...ignoreChars) {
            if (value == null || value == "") {
                return false;
            }
            for (let char of ignoreChars) {
                value = value.replace(char, "");
            }
            return !isNaN(value);
        }
    }
};
