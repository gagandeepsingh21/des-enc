
    var FileName = 'ResultText.txt';

    function copyToClipboard(str) {
                var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
            }

    document.addEventListener('click', function OnClick(event) {
                var $this = event.target;
    var ActionNameClass = 'copy';
    if ($this.classList.contains(ActionNameClass)) {
        event.preventDefault();
    var resultText = document.querySelector('.resultText');
    copyToClipboard(resultText.value);
    return false;
                }
    var ActionNameClass = 'saveFile';
    if ($this.classList.contains(ActionNameClass)) {
        event.preventDefault();
    var resultText = document.querySelector('.resultText');
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(resultText.value);
    hiddenElement.target = '_blank';
    hiddenElement.download = FileName;
    hiddenElement.click();
    return false;
                }
            });

    document.addEventListener('change', function OnClick(event) {
                var $this = event.target;
    var ActionNameClass = 'fileText';
    if ($this.classList.contains(ActionNameClass)) {
        event.preventDefault();
    var fileText = document.querySelector('.formEncrypt [name="fileText"]');
    FileName = fileText.value.split('/').pop().split('\\').pop();
    var text = document.querySelector('.formEncrypt [name="text"]');
    var reader = new FileReader();
    reader.onload = function() {
        text.value = reader.result;
                    };
    reader.readAsText(fileText.files[0]);
    fileText.value = '';
    return false;
                }
            });

    document.addEventListener('submit', function OnClick(event) {
                var $this = event.target;
    var ActionNameClass = 'formEncrypt';
    if ($this.classList.contains(ActionNameClass)) {
        event.preventDefault();
    var resultText = document.querySelector('.resultText');
    var resultStr = '';
    resultText.value = '';
    var formData = new FormData($this);
    var text = formData.get("text");
    var key = formData.get("key");
    var algorithm = formData.get("algorithm");
    var action = formData.get("action");
    var format = formData.get("format");
    // Encrypt
    if (action == 1) {
                     
    if (algorithm == 'DES') {
        var cipherText = CryptoJS.DES.encrypt(text, key).toString();
    }

    if (format == 1) {
        resultStr = btoa(cipherText);
                        } else {
        resultStr = cipherText;
                        }
                    }
    // Decrypt
    if (action == 2) {
                        if (format == 1) {
        text = atob(text);
                        }


    if (algorithm == 'DES') {
                            var bytes = CryptoJS.DES.decrypt(text, key);
                        }

    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    resultStr = originalText;
                    }
    resultText.value = resultStr;
    return false;
                }
            });
