import Vue from "vue";
import moment from "moment";

export default {
    methods: {
        momentFromNow: function(value) {
            var date = moment(value).lang("bn").fromNow(); // here u modify data
           return date;
        },

        formatDate: function(value,expectedFormat="Do MMMM YYYY") {
            var date = moment(value);
           return moment(date).format(expectedFormat);
        },

        getApiUrl(endPoint, term = null, page = null) {
            if (!endPoint.startsWith("/")) {
                endPoint = "/" + endPoint;
            }

            endPoint = this.getEndPointQueryString(endPoint,term,page);

            return Vue.prototype.$apiServerBaseUrl + endPoint;
        },
        getEndPointQueryString(endPoint, term = null, page = null) {

            var queryObj = {
                page: page == undefined ? null : page,
                term: term == undefined ? null : term
            };

            queryObj = this.cleanObject(queryObj);

            var qString = new URLSearchParams(queryObj).toString();

            if(qString==""){
                return endPoint
            }else{
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
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).access_token
                }
            };
        },
        getAuthorizationBearerToken() {
            return {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).access_token
                }
            ;
        },
        extractUrl(text) {
            var regex = /(https?:\/\/[^ ]*)/;
            // var regex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/;

            var matches = text.match(regex);

            if (matches && matches.length >= 1) {
                return matches[0];
            }

            return null;
        },
        extractYouTubeVideoId(url) {
            var newval = "";
            var vid = "";

            if ((newval = url.match(/(\?|&)v=([^&#]+)/))) {
                vid = newval.pop();
            } else if ((newval = url.match(/(\.be\/)+([^\\/]+)/))) {
                vid = newval.pop();
            } else if ((newval = url.match(/(\\embed\/)+([^\\/]+)/))) {
                vid = newval.pop().replace("?rel=0", "");
            }

            return vid;
        }
    }
}
