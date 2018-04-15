(function() {
  var model = {
    init: function() {
      if (!localStorage.attendance) {
        var data = {
          names: ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'],
          students: []
        };
        data.names.forEach(function(name) {
          var attendance = [];
          for (let i = 0; i < 12; i++) {
            attendance.push({ checked: Math.random() > 0.5 });
          }

          var total = attendance.filter(function(a) {
            return !a.checked;
          });
          var missed = total.length;

          data.students.push({ name: name, attendance: attendance, missed: missed });
        });

        localStorage.attendance = JSON.stringify(data);
      }
    },
    checked: function(name, index, isChecked) {
      var data = JSON.parse(localStorage.attendance);
      var checkName = data.students.filter(function(stu) {
        if (stu.name === name) {
          return stu;
        }
      });
      if (checkName.length > 0) {
        checkName[0].attendance[index].checked = isChecked;
        var missed = checkName[0].attendance.filter(function(a) { return !a.checked; }).length;
        checkName[0].missed = missed;
      }
      localStorage.attendance = JSON.stringify(data);
    },
    getAllStudents: function() {
      var data = JSON.parse(localStorage.attendance);
      console.log(data);
      return data.students;
    }
  };

  var octopus = {
    init: function() {
      model.init();
      view.init();
    },
    check: function(name, index, isChecked) {
      model.checked(name, index, isChecked);
    },
    getAllStudents: function() {
      return model.getAllStudents();
    }
  };

  var view = {
    init: function() {
      this.tbody = document.querySelector('tbody');

      this.render();
    },
    render: function() {
      var students = octopus.getAllStudents();

      this.tbody.innerText = '';
      students.forEach(function(stu) {
        const tr = document.createElement('tr');
        tr.setAttribute("class", "student");

        const tdName = document.createElement('td');
        tdName.setAttribute("class", "name-col");
        tdName.textContent = stu.name;
        tr.appendChild(tdName);
        let index = 0;
        stu.attendance.forEach(function(a) {
          const td = document.createElement('td');
          //td.setAttribute("class", "attend-col");
          td.className = "attend-col";
          const input = document.createElement('input');
          input.type = "checkbox";
          input.checked = a.checked;
          input.addEventListener('click', (function(checkedCopy, indexCopy) {
            return function() {
              octopus.check(stu.name, indexCopy, !a.checked);
              view.render();
            };
          })(a, index));

          td.appendChild(input);

          tr.appendChild(td);
          index++;
        });

        const tdMissed = document.createElement('td');
        tdMissed.className = 'missed-col';
        tdMissed.textContent = stu.missed;
        tr.appendChild(tdMissed);

        this.tbody = document.querySelector('tbody');
        this.tbody.appendChild(tr);
      });
    }
  };

  octopus.init();
}());



/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
/*(function() {
  if (!localStorage.attendance) {
    console.log('Creating attendance records...');

    function getRandom() {
      return (Math.random() >= 0.5);
    }

    var nameColumns = $('tbody .name-col'),
      attendance = {};

    nameColumns.each(function() {
      var name = this.innerText;
      attendance[name] = [];

      for (var i = 0; i <= 11; i++) {
        attendance[name].push(getRandom());
      }
    });

    localStorage.attendance = JSON.stringify(attendance);
  }
}());*/


/* STUDENT APPLICATION */
/*$(function() {
  var attendance = JSON.parse(localStorage.attendance),
    $allMissed = $('tbody .missed-col'),
    $allCheckboxes = $('tbody input');

  // Count a student's missed days
  function countMissing() {
    $allMissed.each(function() {
      var studentRow = $(this).parent('tr'),
        dayChecks = $(studentRow).children('td').children('input'),
        numMissed = 0;

      dayChecks.each(function() {
        if (!$(this).prop('checked')) {
          numMissed++;
        }
      });

      $(this).text(numMissed);
    });
  }

  // Check boxes, based on attendace records
  $.each(attendance, function(name, days) {
    var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
      dayChecks = $(studentRow).children('.attend-col').children('input');

    dayChecks.each(function(i) {
      $(this).prop('checked', days[i]);
    });
  });

  // When a checkbox is clicked, update localStorage
  $allCheckboxes.on('click', function() {
    var studentRows = $('tbody .student'),
      newAttendance = {};

    studentRows.each(function() {
      var name = $(this).children('.name-col').text(),
        $allCheckboxes = $(this).children('td').children('input');

      newAttendance[name] = [];

      $allCheckboxes.each(function() {
        newAttendance[name].push($(this).prop('checked'));
      });
    });

    countMissing();
    localStorage.attendance = JSON.stringify(newAttendance);
  });

  countMissing();
}());*/