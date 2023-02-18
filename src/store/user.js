import axios from "axios";
import mixin from "../mixin";

const state = {
    user: JSON.parse(localStorage.getItem("user") || null),
    activeUser: JSON.parse(localStorage.getItem("activeUser") || null),
    activeUserCoverUrl: JSON.parse(
        localStorage.getItem("activeUserCoverUrl") || null
    ),
    userStatus: null
};

const getters = {
    user: state => state.user,
    activeUser: state => state.activeUser,
    activeUserCoverUrl: state => state.activeUserCoverUrl
};

const mutations = {
    setUser(state, user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    setActiveUser(state, newUser) {
        state.activeUser = newUser;
        localStorage.setItem("activeUser", JSON.stringify(newUser));
    },

    setActiveUserCoverUrl(state, newCoverUrl) {
        state.activeUserCoverUrl = newCoverUrl;
        localStorage.setItem("activeUserCoverUrl", JSON.stringify(newCoverUrl));
    }
};

const actions = {
    fetchMe(context) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/auth/me");
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    context.commit("setActiveUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    updateMe(context, packet) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "?_method=PUT"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    context.commit("setActiveUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    uploadMyPhoto(context, packet) {
        return new Promise((resolve, reject) => {
            const self = this;

            var url = mixin.methods.getApiUrl("/api/users/upload-own-photo");

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {

                    const photo_url =
                        response.data.data + "?tick=" + Date.now();

                    const user = self.getters.activeUser;
                    user.photo_url = photo_url;
                    context.commit("setActiveUser", user);

                    context.commit("setUser", user);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    uploadMyCoverPhoto(context, packet) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/upload-my-cover-photo"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {
                    const cover_url =
                        response.data.data + "?tick=" + Date.now();

                    context.commit("setActiveUserCoverUrl", cover_url);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    fetchUser(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/" + payload);
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    context.commit("setUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
