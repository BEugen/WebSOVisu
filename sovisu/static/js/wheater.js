
var txt = [ {'t': 'С', 'l': 1.02, 'a': -2.5}, {'t': 'ССВ', 'l': 0.9, 'a': 25},
    {'t': 'СВ', 'l': 0.9, 'a': 49}, {'t': 'ВСВ', 'l': 0.9, 'a': 73},
    {'t': 'В', 'l': 1.02, 'a': 92.5}, {'t': 'ВЮВ', 'l': 0.9, 'a': 122},
    {'t': 'ЮВ', 'l': 0.95, 'a': 148}, {'t': 'ЮЮВ', 'l': 1.02, 'a': 175},
    {'t': 'Ю', 'l': 1.1, 'a': 183}, {'t': 'ЮЮЗ', 'l': 1.1, 'a': 202},
    {'t': 'ЮЗ', 'l': 1.05, 'a': 221}, {'t': 'ЗЮЗ', 'l': 1.15, 'a': 245},
    {'t': 'З', 'l': 1.1, 'a': 267.5}, {'t': 'ЗСЗ', 'l': 1.12, 'a': 283.5},
    {'t': 'СЗ', 'l': 1.05, 'a': 305}, {'t': 'ССЗ', 'l': 1.02, 'a': 322.5}];

function getwheater(url, token) {
    $.ajax(
        {
            url: url,
            data: {
                id: 0, 'csrfmiddlewaretoken': token
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
                    getwheater(url, token);
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
    var l = x*0.9;
    var wind = data['ff10']
    triangle.width(w).height(h);
    cnv.width(w).height(h);
    cnv.attr('width', w).attr('height', h);
    var context = cnv.get(0).getContext('2d');

    var a1 = -0.438888889*Math.PI;
    var a2 = -0.072222222*Math.PI;
    var grd = context.createRadialGradient(x, y, l * 0.9, x, y, 0);
    grd.addColorStop(0, 'rgba(82, 84, 87, 0.25)');
    grd.addColorStop(0.9, 'rgba(255, 8, 2, 0.15)');
    context.beginPath();
    context.lineWidth = 0.001;
    context.arc(x, y, l*0.8, a1, a2);
    context.lineTo(x,y);
    context.fillStyle = grd;
    context.fill();
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 0.001;
    context.arc(x, y, l*0.15, 0, 2*Math.PI);
    context.lineTo(x,y);
    context.fillStyle = '#464646';
    context.fill();
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#e2e2e2';
    context.arc(x, y, l*0.15, 0, 2*Math.PI);
    context.stroke();
    context.closePath();

    for(var i=0.0; i < 360.0; i+=22.5) {
        var ang = i* (Math.PI / 180);
        context.beginPath();
        context.moveTo(l * 0.12 * Math.cos(ang) + x, l * 0.12 * Math.sin(ang) + y);
        context.lineTo(l * 0.95 * Math.cos(ang) + x, l * 0.95 * Math.sin(ang) + y);
        context.lineWidth = 0.8;
        context.strokeStyle = '#e2e2e2';
        context.stroke();
        context.closePath();
    }
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = '#e2e2e2';
    context.arc(x, y, l*0.8, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
    var wa = (data['Wg']-90)*Math.PI/180;
    var r = (l*0.8 * wind/25.0)/2;
    grd = context.createRadialGradient(l/2 * Math.cos(wa) + x, l/2 * Math.sin(wa) + y,
        l*0.6, l/2*Math.cos(wa) + x, l/2 * Math.sin(wa) + y, 0);
    grd.addColorStop(0, 'rgba(82, 84, 87, 0.25)');
    if (wind < 14.0)
    {
        grd.addColorStop(1, '#218EFF');
    }
    else
    {
         grd.addColorStop(1, '#ff0802');
    }
    context.beginPath();
    context.lineWidth = 0.01;
    context.strokeStyle = '#e2e2e2';
    context.ellipse((l*0.8)/2 * Math.cos(wa) + x, (l*0.8)/2 * Math.sin(wa) + y, l*0.8/2, r*0.5, wa, 0, 2*Math.PI);
    context.fillStyle = grd;
    context.fill();
    context.stroke();
    context.closePath();

    for(var j=0; j<txt.length; j++)
    {
        var obj = txt[j];
        var wa = (obj['a']-90)*Math.PI/180;
        var x1 = l*obj['l']*Math.cos(wa) + x;
        var y1 = l*obj['l']*Math.sin(wa) + y;
        context.font = w*0.04 + "pt Verdana";
        context.fillStyle = '#efeeef';
        context.fillText(obj['t'], x1, y1);
    }
    var pos = triangle.offset();
    var legend = $("#legend-w");
    legend.height(h*0.5);
    legend.width(0.33*w);
    $("#ndate-v").text(data['wth_date']);
    $("#t").text('T = ' + data['T'] + '°C');
    $("#p").text('P = ' + data['P'] + 'мм рт. с.');
    $("#ff").text('FF = ' + data['ff10'] + 'м/с');
    $("#ff10").text('FF10 = ' + data['ff3'] + 'м/с');
    $("#u").text('U = ' + data['U'] + '%');
    legend.offset({top: pos.top + (h-h*0.5), left: pos.left + w + 2});
    legend.show();
}

