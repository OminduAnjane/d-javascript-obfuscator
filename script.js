// JavaScript function to decode the obfuscated code
function decode(obfuscatedCode) {
    // Replace the obfuscated characters with their original form
    var decodedCode = obfuscatedCode.replace(/[a-zA-Z0-9]/g, function(c) {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    });
    return decodedCode;
}

// Get the form and the decoded code container
var form = document.querySelector("form");
var decodedCodeContainer = document.querySelector("#decodedCode");

// Add a submit event listener to the form
form.addEventListener("submit", function(event) {
    event.preventDefault();
    var obfuscatedCode = document.querySelector("#obfuscatedCode").value;
    var decodedCode = decode(obfuscatedCode);

    // Send the obfuscated code to the server to be saved in a file
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "decode.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                decodedCodeContainer.innerHTML = decodedCode;
            } else {
                decodedCodeContainer.innerHTML = "An error occurred: " + response.message;
            }
        }
    };
    xhr.send("obfuscatedCode=" + obfuscatedCode + "&decodedCode=" + decodedCode);
});
