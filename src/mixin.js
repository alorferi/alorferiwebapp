export default {
    methods: {
        getApiUrl(endPoint) {
            if (!endPoint.startsWith("/")) {
                endPoint = "/" + endPoint;
            }

            return this.$apiServerBaseUrl + endPoint;
        },
        getEndPointQueryString(endPoint, term = null, page = null) {
            if (page == null) {
                page = this.$route.query.page;
            }

            if (term == null) {
                term = this.$route.query.term;
            }

            var queryObj = {
                page: page == undefined ? null : page,
                term: term == undefined ? null : term
            };

            queryObj = this.cleanObject(queryObj);

            var qString = new URLSearchParams(queryObj).toString();

            return endPoint + "?" + qString;
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
                    Authorization: "Bearer " + this.$store.getters.access_token
                }
            };
        },
        getAuthorizationBearerToken() {
            return {
                    Authorization: "Bearer " + this.$store.getters.access_token
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
