<template>
    <div class="">
        <h1>API Overview</h1>

        The Alor Feri API is a simple, lightweight REST API that responds to
        http requests with JSON (future support for XML is planned). Because it
        is a REST API, it is completely stateless. Requests are expected to be
        made in the form of a simple HTTP GET. The APIs that are not provided
        publicly are available to our API partners. If you're interested in
        becoming an API partner, please
        <a href="mailto:info@alorfferi.com">contact us</a> .

        <br />
        <br />

        <h4>API List</h4>
        <ul>
            <li>
                Library Directory, Search library by District and Police
                station.
            </li>

            <li>
                Library Committee Directory, Search library committee by
                library.
            </li>
        </ul>

        <br>
<br>
<br>
<br>
<br>
<br>
<br>

    </div>
</template>

<script>
export default {
    name: "ApiOverview",
    components: {},
    mounted: function() {},
    computed: {},
    props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
