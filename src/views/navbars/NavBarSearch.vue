<template>
    <div>
              <form class="form-inline">
            <div class="input-group">
                <div class="input-group-prepend">
                    <!-- <span class="input-group-text">
                        <i class="fas fa-mobile-alt"></i>
                    </span> -->

                    <select class="form-control">
                        <option value="Library" selected>Library</option>
                        <option value="+91">Book</option>
                        <option value="+1">Blood</option>
                        <option value="+1">Jobs</option>
                    </select>
                </div>

                <input class="form-control" type="text" placeholder="Search" />

                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <a href="#"> <i class="fas fa-search"></i></a>
                        <!-- <button type="submit"> <i class="fas fa-search"></i> </button> -->
                    </span>
                </div>
            </div>
            <!-- <button class="btn btn-success" type="submit">Search</button> -->
        </form>
    </div>
</template>
