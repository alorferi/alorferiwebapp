export function requestErrorMessage(error, language) {
    const message = error && error.response && error.response.data && error.response.data.message;
    if (typeof message === "string" && message.trim()) return message;
    return language === "bn"
        ? "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।"
        : "Unable to complete the request. Please try again.";
}
