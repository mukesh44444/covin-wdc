console.log("THis is working !");

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const covidCols = [
        {
            id: "id",
            dataType: tableau.dataTypeEnum.int,
          },
          {
            id: "district_id",
            dataType: tableau.dataTypeEnum.int,
          },
          {
            id: "district_name",
            dataType: tableau.dataTypeEnum.string,
          },
        ];
    
        let covidTableSchema = {
          id: "districts",
          alias: "districts",
          columns: covidCols,
        };
    
        schemaCallback([covidTableSchema]);

    };

    myConnector.getData = function (table, doneCallback) {

    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/21.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            id: resp[i].id,
            district_id: resp[i].district_id,
            district_name: resp[i].district_name,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );

    };

    tableau.registerConnector(myConnector);
})();


document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "List of Districts";
  tableau.submit();
}