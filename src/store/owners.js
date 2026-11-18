export const getters = {
  "access_token": [
    "auth",
    "access_token"
  ],
  "otc_token": [
    "auth",
    "otc_token"
  ],
  "isLoggedIn": [
    "auth",
    "isLoggedIn"
  ],
  "blockTypesResponse": [
    "block",
    "blockTypesResponse"
  ],
  "comment": [
    "comment",
    "comment"
  ],
  "complainTypesResponse": [
    "complain",
    "complainTypesResponse"
  ],
  "myCourseOrder": [
    "courseOrder",
    "myCourseOrder"
  ],
  "myCourseOrdersResponse": [
    "courseOrder",
    "myCourseOrdersResponse"
  ],
  "course": [
    "course",
    "course"
  ],
  "coursesResponse": [
    "course",
    "coursesResponse"
  ],
  "follower": [
    "follower",
    "follower"
  ],
  "followersResponse": [
    "follower",
    "followersResponse"
  ],
  "followingByMe": [
    "follower",
    "followingByMe"
  ],
  "followingSource": [
    "follower",
    "followingSource"
  ],
  "activeLanguage": [
    "language",
    "activeLanguage"
  ],
  "libraryBookIssue": [
    "libraryBookIssue",
    "libraryBookIssue"
  ],
  "libraryBookIssuesResponse": [
    "libraryBookIssue",
    "libraryBookIssuesResponse"
  ],
  "libraryBook": [
    "libraryBook",
    "libraryBook"
  ],
  "libraryBooksResponse": [
    "libraryBook",
    "libraryBooksResponse"
  ],
  "myLibraryMemberRequest": [
    "libraryMemberRequest",
    "myLibraryMemberRequest"
  ],
  "libraryMember": [
    "libraryMember",
    "libraryMember"
  ],
  "activeLibraryMember": [
    "libraryMember",
    "activeLibraryMember"
  ],
  "libraryMembersResponse": [
    "libraryMember",
    "libraryMembersResponse"
  ],
  "myLibraryMembership": [
    "libraryMember",
    "myLibraryMembership"
  ],
  "library": [
    "library",
    "library"
  ],
  "myLibrariesResponse": [
    "library",
    "myLibrariesResponse"
  ],
  "libraryCoverUrl": [
    "library",
    "libraryCoverUrl"
  ],
  "like": [
    "like",
    "like"
  ],
  "myCart": [
    "myCart",
    "myCart"
  ],
  "pageTitle": [
    "pageTitle",
    "pageTitle"
  ],
  "post": [
    "post",
    "post"
  ],
  "postsResponse": [
    "post",
    "postsResponse"
  ],
  "postsPaging": [
    "post",
    "postsPaging"
  ],
  "userFollowingsResponse": [
    "userFollowing",
    "userFollowingsResponse"
  ],
  "user": [
    "user",
    "user"
  ],
  "activeUser": [
    "user",
    "activeUser"
  ],
  "activeUserCoverUrl": [
    "user",
    "activeUserCoverUrl"
  ],
  "usersResponse": [
    "user",
    "usersResponse"
  ]
};
export const mutations = {
  "setToken": [
    "auth",
    "setToken"
  ],
  "setOtcToken": [
    "auth",
    "setOtcToken"
  ],
  "logout": [
    "auth",
    "applyLogout"
  ],
  "setBlockTypesResponse": [
    "block",
    "setBlockTypesResponse"
  ],
  "setComment": [
    "comment",
    "setComment"
  ],
  "setComplainTypesResponse": [
    "complain",
    "setComplainTypesResponse"
  ],
  "setMyCourseOrder": [
    "courseOrder",
    "setMyCourseOrder"
  ],
  "setMyCourseOrdersResponse": [
    "courseOrder",
    "setMyCourseOrdersResponse"
  ],
  "setCourse": [
    "course",
    "setCourse"
  ],
  "setCoursesResponse": [
    "course",
    "setCoursesResponse"
  ],
  "setFollowersResponse": [
    "follower",
    "setFollowersResponse"
  ],
  "clearFollowersResponse": [
    "follower",
    "clearFollowersResponse"
  ],
  "insertFollower": [
    "follower",
    "insertFollower"
  ],
  "removeMeFromFollowers": [
    "follower",
    "removeMeFromFollowers"
  ],
  "setFollowingSource": [
    "follower",
    "setFollowingSource"
  ],
  "setFollowingByMe": [
    "follower",
    "setFollowingByMe"
  ],
  "clearFollowingByMe": [
    "follower",
    "clearFollowingByMe"
  ],
  "setActiveLanguage": [
    "language",
    "applySetActiveLanguage"
  ],
  "setLibraryBook": [
    "libraryBook",
    "setLibraryBook"
  ],
  "setLibraryBookIssuesResponse": [
    "libraryBookIssue",
    "setLibraryBookIssuesResponse"
  ],
  "setLibraryBooksResponse": [
    "libraryBook",
    "setLibraryBooksResponse"
  ],
  "setMyLibraryMemberRequest": [
    "libraryMemberRequest",
    "setMyLibraryMemberRequest"
  ],
  "setLibraryMembersResponse": [
    "libraryMember",
    "setLibraryMembersResponse"
  ],
  "setMyLibraryMembership": [
    "libraryMember",
    "setMyLibraryMembership"
  ],
  "setLibrary": [
    "library",
    "setLibrary"
  ],
  "setLibraryCoverUrl": [
    "library",
    "setLibraryCoverUrl"
  ],
  "setMyLibrariesResponse": [
    "library",
    "setMyLibrariesResponse"
  ],
  "setLike": [
    "like",
    "setLike"
  ],
  "addProductToCart": [
    "myCart",
    "applyAddProductToCart"
  ],
  "setPageTitle": [
    "pageTitle",
    "applySetPageTitle"
  ],
  "setPost": [
    "post",
    "setPost"
  ],
  "insertPostToFeed": [
    "post",
    "insertPostToFeed"
  ],
  "updatePostToFeed": [
    "post",
    "updatePostToFeed"
  ],
  "removePost": [
    "post",
    "removePost"
  ],
  "clearPostsResponse": [
    "post",
    "clearPostsResponse"
  ],
  "beginPostsFeed": [
    "post",
    "beginPostsFeed"
  ],
  "releasePostsFeed": [
    "post",
    "releasePostsFeed"
  ],
  "setPostsPaging": [
    "post",
    "setPostsPaging"
  ],
  "setPostsResponse": [
    "post",
    "setPostsResponse"
  ],
  "setUserPostsResponse": [
    "post",
    "setUserPostsResponse"
  ],
  "pushPostComments": [
    "post",
    "pushPostComments"
  ],
  "pushPostLikes": [
    "post",
    "pushPostLikes"
  ],
  "pushMyLikeOnPost": [
    "post",
    "pushMyLikeOnPost"
  ],
  "removeMyLikeFromPost": [
    "post",
    "removeMyLikeFromPost"
  ],
  "removePostComment": [
    "post",
    "removePostComment"
  ],
  "setUserFollowingsResponse": [
    "userFollowing",
    "setUserFollowingsResponse"
  ],
  "clearFollowingResponse": [
    "userFollowing",
    "clearFollowingResponse"
  ],
  "setUser": [
    "user",
    "setUser"
  ],
  "setUsersResponse": [
    "user",
    "setUsersResponse"
  ],
  "setActiveUser": [
    "user",
    "setActiveUser"
  ],
  "setActiveUserCoverUrl": [
    "user",
    "setActiveUserCoverUrl"
  ]
};
export const actions = {
  "loginBasic": [
    "auth",
    "loginBasic"
  ],
  "loginWithOtc": [
    "auth",
    "loginWithOtc"
  ],
  "resetPassword": [
    "auth",
    "resetPassword"
  ],
  "logout": [
    "auth",
    "logout"
  ],
  "createBlock": [
    "block",
    "createBlock"
  ],
  "fetchPostComments": [
    "comment",
    "fetchPostComments"
  ],
  "storePostComment": [
    "comment",
    "storePostComment"
  ],
  "deletePostComment": [
    "comment",
    "deletePostComment"
  ],
  "fetchComplainTypes": [
    "complain",
    "fetchComplainTypes"
  ],
  "createReport": [
    "complain",
    "createReport"
  ],
  "fetchMyCourseOrders": [
    "courseOrder",
    "fetchMyCourseOrders"
  ],
  "fetchMyCourseOrder": [
    "courseOrder",
    "fetchMyCourseOrder"
  ],
  "applyCourse": [
    "courseOrder",
    "applyCourse"
  ],
  "fetchCourse": [
    "course",
    "fetchCourse"
  ],
  "fetchCourseBySlug": [
    "course",
    "fetchCourseBySlug"
  ],
  "fetchCourses": [
    "course",
    "fetchCourses"
  ],
  "setActiveLanguage": [
    "language",
    "setActiveLanguage"
  ],
  "fetchLibraryBookIssue": [
    "libraryBookIssue",
    "fetchLibraryBookIssue"
  ],
  "fetchLibraryBookIssues": [
    "libraryBookIssue",
    "fetchLibraryBookIssues"
  ],
  "fetchLibraryBook": [
    "libraryBook",
    "fetchLibraryBook"
  ],
  "fetchLibraryBooks": [
    "libraryBook",
    "fetchLibraryBooks"
  ],
  "fetchLibraryFollowers": [
    "libraryFollower",
    "fetchLibraryFollowers"
  ],
  "fetchLibraryFollowingByMe": [
    "libraryFollower",
    "fetchLibraryFollowingByMe"
  ],
  "followLibraryByMe": [
    "libraryFollower",
    "followLibraryByMe"
  ],
  "unFollowLibraryByMe": [
    "libraryFollower",
    "unFollowLibraryByMe"
  ],
  "fetchMyLibraryMemberRequest": [
    "libraryMemberRequest",
    "fetchMyLibraryMemberRequest"
  ],
  "createLibraryMemberRequest": [
    "libraryMemberRequest",
    "createLibraryMemberRequest"
  ],
  "fetchLibraryMember": [
    "libraryMember",
    "fetchLibraryMember"
  ],
  "fetchLibraryMembers": [
    "libraryMember",
    "fetchLibraryMembers"
  ],
  "fetchMyLibraryMembership": [
    "libraryMember",
    "fetchMyLibraryMembership"
  ],
  "fetchLibraryPosts": [
    "libraryPost",
    "fetchLibraryPosts"
  ],
  "storeLibraryPost": [
    "libraryPost",
    "storeLibraryPost"
  ],
  "updateLibraryPost": [
    "libraryPost",
    "updateLibraryPost"
  ],
  "deleteLibraryPost": [
    "libraryPost",
    "deleteLibraryPost"
  ],
  "fetchLibrary": [
    "library",
    "fetchLibrary"
  ],
  "fetchSearchLibrary": [
    "library",
    "fetchSearchLibrary"
  ],
  "fetchMyLibraries": [
    "library",
    "fetchMyLibraries"
  ],
  "fetchAllLibraries": [
    "library",
    "fetchAllLibraries"
  ],
  "uploadLibraryCoverPhoto": [
    "library",
    "uploadLibraryCoverPhoto"
  ],
  "uploadLibraryLogo": [
    "library",
    "uploadLibraryLogo"
  ],
  "fetchPostLikes": [
    "like",
    "fetchPostLikes"
  ],
  "fetchPostMyLike": [
    "like",
    "fetchPostMyLike"
  ],
  "storePostLike": [
    "like",
    "storePostLike"
  ],
  "deletePostLike": [
    "like",
    "deletePostLike"
  ],
  "addProductToCart": [
    "myCart",
    "addProductToCart"
  ],
  "setPageTitle": [
    "pageTitle",
    "setPageTitle"
  ],
  "fetchPostFeed": [
    "post",
    "fetchPostFeed"
  ],
  "fetchPostsPage": [
    "post",
    "fetchPostsPage"
  ],
  "fetchUserFollowers": [
    "userFollower",
    "fetchUserFollowers"
  ],
  "fetchUserFollowingByMe": [
    "userFollower",
    "fetchUserFollowingByMe"
  ],
  "followUserByMe": [
    "userFollower",
    "followUserByMe"
  ],
  "unFollowUserByMe": [
    "userFollower",
    "unFollowUserByMe"
  ],
  "fetchUserFollowings": [
    "userFollowing",
    "fetchUserFollowings"
  ],
  "fetchUserPosts": [
    "userPost",
    "fetchUserPosts"
  ],
  "storeUserPost": [
    "userPost",
    "storeUserPost"
  ],
  "updateUserPost": [
    "userPost",
    "updateUserPost"
  ],
  "removeUserPost": [
    "userPost",
    "removeUserPost"
  ],
  "deleteUserPost": [
    "userPost",
    "deleteUserPost"
  ],
  "searchUsers": [
    "user",
    "searchUsers"
  ],
  "fetchMe": [
    "user",
    "fetchMe"
  ],
  "updateMe": [
    "user",
    "updateMe"
  ],
  "uploadMyPhoto": [
    "user",
    "uploadMyPhoto"
  ],
  "uploadMyCoverPhoto": [
    "user",
    "uploadMyCoverPhoto"
  ],
  "fetchUser": [
    "user",
    "fetchUser"
  ],
  "removePostsOfUser": [
    "post",
    "removePostsOfUser"
  ]
};
