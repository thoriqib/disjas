let today = moment();
let yesterday = moment().add(-1, 'days');

$(document).ready(function() {
    $('#arr-text').text(`Berikut disajikan data status penerbangan kedatangan Bandara Husein Sastranegara ${yesterday.format('DD/MM/YYYY')} hingga ${today.format('DD/MM/YYYY')}. Data yang disajikan merupakan data realtime.`);

    $('#dataTable').DataTable({
        ajax: {
            "url": 'http://api.aviationstack.com/v1/flights?access_key=ba4874b419b81bf02a32fcbd09cd555a&arr_iata=bdo',
            "type": 'get',
            "dataType": 'json'
        },
        columns: [
            {"data": 'flight.iata'},
            {"data": 'airline.name'},
            {"render": function (data, type, row) {
                if(row.departure.airport == null){
                    return "Kualanamu (KNO)"
                }else{
                    return `${row.departure.airport} (${row.departure.iata})`
                }
            }},
            {"render": function (data, type, row) {
                let momen = moment(row.departure.scheduled)
                return momen.utc().format("DD/MM/YYYY HH:mm")
            }},
            {"render": function (data, type, row) {
                let momen = moment(row.arrival.scheduled)
                return momen.utc().format("DD/MM/YYYY HH:mm")
            }},
            {"render": function (data, type, row) {
                let status = row.flight_status
                return status.charAt(0).toUpperCase() + status.slice(1)
            }},
        ]
    });
});

