(function(angular) {


	angular.module('faq', [
		'ng',
		'pascalprecht.translate',
		'ui.bootstrap'
	]).controller('faq', faqController);

	function faqController($http, $sce, $scope) {

		$scope.input = '';
		$scope.themeSelected = null;


		$http.get('data.json').success(function(data) {

			$scope.data = data;
			$scope.themes = {};

			for (var i = data.length - 1; i >= 0; i--) {
				data[i].collapsed = true;
				data[i].html = $sce.trustAsHtml(data[i].html);
				data[i].meta.themes.forEach(function(theme) {
					$scope.themes[theme] = true;
				});
			}

		}).error(function(data) {
			$scope.error = data;
		});

		$scope.clearSearch = function() {
			$scope.input = '';
			$scope.themeSelected = null;
			for( var name in $scope.themes ) {
				$scope.themes[name] = true;
			}
		};


		$scope.selectTheme = function(theme) {
			$scope.themeSelected = ($scope.themeSelected === theme) ? null : theme;
		};

		$scope.matchesTheme = function(article) {
			return !$scope.themeSelected || article.meta.themes.indexOf($scope.themeSelected) !== -1;
		};

	}

})(window.angular);