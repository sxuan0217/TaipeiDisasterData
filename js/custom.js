//英文標示結束
//中文解說

var app = new Vue({ //Vue stard
    el: '.container',
    data: {
        rows: [], //存放得到的資料
        countOfPage: 50, //一頁顯示50筆
        currPage: 1, //第一頁
        selectArea: '--請選擇行政區--' //拿來綁定selectbar
    },
    computed: {
        filteredRows: function() {
            var selectArea = this.selectArea; //抓取selectArea選取的區域 
            return (this.selectArea.trim() !== '--請選擇行政區--') ? //第一個選項時，會顯示全部
                this.rows.filter(function(d) { return d.CaseLocationDistrict.indexOf(selectArea) > -1; }) :
                this.rows;

        }, //filteredRows
        pageStart: function() {
            return (this.currPage - 1) * this.countOfPage;
        }, //End of pageStart
        totalPage: function() {
                return Math.ceil(this.filteredRows.length / this.countOfPage); //資料數除以一頁顯示幾筆等於總頁數
            } //End of totalpage
    }, //End of computed
    methods: {
        setPage: function(idx) {
            if (idx <= 0 || idx > this.totalPage) {
                return;
            }
            this.currPage = idx;
        }, //End of setPage
        reSetPage: function() {
                this.currPage = 1;

            } //End of reSetPage
    }, //End of methods
    created: function() {
            var self = this;
            $.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json', function(data) {
                self.rows = data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;;
            });
        } //End of created
}); // End of Vue



$(".gotop").on("click", function(e) { // gotop start
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $(".header").offset().top
    }, 500);

}); //End of gotop