<template>
  <div >
    <div class="card mb-3">
            <!-- <div class="card-header">Create post</div> -->
            <div class="card-body d-flex ">

                 <img
                src="@/assets/ic_user_male.png"
                alt="John Doe"
                class="rounded-circle"
                style="width:40px;height:40px"
            />

                <input
                    class="form-control"
                    rows="1"
                    id="comment"
                    name="body"
                    placeholder="What's on your mind?"
                />


                <i class="far fa-image m-2"></i>
            </div>
            <!-- <div class="card-footer justify-content-end d-flex">
                <button class="btn btn-primary ml-auto">Post</button>
            </div> -->
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
