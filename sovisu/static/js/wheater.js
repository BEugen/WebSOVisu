
function getwheater(url, token) {
    $.ajax(
        {
            url: url,
            data: {
                id: id, 'csrfmiddlewaretoken': token
            },
            timeout: 300000,
            type: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                 drawwheater(data);
                window.setTimeout(function () {
                   getwheater(url, token);
                }, 5000);
            },
            error: function() {
                window.setTimeout(function () {
                    getwheater(id, url, bind, options, token);
                }, 300000);
            }
        });
}


function drawwheater(data)
{
    var cnv = $("#wheater");
    var triangle = $("#dv_wheater");
    var w = triangle.innerWidth();
    var h = triangle.innerHeight();
    if (h > w) {
        h = w;
    } else {
        w = h;
    }
    var x = w *.5;
    var y = h *.5;
    var l = x*0.95;
    triangle.width(w).height(h);
    cnv.width(w).height(h);
    cnv.attr('width', w).attr('height', h);
}