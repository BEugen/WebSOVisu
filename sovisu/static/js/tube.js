//get data from scheme tube

async function getDataTube(root, url, token)
{
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
         headers: {
            "X-Requested-With": "XMLHttpRequest",
             "X-CSRFToken": token,
             "Accept": "application/json",
             "Content-Type": "application/json"
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer',
        body: JSON.stringify({'csrfmiddlewaretoken': token})});
    let data = await response.json();
    window.setTimeout(function () {
                    getDataTube(root, url, token)
                    .then(data => drawDataTube(data));
                }, 2000);
    return [root, data];
}

function getTybeData(root, url, token)
{
     getDataTube(root, url, token)
                    .then(data => drawDataTube(data));
}

function drawDataTube(data)
{
    var root = data[0];
    data = data[1];
   $("#md_so2_txt tspan:nth-child(1)", root).text(data.v_m.toFixed(3));
   $("#md_so2_txt tspan:nth-child(1)", root).text(data.n_m.toFixed(3));
   $("#ng_so2_txt tspan:nth-child(1)", root).text(data.v_n.toFixed(3));
   $("#ng_so2_txt tspan:nth-child(1)", root).text(data.n_n.toFixed(3));
   $("#ugms_so2_txt tspan:nth-child(1)", root).text(data.v_ug.toFixed(3));
   $("#ugms_so2_txt tspan:nth-child(1)", root).text(data.n_ug.toFixed(3));
   drawText(root, data.v_m, data.m_q, "md_so2");
   drawText(root, data.v_n, data.n_q, "ng_so2");
   drawText(root, data.v_ug, data.ug_q, "ugms_so2");
   drawText(root, data.n_m, data.m_n_q, "md_so2_p");
   drawText(root, data.n_n, data.n_n_q, "ng_so2_p");
   drawText(root, data.n_ug, data.ug_n_q, "ugms_so2_p");
   drawAlarm(root, data.a_m, 'md');
   drawAlarm(root, data.a_n, 'ng');
   drawAlarm(root, data.a_u, 'ugms');
   drawAlarmPredict(root, data.a_m_p, 'md');
   drawAlarmPredict(root, data.a_n_p, 'ng');
   drawAlarmPredict(root, data.a_u_p, 'ugms');
}

function drawAlarm(root, val, prefix)
{
    if(val > 0)
   {
       if(val >= 1)
       {
           $("#" + prefix + "_so2", root).css('fill', '#ff0042e3');
           $("#" + prefix + "_cloud", root).css('fill', '#ff0042e3');
           $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3865)');
       }
       else
       {
           $("#" + prefix + "_so2", root).css('fill', '#ffc200e3');
           $("#" + prefix + "_cloud", root).css('fill', '#ffc200e3');
           $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3873)');
       }
   }
   else
   {
      $("#" + prefix + "_so2", root).css('fill', '#20ff003d');
      $("#" + prefix + "_cloud", root).css('fill', '#20ff003d');
      $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3288)');
   }
}
function drawAlarmPredict(root, val, prefix)
{
    if(val > 0)
   {
       if(val > 1)
       {
           $("#" + prefix + "_so2_p", root).css('fill', '#ff0042e3');
       }
       else
       {
           $("#" + prefix + "_so2_p", root).css('fill', '#ffc200e3');
       }
   }
   else
   {
      $("#" + prefix + "_so2_p", root).css('fill', '#20ff003d');
   }
}
function drawText(root, val, quality, prefix)
{
    if(quality >= 192)
    {
       $("#" + prefix + "_txt tspan:nth-child(1)", root).text(val.toFixed(3));
    }
    else
    {
        $("#" + prefix + "_txt tspan:nth-child(1)", root).text("?.????");
    }
}