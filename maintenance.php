<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Site em manutenção</title>
</head>
<body>
    <script type="text/javascript">

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                //timer = duration;
                window.open(self.location, '_self');
            }
        }, 1000);
    }

    window.onload = function () {
        var fiveMinutes = 4,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };

    //window.open(self.location, '_self');
</script>
<body>
    <div style="text-align:center">
        <h1>Site em manutenção</h1>
        <p>Aguarde <span id="time">00:05</span> segundos.</p>
    </div>
</body>
</html>
