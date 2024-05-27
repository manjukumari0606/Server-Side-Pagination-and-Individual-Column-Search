$(document).ready(function() {
	// Function to add search input fields to the table footer
	function addSearchInputFields() {
		$('#employeesTable tfoot th').each(function(index) {
			if (index < 3) {
				var title = $(this).text();
				$(this).html('<input type="text" placeholder="Search ' + title + '" />');
			}
		});
	}

	// Initialize DataTable and add search input fields to the footer
	var table = $('#employeesTable').DataTable({
		"sAjaxSource": "/employees",
		"sServerSide": true,
		"sAjaxDataProp": "",
		"order": [[0, "asc"]],
		"aoColumns": [
			{ "data": "id", "width": "10%" },
			{ "data": "name", "width": "40%" },
			{ "data": "email", "width": "40%" },
			{
				"mData": null,
				"width": "5%",
				"orderable": false,
				"render": function(data, type, row) {
					return "<button class='update btn btn-primary' data-id='" + row.id + "'>Update</button>";
				}
			},
			{
				"mData": null,
				"width": "5%",
				"orderable": false,
				"render": function(data, type, row) {
					return "<button class='delete btn btn-danger' data-id='" + row.id + "'>Delete</button>";
				}
			}
		]

	});

	// Add search input fields to the footer
	addSearchInputFields();
	table.columns().every(function(){
		var datatableColumn = this;
		
		$(this.footer()).find('input').on('keyup change', function(){
			datatableColumn.search(this.value).draw();
		})
	})
	// Rest of your JavaScript code...


	// Event listener for the delete button
	$(document).delegate('button.delete', 'click', function() {
		if (confirm('Do you really want to delete record?')) {
			var id = $(this).data('id'); // Retrieve the ID using data attribute
			var parent = $(this).closest('tr'); // Find the parent row
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8083/employee/delete/" + id,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					location.reload(true);
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

	// Event listener for the update button
	$(document).delegate('button.update', 'click', function() {
		var parent = $(this).closest('tr');

		var id = parent.children("td:nth-child(1)");
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var buttons = parent.children("td:nth-child(4)");

		// Store original value in a variable
		var originalValue = name.html();
		var originalEmail = email.html();

		// Replace content with input field and save/cancel buttons
		name.html("<input type='text' id='txtName' value='" + originalValue + "'/>");
		email.html("<input type='email' id='txtEmail' value='" + originalEmail + "'/>");
		buttons.html("<button class='save'>Save</button>&nbsp;&nbsp;<button class='cancel'>Cancel</button>");

		// Save original value to data attribute of parent row
		parent.data('original-value', originalValue);
		parent.data('original-email', originalEmail);
	});

	// Delegate click event for dynamically added save button
	$(document).delegate('.save', 'click', function(event) {
		event.preventDefault(); // Prevent default form submission behavior

		var parent = $(this).closest('tr');

		var id = parent.children("td:nth-child(1)");
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var buttons = parent.children("td:nth-child(4)");

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8083/employee/save",
			data: JSON.stringify({ 'id': id.html(), 'name': name.children("input[type=text]").val(), 'email': email.children("input[type=email]").val() }),
			cache: false,
			success: function() {
				name.html(name.children("input[type=text]").val());
				email.html(email.children("input[type=email]").val());
				buttons.html("<button class='update btn btn-primary'>Update</button>&nbsp;&nbsp;");
			},
			error: function() {
				$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
					$(this).remove();
				});
			}
		});
	});


	// Delegate click event for dynamically added cancel button
	$(document).delegate('.cancel', 'click', function() {
		var parent = $(this).closest('tr');

		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var buttons = parent.children("td:nth-child(4)");

		// Retrieve original value from data attribute
		var originalValue = parent.data('original-value');
		var originalEmail = parent.data('original-email');

		// Restore original value
		name.html(originalValue);
		email.html(originalEmail);
		buttons.html("<button class='update btn btn-primary'>Update</button>&nbsp;&nbsp;");
	});
});