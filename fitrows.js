/**
 * Fit Rows v1.00
 * Fit Rows is a jQuery plugin designed to arrange
 * item elements into rows, left to right. Rows 
 * progress from top to bottom.
 */
(function($) {
    $.fn.fitrows = function(settingsOptions) {
        var elements = this,
			elementsParent = elements.parent();
		
		var settings = {},
			settingsDefault = {
				itemOffset: -1
			};
		
		settings = jQuery.extend(settings, settingsDefault, settingsOptions);

		var rows = 0,
			rowsHeight = [],
			rowWidth = 0,
			rowMaxWidth = elementsParent.width();
		
		elements.each(function(index) {

			var item = $(this);
			
			if (settings.itemOffset === -1) {
				rowWidth += item.outerWidth();
				
				if (rowWidth > rowMaxWidth) {
					rowWidth = item.outerWidth();
					rows++;
				}
			} else {
				rows = parseInt(index / settings.itemOffset, 10);
			}
			
			if (rowsHeight.length < rows + 1) {
				rowsHeight.push(0);
			}

			item.data("rowIndex", rows);
			
			if (item.height() > rowsHeight[rows]) {
				rowsHeight[rows] = item.height();
			}
			
		});
		
		return (
			elements.each(function() {
				var item = $(this),
					rowIndex = parseInt(item.data("rowIndex"), 10);
				
				item.height(rowsHeight[rowIndex]);
			})
		);

    };
})(jQuery);