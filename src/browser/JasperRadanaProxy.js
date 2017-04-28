
function echo(success, error, opts) {

    var toast = undefined,
        toastId = undefined;

    if (opts && typeof(opts[0]) === 'string' && opts[0].length > 0) {
        toastId = 'toast' + Date.now();
        toast = document.createElement('div');
        toast.appendChild(document.createTextNode(opts[0]));
        toast.id = toastId;
        toast.style.width = '30%';
        toast.style.borderStyle = 'solid';
        toast.style.borderColor = '#777777';
        toast.style.borderRadius = '5px';
        toast.style.borderWidth = '2px';
        toast.style.margin = '0 auto';
        toast.style.marginTop = '30px';
        toast.style.backgroundColor = '#999999';
        toast.style.padding = '5px';
        toast.style.fontSize = '1.5em';
        toast.style.fontWeight = 'bold';
        toast.style.textAlign = 'center';
        toast.style.zIndex = 2147483647;

        document.body.appendChild(toast);

        setTimeout(function() {
            document.body.removeChild(document.getElementById(toastId));
        }, 3000);

        success(opts[0]);
        
    } else {
        error('Empty message!');
    }
}

function hitung(success, error, opts){
    var rslt;
    console.log(typeof(opts[0]));
    //if (opts && typeof(opts[0]) === 'string' && opts[0].length > 0)
   // console.log(typeof Tesseract.recognize);

    rslt = opts[0] * 2;
    success(rslt);
}

function printSample(success, error, opts){
    var rslt;

    // call ajax here
    var xhr = new XMLHttpRequest();
//    xhr.open('GET', 'http://192.168.10.107:8090/jasper/33');
//    xhr.open('POST', 'http://192.168.43.201:8090/jasper/33', true);
//    xhr.open('POST', 'http://wildoutsys.com:8081/flexfin-report/jasper/sample', true);
    xhr.open('POST', opts[0], true);
//    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    
    xhr.withCredentials = true;
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        console.log('Returned status of ' + xhr.status);
        if (xhr.status === 200) {
            /* ga bisa ambil filename, sementara kupending dulu spy ga bakar timeline 
            // check for a filename
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
            }
            */
        
            // Create a new Blob object using the 
            //response data of the onload object
            var blob = new Blob([xhr.response], {type: 'application/pdf'});
            //Create a link element, hide it, direct 
            //it towards the blob, and then 'click' it programatically
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            //Create a DOMString representing the blob 
            //and point the link element towards it
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            if (opts[1])
                a.download = opts[1] + '.pdf';
            else
                a.download = "samplereport.pdf";
            //programatically click the link to trigger the download
            a.click();
            //release the reference to the file by revoking the Object URL
            window.URL.revokeObjectURL(url);

            success(a.download);
        } else {
            error('Request failed.  Returned status of ' + xhr.status);
            // alert('Request failed.  Returned status of ' + xhr.status);
        }
    };

    var data = new FormData();
    data.append('user', 'flexfin');
    data.append('pwd', 'flexfin');    
    data.append('apiKey', 'radan4321');    
    
    xhr.send(data);

}


module.exports = {
    echo: echo,
    hitung: hitung,
    printSample: printSample
};

require('cordova/exec/proxy').add('JasperRadana', module.exports);