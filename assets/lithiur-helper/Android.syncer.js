window.AndroidAlert = function(title, text, type) {
    alert(`${type.toUpperCase()}: ${title}\n${text}`);
};

window.AndroidBridge = {
    onResult: function(callbackId, result) {
        AndroidBridge.onResult(callbackId, result); // Android method
    },

    sendToAndroid: function(id, data) {
        AndroidBridge.sendMessageToAndroid(id, JSON.stringify(data));
    }
};

// Example async JS function
window.runAsyncJS = function() {
    return new Promise(resolve => {
        setTimeout(() => resolve("JS async complete"), 1500);
    });
}
