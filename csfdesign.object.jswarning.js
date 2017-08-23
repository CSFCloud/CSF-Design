csfdesign.define("csf/event/javascript-warning", {
    require: [],
    on: "onload",
    run: function() {
        console.log('%cSTOP!', 'font-size: 50px; -webkit-text-fill-color: red; -webkit-text-stroke-width: 1.5px; -webkit-text-stroke-color: black; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here, it is a scam and will give them access to you accounts!', 'font-size: 20px;');
    }
});
