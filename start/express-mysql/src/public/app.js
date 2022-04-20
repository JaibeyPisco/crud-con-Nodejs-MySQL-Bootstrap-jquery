$(function() {
    $("#list-employees").on('click', function() {
        $.ajax({
            url: '/employee',
            success: function(employees) {
                let tbody = $("tbody")
                tbody.html("")
                employees.forEach(employee => {
                    tbody.append(`
                    <tr>
                    <td class="id">${employee.id}</td>
                    <td><input type="text" value="${employee.name}" class="name"> </td>
                    <td><input type="number" value="${employee.salary}" class="salary"> </td>

                    <td>
                    <button class="update-button btn btn-warning">
                        <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 64 64" height="20px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>   

                    </button>
                        <button class="delete-button btn btn-danger"> <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                    
                    <svg height="20px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M341,128V99c0-19.1-14.5-35-34.5-35H205.4C185.5,64,171,79.9,171,99v29H80v32h9.2c0,0,5.4,0.6,8.2,3.4c2.8,2.8,3.9,9,3.9,9  l19,241.7c1.5,29.4,1.5,33.9,36,33.9h199.4c34.5,0,34.5-4.4,36-33.8l19-241.6c0,0,1.1-6.3,3.9-9.1c2.8-2.8,8.2-3.4,8.2-3.4h9.2v-32  h-91V128z M192,99c0-9.6,7.8-15,17.7-15h91.7c9.9,0,18.6,5.5,18.6,15v29H192V99z M183.5,384l-10.3-192h20.3L204,384H183.5z   M267.1,384h-22V192h22V384z M328.7,384h-20.4l10.5-192h20.3L328.7,384z"/></svg></button>
                </td>
                </tr>
                    `)

                });
            }
        })
    })
    $("#frmEmployee").on("submit", function(e) {
        e.preventDefault();

        let name = $("#name")
        let salary = $("#salary")

        $.ajax({
            url: '/employee',
            method: "POST",
            data: {
                id: 0,
                name: name.val(),
                salary: salary.val()
            },
            success: function(response) {
                name.val("");
                salary.val("");
                $("#list-employees").click()

                swal({
                    title: response.status,
                    icon: "success"
                });
            }
        })

    })

    $("table").on("click", ".update-button", function() {
        let row = $(this).closest("tr")

        let id = row.find(".id").text()
        let name = row.find(".name").val()
        let salary = row.find(".salary").val()


        $.ajax({
            url: '/employee/' + id,
            method: "PUT",
            data: {
                name: name,
                salary: salary
            },
            success: function(response) {
                $("#list-employees").click()
                swal({
                    title: response.message,
                    icon: "success"
                });
            }
        })

    })


    $("table").on("click", ".delete-button", function() {
        let row = $(this).closest("tr")

        let id = row.find(".id").text()

        $.ajax({
            url: '/employee/' + id,
            method: "DELETE",
            success: function(response) {
                $("#list-employees").click()
                swal({
                    title: response.message,
                    icon: "success"
                });
            }
        })

    })



})