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

            // get canvas to draw triangles on
            var canvasElement = document.querySelector("#myCanvas");
            var context = canvasElement.getContext("2d");
            context.clearRect(0, 0, canvasElement.width, canvasElement.height);

            // draw 60px by 60px boundry and grid
            // inner Coulumns
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = "2";
            context.rect(10, 1, 10, 60);
            context.stroke();
            context.rect(30, 1, 10, 60);
            context.stroke();
            context.rect(40, 1, 10, 60);
            context.stroke();
            // inner rows
            context.rect(1, 10, 60, 10);
            context.stroke();
            context.rect(1, 30, 60, 10);
            context.stroke();
            context.rect(1, 40, 60, 10);
            context.stroke();
            // outer box
            context.strokeStyle = "black";
            context.rect(1, 1, 60, 60);
            context.stroke();

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
                    .append($("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
                
                // the triangle
                context.beginPath();
                context.moveTo(item.v1x, item.v1y);
                context.lineTo(item.v2x, item.v2y);
                context.lineTo(item.v3x, item.v3y);
                context.closePath();

                // the outline
                context.lineWidth = 2;
                context.strokeStyle = '#666666';
                context.stroke();

                // the fill color
                context.fillStyle = "#FFCC00";
                context.fill();
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

function addItemByVertecies() {
    const item = {
        v1x: $("#add-v1x").val(),
        v1y: $("#add-v1y").val(),
        v2x: $("#add-v2x").val(),
        v2y: $("#add-v2y").val(),
        v3x: $("#add-v3x").val(),
        v3y: $("#add-v3y").val()
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
            $("#add-v1x").val("");
            $("#add-v1y").val("");
            $("#add-v2x").val("");
            $("#add-v2y").val("");
            $("#add-v3x").val("");
            $("#add-v3y").val("");
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