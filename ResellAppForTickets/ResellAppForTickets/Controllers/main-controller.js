angular.module("app", ["kendo.directives"])
        .controller("MainController", function ($scope, $http) {
            $scope.mainGridOptions = {
                columns: [
                    { field: "ProductID", title: "ID" },
                    { field: "ProductName", title: "Product Name" },
                    { command: [{ template: "<button class='k-button' ng-click='showDetails(dataItem)'>Show details</button" }] },
                ],
                pageable: true,
                dataSource: {
                    pageSize: 5,
                    transport: {
                        read: function (e) {
                            $http.jsonp('https://demos.telerik.com/kendo-ui/service/Products?callback=JSON_CALLBACK').
                            success(function (data, status, headers, config) {
                                e.success(data)
                            }).
                            error(function (data, status, headers, config) {
                                alert('something went wrong')
                                console.log(status);
                            });
                        }
                    }
                }
            };
            $scope.showDetails = function (dataItem) {
                $scope.details = true;
                $scope.listView.dataSource.data([dataItem]);
            }
            $scope.hideDetails = function () {
                $scope.details = false;
            }
        })