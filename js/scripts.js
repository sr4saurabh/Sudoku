

    
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

var starttime,currtime;
function reset()
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            var k=i*10+j;
            var st=k.toString();
            st="cell-"+st;
            var v=document.getElementById(st);
            v.value="";

        }
    }
}

function isSafe(board,row,col,num)
{
    //document.write(9);
    for (var d = 0; d < 9; d++)  
    { 
        if (board[row][d] == num)  
        { 
            return false; 
        } 
    }
    for (var r = 0; r < board.length; r++) 
    { 
        
        if (board[r][col] == num) 
        { 
            return false; 
        } 
    } 
    
    var boxRowStart=row-row%3;
    var boxColStart=col-col%3;
    for (var r = boxRowStart; 
             r < boxRowStart + 3; r++)  
    { 
        for (var d = boxColStart;  
                 d < boxColStart + 3; d++)  
        { 
            if (board[r][d] == num)  
            { 
                return false; 
            } 
        } 
    } 
  
        
    return true; 
      
}

function solvesudoku(board)
{
    var d=new Date();
    currtime=d.getSeconds();
    if(currtime-starttime>=3)
    return false;
    console.log((currtime-starttime));
    var row = -1; 
    var col = -1; 
    var isEmpty = true; 
    for (var i = 0; i < 9; i++) 
    { 
        //document.write(9);
        for (var j = 0; j < 9; j++)  
        { 
            //document.write(9);
            if (board[i][j] == 0)  
            { 
                row = i; 
                col = j; 
                
                isEmpty = false;  
                break; 
            } 
        } 
        if (isEmpty==false) 
        { 
            break; 
        } 
    } 
  
   
    if (isEmpty==true)  
    { 
        return true; 
    } 
  
    for (var num = 1; num <= 9; num++) 
    { 
        if (isSafe(board, row, col, num)) 
        { 
            board[row][col] = num; 
            if (solvesudoku(board, 9))  
            {   
                //document.write(9);
                return true; 
            }  
            else
            { 
                //document.write(9);
                board[row][col] = 0; 
            } 
        } 
    } 
    return false; 
}
    function checkmatrix(matrix)
    {
        for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
            {
                var curr=matrix[i][j];
                if(curr>9 || curr<0)
                {
                    return false;
                }
                
                if(matrix[i][j]>0)
                {
                    for(var k=0;k<9;k++)
                    {
                        if(k!=i)
                        {
                            if(matrix[k][j]==matrix[i][j])
                            return false;
                        }
                        if(k!=j)
                        {
                            if(matrix[i][k]==matrix[i][j])
                            return false;
                        }

                    }
                    var boxRowStart=i-i%3;
                    var boxColStart=j-j%3;
                    for (var r = boxRowStart; 
                             r < boxRowStart + 3; r++)  
                    { 
                        for (var d = boxColStart;  
                                 d < boxColStart + 3; d++)  
                        { 
                            if (matrix[r][d] == matrix[i][j] && i!=r && j!=d)  
                            { 
                                return false; 
                            } 
                        } 
                    }

                }
            }
        }
        return true;
    }


    function solvesud(){
        var matrix=new Array(9);
        for(var i=0;i<9;i++)
        matrix[i]=new Array(9);

        for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
            {
                var k=i*10+j;
                var st=k.toString();
                st="cell-"+st;
                var v=document.getElementById(st);
                if(v.value=="")
                v.value="0";
                matrix[i][j]=parseInt(v.value);
                console.log(matrix[i][j]+" ");
                
                //console.log(k);
                //h=k+1;   
                //v.value=h.toString();
                

            }
        }
        var d=new Date();
        starttime=d.getSeconds();
        if(checkmatrix(matrix) && solvesudoku(matrix))
                {
                   
                    for(var i=0;i<9;i++)
                    {
                        for(var j=0;j<9;j++)
                        {
                            var k=i*10+j;
                            var st=k.toString();
                            st="cell-"+st;
                            var v=document.getElementById(st);
                            v.value=matrix[i][j].toString();
                        }
                    }
                }
                else
                {
                reset();
                alert("No solution - Invalid Sudoku");
            
                }


        
    }
