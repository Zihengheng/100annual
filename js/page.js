function pageselectCallback(page_index, jq){
                var new_content = jQuery('.hiddenresult div.result:eq('+page_index+')').clone();
                $('.Searchresult').empty().append(new_content);
                return false;
            }
 function initPagination() {
                // count entries inside the hidden content
                var num_entries = jQuery('.hiddenresult div.result').length;
                // Create content inside pagination element
                $(".Pagination").pagination(num_entries, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:1, //每页显示1项
                    prev_text :"前一页",
                    next_text :"下一页" ,
                });
             }
// When document is ready, initialize pagination
    $(document).ready(function(){      
        initPagination();
    });