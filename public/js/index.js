
//Add user alert 
$("#add_user").submit(function (event) {
    alert("User Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3001/api/admin/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})  




//delete
 // AJAX request to delete the user
  function deleteUser(userId) {
    return $.ajax({
      url: `http://localhost:3001/api/admin/users/${userId}`, // Adjust the URL based on your API endpoint
      type: 'DELETE',
      success: function () {
        // User deleted successfully
        showAlert('User deleted successfully!');
          removeUserRow(userId); // Remove the user row from the table view
           location.reload(); // Refresh the page to update the table view
      },
      error: function () {
        // Error occurred while deleting the user
        showAlert('Failed to delete user. Please try again.');
      }
    });
  }

  // Remove the user row from the table view
  function removeUserRow(userId) {
    const $userRow = $(`#userTable tr[data-userid="${userId}"]`);
    $userRow.remove();
  }

  // Show an alert box
  function showAlert(message) {
    alert(message);
  }

  // Event handler for the delete button click
  $(document).on('click', '.delete', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    const userId = $(this).data('userid'); // Get the user ID from the data attribute

    // Confirm the deletion with the user
    if (confirm('Are you sure you want to delete this user?')) {
      // Call the deleteUser function with the user ID
      deleteUser(userId);
    }
  });