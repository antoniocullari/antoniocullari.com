var tellJeff; //for debugging

$(document).ready(function () {
    $(".date-picker").datepicker({
        minDate: "+1",
        maxDate: "+120",
        onSelect: function (dateText, inst) {
            $("*").removeClass("booked"); //first a bit of clean up...
            getAppointmentsForDate(dateText);
        }
    });
    eventUIHandler();
});

function checkReturnUser(email) {
    var json;
    $.ajax({
        type: "POST",
        url: ws_calendar + "/checkReturnUser",
        data: '{"email":"' + email + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (msg) {
            json = msg.d;
        }
    });
    return json;
}

function requestAppointment(clientId, date, time, duration) {
    var json = '{'
    json += '"clientId":"' + clientId + '",';
    json += '"date":"' + date + '",';
    json += '"time":"' + time + '",';
    json += '"duration":"' + duration + '"';
    json += '}';
    $.ajax({
        type: "POST",
        url: ws_calendar + "/createAppointment",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            alert("request sent!");            
        }
    });
}


function getAppointmentsForDate(date) {
    $.ajax({
        type: "POST",
        url: ws_calendar + "/retrieveAppointments",
        data: '{"requestedDate":"' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var json = msg.d;
            tellJeff = json;
            for (var i = 0; i < json.length; i++) {
                $("#" + tellJeff[i].appointmentStart)
                                   .addClass("booked")
                                   .nextUntil("#" + tellJeff[i].appointmentEnd)
                                   .addClass("booked");
            }
        }
    });
}

function eventUIHandler() {
    $(".time-cell:not('.booked')").live("click", function () {
        $(".time-cell").removeClass("hi-lite");
        if ($("#fb_apt_len_60:checked").length) {
            if (!$(this).next().hasClass("booked")) {
                $(this).addClass("hi-lite")
                               .next()
                               .addClass("hi-lite");
            }
        }

        if ($("#fb_apt_len_90:checked").length) {
            if (!$(this).next().hasClass("booked") && !$(this).next().next().hasClass("booked")) {
                $(this).addClass("hi-lite")
                               .next()
                               .addClass("hi-lite")
                               .next()
                               .addClass("hi-lite");
            }

        }

        if ($("#fb_apt_len_120:checked").length) {
            if (!$(this).next().hasClass("booked")
                        && !$(this).next().next().hasClass("booked")
                        && !$(this).next().next().next().hasClass("booked")) {
                $(this).addClass("hi-lite")
                               .next()
                               .addClass("hi-lite")
                               .next()
                               .addClass("hi-lite")
                               .next()
                               .addClass("hi-lite");
            }
        }

    });
    $("input[name='fb_apt_len']").change(function () {
        $(".time-cell").removeClass("hi-lite");
    });
}