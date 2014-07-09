  $.tablesorter.addParser({
        id: "money",
        is: function (s) {
            var sp = s.replace(/,/, '.');
            var test = (/([£$€] ?\d+\.?\d*|\d+\.?\d* ?)/.test(sp)); //check currency with symbol
            return test;
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[^\d\.]/g), ""));
        }, type: "numeric"
    });

	
    $('#dis').tablesorter({
         sortList: [[3,1]],
        headers: {
			3: { sorter: 'money' }
        }
    });