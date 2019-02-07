const uri = "api/grid";
let triangles = null;
function getCount(data) {
    const el = $("#counter");
    let name = "triangle";
    if (data) {
        if (data > 1) {
            name = "triangles";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#triangles");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.gridx))
                    .append($("<td></td>").text(item.gridy))
                    .append($("<td></td>").text(item.v1x))
                    .append($("<td></td>").text(item.v1y))
                    .append($("<td></td>").text(item.v2x))
                    .append($("<td></td>").text(item.v2y))
                    .append($("<td></td>").text(item.v3x))
                    .append($("<td></td>").text(item.v3y))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            triangles = data;
        }
    });
}

function addItem() {
    const item = {
        gridx: $("#add-gridx").val(),
        gridy: $("#add-gridy").val()
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-gridx").val("");
            $("#add-gridy").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(triangles, function (key, item) {
        if (item.id === id) {
            $("#edit-gridx").val(item.gridx);
            $("#edit-gridy").val(item.gridy);
            $("#edit-id").val(item.id);
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        gridx: $("#edit-gridx").val(),
        gridy: $("#edit-gridy").val(),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}