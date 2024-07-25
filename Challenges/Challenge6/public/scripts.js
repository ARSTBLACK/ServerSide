$(document).ready(function() {
    // Initialize DataTable
    let table = $('#resultsTable').DataTable();

    // Handle form submission
    $('#searchForm').on('submit', function(event) {
        event.preventDefault();

        // Get form data
        let formData = {
            department: $('#department').val(),
            position: $('#position').val(),
            minSalary: $('#minSalary').val(),
            maxSalary: $('#maxSalary').val(),
        };

        // Send AJAX request
        $.ajax({
            url: '/search',
            method: 'POST',
            data: formData,
            success: function(data) {
                // Clear existing data
                table.clear().draw();

                // Add new data to the table
                data.forEach(employee => {
                    table.row.add([
                        employee.employee_id,
                        employee.name,
                        employee.department,
                        employee.position,
                        employee.hire_date,
                        employee.salary
                    ]).draw();
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    });
});
