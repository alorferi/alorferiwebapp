<template>
    <section class="ui-card social-form-page p-4 sm:p-6" :aria-busy="loading || saving ? 'true' : 'false'">
        <Loading v-if="loading" />
        <div v-else-if="loadError" class="ui-empty-state">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <form v-else ref="form" @submit.prevent="submit">
            <fieldset :disabled="saving" class="social-form-grid">
                <EditTextField
                    name="name"
                    type="text"
                    label="Library Name"
                    :data="form.name"
                    :errors="errors"
                    required
                    :maxlength="100"
                    @update:field="form.name = $event"
                />
                <EditTextField
                    name="address"
                    type="text"
                    label="Library Address"
                    :data="form.address.house"
                    :errors="errors"
                    :required="!edit"
                    @update:field="form.address.house = $event"
                />
                <EditTextField
                    name="mobile"
                    type="tel"
                    label="Library Mobile"
                    :data="form.mobile"
                    :errors="errors"
                    required
                    @update:field="form.mobile = $event"
                />
                <EditTextField
                    name="email"
                    type="email"
                    label="Library Email"
                    :data="form.email"
                    :errors="errors"
                    required
                    @update:field="form.email = $event"
                />
                <EditTextField
                    name="founded_at"
                    type="date"
                    label="Founded At"
                    :data="form.founded_at"
                    :errors="errors"
                    @update:field="form.founded_at = $event"
                />
                <EditTextField
                    name="post_code"
                    type="text"
                    label="Post Code"
                    :data="form.post_code"
                    :errors="errors"
                    @update:field="form.post_code = $event"
                />
                <p v-if="saveError" class="text-danger social-form-actions" role="alert" tabindex="-1">
                    {{ $t("social.requestError") }}
                </p>
                <div class="social-form-actions flex gap-3">
                    <button type="button" class="ui-button ui-button-light" @click="$router.back()">
                        {{ $t("social.cancel") }}
                    </button>
                    <button type="submit" class="ui-button ui-button-primary">
                        {{ $t(saving ? "social.saving" : "social.save") }}
                    </button>
                </div>
            </fieldset>
        </form>
    </section>
</template>
<script>
import axios from "axios";
import EditTextField from "@/components/EditTextField";
import Loading from "@/components/Loading";
export default {
    name: "LibraryForm",
    components: { EditTextField, Loading },
    props: { edit: Boolean },
    data() {
        return {
            form: { name: "", address: { house: "" }, email: "", mobile: "", post_code: "", founded_at: "" },
            loading: false,
            loadError: false,
            saving: false,
            saveError: false,
            errors: {},
        };
    },
    mounted() {
        if (this.edit) this.load();
    },
    methods: {
        async load() {
            this.loading = true;
            this.loadError = false;
            try {
                const response = await axios.get(this.getApiUrl("/api/libraries/" + this.$route.params.id), {
                    headers: this.getAuthorizationBearerToken(),
                });
                if (this._isDestroyed) return;
                const resource = response.data.data;
                const record = resource.attributes || resource;
                this.form = {
                    ...record,
                    address: { house: "", ...(record.address || {}) },
                    post_code: record.post_code || (record.address && record.address.post_code) || "",
                    founded_at: record.founded_at ? record.founded_at.slice(0, 10) : "",
                };
            } catch (error) {
                this.loadError = true;
            } finally {
                this.loading = false;
            }
        },
        async submit() {
            if (this.saving) return;
            this.saving = true;
            this.saveError = false;
            this.errors = {};
            try {
                const payload = {
                    ...this.form,
                    address: { ...this.form.address, post_code: this.form.post_code || null },
                };
                const endpoint = this.getApiUrl("/api/libraries" + (this.edit ? "/" + this.$route.params.id : ""));
                const response = await axios({
                    url: endpoint,
                    method: this.edit ? "PUT" : "POST",
                    data: payload,
                    headers: this.getAuthorizationBearerToken(),
                });
                if (this._isDestroyed) return;
                const resource = response.data.data;
                const id = this.edit
                    ? this.$route.params.id
                    : (resource && (resource.attributes || resource).id) || resource;
                await this.$router.push({ name: "library-show", params: { id } });
            } catch (error) {
                this.errors = (error.response && error.response.data && error.response.data.errors) || {};
                this.saveError = true;
                this.$nextTick(() => {
                    const target =
                        this.$refs.form && this.$refs.form.querySelector('[aria-invalid="true"], [role="alert"]');
                    if (target) target.focus();
                });
            } finally {
                this.saving = false;
            }
        },
    },
};
</script>
