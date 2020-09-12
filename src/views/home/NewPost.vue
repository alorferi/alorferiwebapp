<template>
  <div >
    <div class="card mb-3">
            <div class="card-header">Create post</div>
            <div class="card-body">
                <textarea
                    class="form-control"
                    rows="1"
                    id="comment"
                    placeholder="What's on your mind?"
                >
                </textarea>
            </div>
            <div class="card-footer justify-content-end d-flex">
                <button class="btn btn-primary ml-auto">Post</button>
            </div>
        </div>
  </div>
</template>

<script>


export default {
  name: "NewPost",
  components: {

  },
};
</script>
