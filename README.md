這是一個用Angular寫的Client端
寫法很亂sorry~

這是一個可以看各種電視節目的應用
http://eztv.2fh.co/

$scope.showsList是起先和api要到的所有資訊
裡面有五個物件，分別是韓劇、日劇、華劇、華語綜藝、韓國綜藝
我在html裡面，用angular的ng-repeat去loop每種電視節目（$scope.showsList[i].showslist）
這個部分我有把console.log出來，可以直接用檢查元素來看

search的部分，我把.search這個input，用ng-model綁著$scope.search這個變數
然後在電視劇的ng-repeat後面加上| filter:search，來提供即時篩選的機制。

點開某電視節目後，會顯示該電視節目的介紹與各個級數
而這一個overlay的做法是：


$scope.showEpisodes這個變數，我會依照選取的電視節目來變動裡面的內容，因此只需一個div就可以處理所有電視劇的內容顯示了。
在點擊顯示上，我使用了ng-click以及ng-show來實現。
